/*
 * Gallery Mosaic
 * Edge-to-edge photo mosaic of project photos, each optionally linked.
 *   Mosaic (default): every cell holding an image is a tile; a link in the
 *   cell (around or below the image) makes the tile clickable.
 * Swatch modes ("swatches" and the palette browser option):
 *   each row is one colour: swatch image | colour name | colour family (optional)
 *   | link (optional). Swatches are selectable buttons; when families are
 *   authored, filter chips are built from them.
 * Options: swatches, cyan-light-green-grey-orange-yellow (palette browser).
 */
import { optimizeImages, isMediaCell } from '../../scripts/block-utils.js';

const PALETTE_OPTION = 'cyan-light-green-grey-orange-yellow';

function buildMosaic(block) {
  const ul = document.createElement('ul');
  ul.className = 'gallery-mosaic-grid';
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const picture = cell.querySelector('picture');
    if (!picture) return;
    const li = document.createElement('li');
    li.className = 'gallery-mosaic-tile';
    const link = cell.querySelector('a[href]');
    const texts = [...cell.querySelectorAll('p, h1, h2, h3, h4, h5, h6')]
      .filter((el) => !el.querySelector('picture'));
    const caption = texts.map((el) => el.textContent.trim()).filter(Boolean).join(' ');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'gallery-mosaic-link';
      a.append(picture);
      // hover overlay: link text is the poster name, other text is the post excerpt
      const name = link.textContent.trim();
      const excerpt = texts.filter((el) => !el.contains(link))
        .map((el) => el.textContent.trim()).filter(Boolean).join(' ');
      if (name || excerpt) {
        const overlay = document.createElement('span');
        overlay.className = 'gallery-mosaic-overlay';
        if (name) {
          const n = document.createElement('span');
          n.className = 'gallery-mosaic-name';
          n.textContent = name;
          overlay.append(n);
        }
        if (excerpt) {
          const t = document.createElement('span');
          t.className = 'gallery-mosaic-text';
          t.textContent = excerpt;
          overlay.append(t);
        }
        a.append(overlay);
      }
      li.append(a);
    } else {
      li.append(picture);
    }
    if (caption && !link) {
      const cap = document.createElement('p');
      cap.className = 'gallery-mosaic-caption';
      cap.textContent = caption;
      li.append(cap);
    }
    ul.append(li);
  });
  return ul;
}

function buildSwatches(block) {
  const wrap = document.createElement('div');
  wrap.className = 'gallery-mosaic-swatches';
  const selected = document.createElement('p');
  selected.className = 'gallery-mosaic-selected';
  selected.setAttribute('aria-live', 'polite');
  const ul = document.createElement('ul');
  ul.className = 'gallery-mosaic-grid';
  const families = new Set();

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const media = cells.find((c) => c.querySelector('picture, img'));
    if (!media) return;
    const texts = cells.filter((c) => c !== media && !isMediaCell(c))
      .map((c) => ({ text: c.textContent.trim(), link: c.querySelector('a[href]') }))
      .filter((t) => t.text);
    const name = texts[0]?.text || media.textContent.trim() || media.querySelector('img')?.alt || '';
    const family = texts[1] && !texts[1].link ? texts[1].text : '';
    const link = texts.find((t) => t.link)?.link || media.querySelector('a[href]');
    if (family) family.split(',').map((f) => f.trim()).filter(Boolean).forEach((f) => families.add(f));

    const li = document.createElement('li');
    li.className = 'gallery-mosaic-swatch';
    li.dataset.colorName = name;
    if (family) li.dataset.family = family.toLowerCase();
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-mosaic-swatch-button';
    button.setAttribute('aria-pressed', 'false');
    button.append(media.querySelector('picture') || media.querySelector('img'));
    const label = document.createElement('span');
    label.className = 'gallery-mosaic-swatch-name';
    label.textContent = name;
    button.append(label);
    button.addEventListener('click', () => {
      ul.querySelectorAll('[aria-pressed="true"]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      selected.textContent = name;
      block.dispatchEvent(new CustomEvent('swatch-select', { bubbles: true, detail: { name, family } }));
    });
    li.append(button);
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'gallery-mosaic-swatch-link';
      a.textContent = link.textContent.trim() || 'View';
      li.append(a);
    }
    ul.append(li);
  });

  if (families.size) {
    const chips = document.createElement('div');
    chips.className = 'gallery-mosaic-filters';
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-label', 'Filter colours');
    ['All', ...families].forEach((fam, i) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'gallery-mosaic-filter';
      chip.textContent = fam;
      chip.setAttribute('aria-pressed', String(i === 0));
      chip.addEventListener('click', () => {
        chips.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === chip)));
        const key = fam.toLowerCase();
        ul.querySelectorAll('.gallery-mosaic-swatch').forEach((li) => {
          li.hidden = i !== 0 && !(li.dataset.family || '').split(',').map((f) => f.trim()).includes(key);
        });
      });
      chips.append(chip);
    });
    wrap.append(chips);
  }
  wrap.append(ul, selected);
  return wrap;
}

export default function decorate(block) {
  const swatchMode = block.classList.contains('swatches') || block.classList.contains(PALETTE_OPTION);
  const content = swatchMode ? buildSwatches(block) : buildMosaic(block);
  optimizeImages(content, swatchMode ? [{ width: '200' }] : [{ width: '600' }]);
  block.replaceChildren(content);
}
