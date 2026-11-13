/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  const table = element.tagName === 'TABLE' ? element : element.querySelector('table');
  const rows = table
    ? [...table.querySelectorAll(':scope > thead > tr, :scope > tbody > tr, :scope > tfoot > tr, :scope > tr')]
    : [];

  rows.forEach((tr) => {
    const row = [];
    [...tr.children]
      .filter((c) => c.tagName === 'TD' || c.tagName === 'TH')
      .forEach((c) => {
        const cell = document.createElement('div');
        cell.innerHTML = c.innerHTML;
        cell.querySelectorAll('p').forEach((p) => {
          if (!p.textContent.trim() && !p.querySelector('img')) p.remove();
        });
        row.push(cell.childNodes.length ? [...cell.childNodes] : '');
        const span = parseInt(c.getAttribute('colspan') || '1', 10);
        for (let i = 1; i < span; i += 1) row.push('');
      });
    if (row.length) cells.push(row);
  });

  // Pad rows so every row has the same number of columns
  const maxCols = cells.reduce((m, r) => Math.max(m, r.length), 0);
  cells.forEach((r) => {
    while (r.length < maxCols) r.push('');
  });

  const firstRow = rows[0];
  const hasHeader = !!firstRow && [...firstRow.children].some((c) => c.tagName === 'TH');
  const name = hasHeader ? 'table-plain' : 'table-plain (no-header)';

  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
