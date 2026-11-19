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
 * Colours come from the /colors sheet (Name, Color, Param, Family):
 * - rows without a Family (Statement Collection®): colour choices named there get a chip;
 * - rows with a Family (Dream Collection®): a group whose choices are family names (green,
 *   brown…) becomes a family filter with the family's colour dots and a search by name.
 * Choosing a colour paints the transparent siding of the preview and texture images and sets
 * ?color=<Param>. A choice linking to another page with a product configurator (a texture page)
 * loads that configurator in place and updates the address, keeping ?color=.
 * Option: alt (overview with available products and dealer CTA).
 */
import { optimizeImages, isMediaCell } from '../../scripts/block-utils.js';
import { toClassName } from '../../scripts/aem.js';

let colorsLoaded;

/**
 * Siding colours, from the /colors sheet. The preview and texture images are PNGs whose siding
 * is transparent: the chosen colour shows through as their background (--siding-color).
 * Returns { statement: Map(lower name -> entry), dream: [entry] } (name, color, param, family).
 */
function loadColors() {
  colorsLoaded = colorsLoaded || (async () => {
    const empty = { statement: new Map(), dream: [] };
    try {
      const resp = await fetch('/colors.json?limit=5000');
      if (!resp.ok) return empty;
      const json = await resp.json();
      const rows = (json.data || []).filter((r) => r.Name && r.Color).map((r) => ({
        name: r.Name.trim(),
        color: r.Color.trim(),
        param: (r.Param || toClassName(r.Name)).trim(),
        family: (r.Family || '').trim().toLowerCase(),
      }));
      return {
        statement: new Map(rows.filter((r) => !r.family).map((r) => [r.name.toLowerCase(), r])),
        dream: rows.filter((r) => r.family),
      };
    } catch {
      return empty;
    }
  })();
  return colorsLoaded;
}

function paintSiding(block, entry, query) {
  block.style.setProperty('--siding-color', entry ? entry.color : 'transparent');
  if (!query) return;
  const url = new URL(window.location.href);
  Object.entries(query).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v); else url.searchParams.delete(k);
  });
  window.history.replaceState(window.history.state, '', url);
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
  const entryOf = (el) => colors.get(el.dataset.value.toLowerCase());
  choices.forEach((el) => el.addEventListener('click', () => paintSiding(block, entryOf(el), { color: entryOf(el).param })));
  // first colour: the one in ?color=, else the preselected one
  const wanted = new URLSearchParams(window.location.search).get('color');
  const fromUrl = wanted && choices.find((el) => entryOf(el).param === wanted);
  if (fromUrl) {
    fromUrl.click();
    return;
  }
  const first = choices.find((el) => el.getAttribute('aria-checked') === 'true') || choices[0];
  // a ?color= this page doesn't offer (e.g. a Dream colour after a texture change) is dropped
  paintSiding(block, entryOf(first), wanted ? { color: null, family: null } : null);
}

/**
 * Dream Collection®: the group whose choices are colour families becomes a family filter with
 * the family's colour dots, a search by name in the family and ?color= / ?family= links.
 */
function applyDream(block, dream) {
  const families = new Set(dream.map((c) => c.family));
  const familyOf = (el) => el.dataset.value.toLowerCase();
  const group = [...block.querySelectorAll('.product-configurator-group')].find((g) => {
    const radios = [...g.querySelectorAll('.product-configurator-choice[role="radio"]')];
    return radios.length && radios.every((el) => families.has(familyOf(el)));
  });
  if (!group) return;
  group.classList.add('product-configurator-group-dream');
  const radios = [...group.querySelectorAll('.product-configurator-choice[role="radio"]')];
  const value = group.querySelector('.product-configurator-group-value');
  const title = group.querySelector('.product-configurator-group-title');
  const shown = document.createElement('span');
  shown.className = 'product-configurator-group-selected';
  title.firstChild.after(shown);

  const search = document.createElement('div');
  search.className = 'product-configurator-search';
  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = 'Find colors by name';
  input.setAttribute('aria-label', 'Find colors by name');
  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'product-configurator-search-clear';
  clear.textContent = 'Clear color filter';
  clear.hidden = true;
  search.append(input, clear);

  const dots = document.createElement('div');
  dots.className = 'product-configurator-dots';
  dots.setAttribute('role', 'radiogroup');
  dots.setAttribute('aria-label', 'Colors');
  const empty = document.createElement('p');
  empty.className = 'product-configurator-dots-empty';
  empty.textContent = 'No colors match your search.';
  empty.hidden = true;
  group.append(search, dots, empty);

  let family = familyOf(radios.find((el) => el.getAttribute('aria-checked') === 'true') || radios[0]);
  let selected = null;

  const select = (entry) => {
    selected = entry;
    shown.textContent = `: ${entry.name}`;
    value.textContent = entry.name;
    dots.querySelectorAll('[role="radio"]').forEach((d) => d.setAttribute('aria-checked', String(d.dataset.param === entry.param)));
    paintSiding(block, entry, { color: entry.param, family: entry.family.toUpperCase() });
  };

  const render = (list) => {
    dots.replaceChildren(...list.map((entry) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'product-configurator-dot';
      dot.setAttribute('role', 'radio');
      dot.setAttribute('aria-checked', String(selected === entry));
      dot.setAttribute('aria-label', entry.name);
      dot.dataset.param = entry.param;
      dot.style.setProperty('--chip', entry.color);
      const name = document.createElement('span');
      name.className = 'product-configurator-dot-name';
      name.textContent = entry.name;
      dot.append(name);
      dot.addEventListener('click', () => select(entry));
      return dot;
    }));
    empty.hidden = list.length > 0;
  };
  const showFamily = () => render(dream.filter((c) => c.family === family));

  radios.forEach((el) => el.addEventListener('click', () => {
    family = familyOf(el);
    input.value = '';
    clear.hidden = true;
    showFamily();
    paintSiding(block, selected, { family: family.toUpperCase() });
  }));
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    clear.hidden = !q;
    // as on the source, the search looks in the selected family
    if (q) render(dream.filter((c) => c.family === family && c.name.toLowerCase().includes(q)));
    else showFamily();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    clear.hidden = true;
    showFamily();
    input.focus();
  });
  dots.addEventListener('keydown', (e) => {
    const list = [...dots.querySelectorAll('[role="radio"]')];
    const idx = list.indexOf(document.activeElement);
    const delta = {
      ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1,
    }[e.key];
    if (idx < 0 || !delta) return;
    e.preventDefault();
    const next = list[(idx + delta + list.length) % list.length];
    next.focus();
    next.click();
  });

  // first state: the colour in ?color=, else the family in ?family=, else the preselected family
  const params = new URLSearchParams(window.location.search);
  const fromUrl = dream.find((c) => c.param === params.get('color'));
  const wantedFamily = fromUrl ? fromUrl.family : (params.get('family') || '').toLowerCase();
  const familyRadio = radios.find((el) => familyOf(el) === wantedFamily);
  if (familyRadio) {
    radios.forEach((el) => el.setAttribute('aria-checked', String(el === familyRadio)));
    family = wantedFamily;
  }
  showFamily();
  if (fromUrl) select(fromUrl);
  else paintSiding(block, null);
}

