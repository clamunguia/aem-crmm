/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-cta.
 * Source: wrapper > max-width div > grid div > column divs. Each column holds a
 * heading and one or more CTA links (button-styled <a> with span label + icon svg).
 * Output: one row, N columns; each cell = heading(s), text, image(s), CTA link(s).
 */
export default function parse(element, { document }) {
  let grid = element.querySelector('[class*="grid-cols"]');
  if (!grid) {
    grid = element;
    while (grid.children.length === 1) grid = grid.children[0];
  }

  const cols = [...grid.children].filter((c) => c.textContent.trim() || c.querySelector('img, picture'));

  const buildCell = (col) => {
    const content = [];
    col.querySelectorAll('h1, h2, h3, h4, h5, h6, p, picture, img, a[href]').forEach((el) => {
      // skip nodes nested inside something already collected
      if (content.some((c) => c.contains(el))) return;
      const tag = el.tagName.toLowerCase();
      if (tag === 'img' && el.closest('picture')) return;
      if (tag === 'a') {
        const label = el.textContent.replace(/\s+/g, ' ').trim();
        if (!label) return;
        const a = document.createElement('a');
        a.href = el.getAttribute('href');
        a.textContent = label;
        const p = document.createElement('p');
        p.append(a);
        content.push(p);
        return;
      }
      if (tag === 'p' && !el.textContent.trim() && !el.querySelector('img, picture')) return;
      if (/^h\d$/.test(tag) && !el.textContent.trim()) return;
      // paragraphs that contain links: rebuild links inside them is unnecessary; keep as-is
      content.push(el);
    });
    return content;
  };

  const row = cols.map(buildCell).filter((c) => c.length);
  const cells = row.length ? [row] : [];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
