/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-stats.
 * Source: ol > li (stat callouts). Each li → one column: label (h4), figure (h2), description (h5/p).
 * Output: one row with N columns (one per stat).
 */
export default function parse(element, { document }) {
  let items = [...element.querySelectorAll(':scope > li')];
  if (!items.length) items = [...element.querySelectorAll('li')];

  const row = items.map((li) => {
    const inner = li.querySelector(':scope > div') || li;
    const content = [];
    [...inner.children].forEach((child) => {
      if (!child.textContent.trim() && !child.querySelector('img, picture')) return;
      content.push(child);
    });
    return content;
  }).filter((c) => c.length);

  const cells = row.length ? [row] : [];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-stats', cells });
  element.replaceWith(block);
}
