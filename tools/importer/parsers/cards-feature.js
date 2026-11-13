/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature.
 * Source: div.cards-container > div.card-item, each with an icon wrapper (inline svg with
 * data-src), a bold title <p> and description <p>(s). Some instances are mapped on an outer
 * wrapper that also holds unrelated content (e.g. "Featured products"); in that case only the
 * nested cards container is replaced so that sibling content is preserved.
 * Output: one row per feature, 2 columns: icon image (or '') | h3 title + description.
 * Variant: the 'alt' variant is not distinguishable from the DOM, so plain name is used.
 */
export default function parse(element, { document }) {
  const cells = [];

  const container = element.classList.contains('cards-container')
    ? element
    : (element.querySelector('.cards-container') || element);

  let items = [...container.querySelectorAll(':scope > .card-item')];
  if (!items.length) items = [...container.querySelectorAll('.card-item')];
  if (!items.length) items = [...container.children];

  items.forEach((item) => {
    const paras = [...item.querySelectorAll('p, h1, h2, h3, h4, h5, h6')]
      .filter((p) => p.textContent.trim());
    if (!paras.length) return;

    // icon
    let media = '';
    const svg = item.querySelector('svg[data-src]');
    const img = item.querySelector('img');
    if (img && img.getAttribute('src')) {
      media = img;
    } else if (svg) {
      const i = document.createElement('img');
      i.src = svg.getAttribute('data-src');
      const name = (i.src.split('/').pop() || '').replace(/\.svg.*$/, '');
      i.alt = name.replace(/-/g, ' ');
      media = i;
    }

    // title: existing heading, else the bold paragraph (some instances have text only)
    const titleEl = paras.find((p) => /^H\d$/.test(p.tagName))
      || paras.find((p) => /font-bold/.test(p.className || ''));
    const body = [];
    if (titleEl) {
      const h = document.createElement('h3');
      h.innerHTML = titleEl.innerHTML.trim();
      body.push(h);
    }
    paras.forEach((p) => {
      if (p === titleEl) return;
      body.push(p);
    });

    cells.push([media, body]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  if (container !== element) {
    container.replaceWith(block);
  } else {
    element.replaceWith(block);
  }
}
