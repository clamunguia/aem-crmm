/*
 * Product Configurator
 * Product detail panel: a preview image beside the product name, intro and
 * option pickers (texture, colour collection, colour), plus CTAs.
 * Rows:
 *   1. preview image | name (heading), subtitle, intro text.
 *   2+. option group: group title (+ optional note / help link) | choices.
 *       Choices are either a bulleted list (one item per choice) or one choice
 *       per cell. A choice is a swatch image and/or a label; a second image in
 *       the choice is the preview shown when it is selected; a link makes the
 *       choice navigate (e.g. to another product page).
 *   Rows with a single cell after the groups are CTAs / notes.
 * The selected value is shown next to each group title and exposed on the
 * block as data-<group>="<value>" and a `product-option-change` event.
 * Colour choices named in the /colors sheet (Name, Color, Param) get a colour chip; choosing one
 * paints the transparent siding of the preview and texture images and sets ?color=<Param>.
 * Option: alt (overview with available products and dealer CTA).
 */
import { optimizeImages, isMediaCell } from '../../scripts/block-utils.js';
import { toClassName } from '../../scripts/aem.js';

/**
 * Siding colours, from the /colors sheet (columns Name, Color, Param). The preview and texture
 * images are PNGs whose siding is transparent: the chosen colour shows through as their
 * background (--siding-color), as on the source.
 */
async function loadColors() {
  try {
    const resp = await fetch('/colors.json');
    if (!resp.ok) return new Map();
    const json = await resp.json();
    return new Map((json.data || []).filter((r) => r.Name && r.Color).map((r) => [
      r.Name.trim().toLowerCase(),
      { color: r.Color.trim(), param: (r.Param || toClassName(r.Name)).trim() },
    ]));
  } catch {
    return new Map();
  }
}

/** Colour chips on the colour choices; selecting one paints the siding and sets ?color=. */
function applyColors(block, colors) {
  // only the first group with colour choices ("Select a color"): later groups repeat the names
  const isColor = (el) => colors.has(el.dataset.value.toLowerCase());
  const group = [...block.querySelectorAll('.product-configurator-group')]
    .find((g) => [...g.querySelectorAll('.product-configurator-choice[role="radio"]')].some(isColor));
  if (!group) return;
  const choices = [...group.querySelectorAll('.product-configurator-choice[role="radio"]')].filter(isColor);
  choices.forEach((el) => {
    const { color } = colors.get(el.dataset.value.toLowerCase());
    const chip = document.createElement('span');
    chip.className = 'product-configurator-color';
    chip.style.setProperty('--chip', color);
    el.prepend(chip);
    el.classList.add('product-configurator-choice-color');
  });
  const paint = (name, updateUrl) => {
    const entry = colors.get(name.toLowerCase());
    if (!entry) return;
    block.style.setProperty('--siding-color', entry.color);
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('color', entry.param);
      window.history.replaceState(null, '', url);
    }
  };
  choices.forEach((el) => el.addEventListener('click', () => paint(el.dataset.value, true)));
  // first colour: the one in ?color=, else the preselected one
  const wanted = new URLSearchParams(window.location.search).get('color');
  const fromUrl = wanted
    && choices.find((el) => colors.get(el.dataset.value.toLowerCase()).param === wanted);
  if (fromUrl) fromUrl.click();
  else paint((choices.find((el) => el.getAttribute('aria-checked') === 'true') || choices[0]).dataset.value, false);
}

function choiceElements(cells) {
  const list = cells.find((c) => c.querySelector(':scope > ul, :scope > ol'));
  if (list) return [...list.querySelectorAll(':scope > ul > li, :scope > ol > li')];
  return cells.filter((c) => c.textContent.trim() || c.querySelector('picture'));
}