/** The product configurator of another page (its .plain.html), with media URLs made absolute. */
async function fetchConfigurator(url) {
  try {
    const resp = await fetch(`${url.pathname}.plain.html`);
    if (!resp.ok) return null;
    const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
    const block = doc.querySelector('.product-configurator');
    if (!block) return null;
    const base = new URL(url.pathname, window.location.origin);
    block.querySelectorAll('img[src]').forEach((img) => { img.src = new URL(img.getAttribute('src'), base).href; });
    block.querySelectorAll('source[srcset]').forEach((s) => {
      s.srcset = s.getAttribute('srcset').split(',').map((part) => {
        const [u, ...rest] = part.trim().split(/\s+/);
        return [new URL(u, base).href, ...rest].join(' ');
      }).join(', ');
    });
    return block;
  } catch {
    return null;
  }
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
    if (link) {
      if (preview) el.previewPicture = preview;
    } else {
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

/**
 * Choices linking to another page of this site: the current page's choice is marked, and a click
 * loads that page's configurator in place (address updated, ?color= kept) instead of reloading.
 */
function linkChoices(block, setPreview, redecorate) {
  const links = [...block.querySelectorAll('a.product-configurator-choice')]
    .filter((a) => new URL(a.href).origin === window.location.origin);
  const here = window.location.pathname.replace(/\/$/, '');
  const mark = (a, value) => {
    a.setAttribute('aria-current', value);
    a.closest('.product-configurator-group').querySelector('.product-configurator-group-value').textContent = a.dataset.value;
  };
  [...new Set(links.map((a) => a.closest('.product-configurator-choices')))].forEach((list) => {
    const inList = links.filter((a) => a.closest('.product-configurator-choices') === list);
    const current = inList.find((a) => new URL(a.href).pathname.replace(/\/$/, '') === here);
    // on the product's own page (not one of its texture pages) its preview is the first choice
    if (current) mark(current, 'page');
    else if (inList[0].closest('.product-configurator-group') === block.querySelector('.product-configurator-group')) mark(inList[0], 'true');
  });
  links.forEach((a) => {
    a.addEventListener('click', async (e) => {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      const url = new URL(a.href);
      if (a.previewPicture) setPreview(a.previewPicture.cloneNode(true));
      links.forEach((l) => (l === a ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current')));
      const next = await fetchConfigurator(url);
      if (!next) {
        window.location.href = a.href;
        return;
      }
      const color = new URLSearchParams(window.location.search).get('color');
      if (color) url.searchParams.set('color', color);
      window.history.pushState({ productConfigurator: true }, '', url);
      block.replaceChildren(...next.children);
      redecorate();
    });
  });
}

export default async function decorate(block) {
  const colorsReady = loadColors();
  block.style.removeProperty('--siding-color');
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

  linkChoices(block, setPreview, () => decorate(block));
  if (!window.productConfiguratorHistory) {
    // back / forward after an in-place texture change: show that page
    window.productConfiguratorHistory = true;
    window.addEventListener('popstate', () => window.location.reload());
  }

  const colors = await colorsReady;
  if (colors.statement.size) applyColors(block, colors.statement);
  if (colors.dream.length) applyDream(block, colors.dream);
}