function buildGroup(titleCell, choiceCells, block, setPreview) {
  const group = document.createElement('div');
  group.className = 'product-configurator-group';
  const header = document.createElement('div');
  header.className = 'product-configurator-group-header';
  const [titleEl, ...notes] = [...titleCell.children];
  const title = document.createElement('p');
  title.className = 'product-configurator-group-title';
  title.textContent = (titleEl || titleCell).textContent.trim();
  const selected = document.createElement('span');
  selected.className = 'product-configurator-group-value';
  selected.setAttribute('aria-live', 'polite');
  title.append(' ', selected);
  header.append(title);
  if (notes.length) {
    const note = document.createElement('div');
    note.className = 'product-configurator-group-note';
    note.append(...notes);
    header.append(note);
  }
  const key = toClassName(title.firstChild.textContent) || 'option';

  const options = document.createElement('div');
  options.className = 'product-configurator-choices';
  options.setAttribute('role', 'radiogroup');
  options.setAttribute('aria-label', title.firstChild.textContent.trim());

  const choices = choiceElements(choiceCells);
  const buttons = choices.map((choice, i) => {
    const pictures = [...choice.querySelectorAll('picture')];
    const link = choice.querySelector('a[href]');
    const label = choice.textContent.trim() || pictures[0]?.querySelector('img')?.alt || `Option ${i + 1}`;
    const el = document.createElement(link ? 'a' : 'button');
    if (link) {
      el.href = link.href;
    } else {
      el.type = 'button';
      el.setAttribute('role', 'radio');
      el.setAttribute('aria-checked', 'false');
    }
    el.className = 'product-configurator-choice';
    el.dataset.value = label;
    if (pictures[0]) {
      const swatch = document.createElement('span');
      swatch.className = 'product-configurator-swatch';
      swatch.append(pictures[0]);
      el.append(swatch);
      el.classList.add('product-configurator-choice-swatch');
    }
    const text = document.createElement('span');
    text.className = 'product-configurator-choice-label';
    text.textContent = label;
    el.append(text);
    const preview = pictures[1];
    if (!link) {
      el.addEventListener('click', () => {
        options.querySelectorAll('[role="radio"]').forEach((b) => b.setAttribute('aria-checked', String(b === el)));
        selected.textContent = label;
        block.dataset[key.replace(/-([a-z])/g, (m, c) => c.toUpperCase())] = label;
        if (preview) setPreview(preview.cloneNode(true));
        const detail = { group: key, value: label };
        block.dispatchEvent(new CustomEvent('product-option-change', { bubbles: true, detail }));
      });
    }
    return el;
  });
  options.append(...buttons);

  // roving keyboard selection for radio buttons
  options.addEventListener('keydown', (e) => {
    const radios = [...options.querySelectorAll('[role="radio"]')];
    const idx = radios.indexOf(document.activeElement);
    if (idx < 0) return;
    const delta = {
      ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1,
    }[e.key];
    if (!delta) return;
    e.preventDefault();
    const nextEl = radios[(idx + delta + radios.length) % radios.length];
    nextEl.focus();
    nextEl.click();
  });

  group.append(header, options);
  const firstRadio = buttons.find((b) => b.getAttribute('role') === 'radio');
  return { group, firstRadio };
}

export default async function decorate(block) {
  const colorsLoaded = loadColors();
  const rows = [...block.children];
  const preview = document.createElement('div');
  preview.className = 'product-configurator-preview';
  const panel = document.createElement('div');
  panel.className = 'product-configurator-panel';
  const intro = document.createElement('div');
  intro.className = 'product-configurator-intro';
  const groups = document.createElement('div');
  groups.className = 'product-configurator-groups';
  const actions = document.createElement('div');
  actions.className = 'product-configurator-actions';

  const setPreview = (picture) => {
    preview.replaceChildren(picture);
  };

  const firstRadios = [];
  rows.forEach((row, i) => {
    const cells = [...row.children];
    if (i === 0) {
      cells.forEach((cell) => {
        if (isMediaCell(cell)) preview.append(...cell.childNodes);
        else intro.append(...cell.childNodes);
      });
      return;
    }
    const contentCells = cells.filter((c) => c.textContent.trim() || c.querySelector('picture'));
    if (contentCells.length >= 2) {
      const [titleCell, ...choiceCells] = contentCells;
      const { group, firstRadio } = buildGroup(titleCell, choiceCells, block, setPreview);
      groups.append(group);
      if (firstRadio) firstRadios.push(firstRadio);
    } else if (contentCells.length === 1) {
      actions.append(...contentCells[0].childNodes);
    }
  });

  panel.append(intro);
  if (groups.children.length) panel.append(groups);
  if (actions.textContent.trim()) panel.append(actions);
  optimizeImages(preview, [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }]);
  optimizeImages(groups, [{ width: '200' }]);
  const children = [];
  if (preview.children.length) children.push(preview);
  children.push(panel);
  block.replaceChildren(...children);

  // preselect the first choice of each group without changing the authored preview
  firstRadios.forEach((radio) => {
    const groupEl = radio.closest('.product-configurator-group');
    groupEl.querySelector('.product-configurator-group-value').textContent = radio.dataset.value;
    radio.setAttribute('aria-checked', 'true');
  });

  const colors = await colorsLoaded;
  if (colors.size) applyColors(block, colors);
}
