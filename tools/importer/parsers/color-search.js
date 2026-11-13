/* eslint-disable */
/* global WebImporter */
/**
 * Parser for color-search.
 * Source: div wrapper containing a search icon svg and an <input placeholder="...">.
 * Output: one row, one cell: the label/placeholder text. Optional row 2: link to a
 * search page when the source is wrapped in a <form action="...">.
 */
export default function parse(element, { document }) {
  const cells = [];
  const input = element.querySelector('input[placeholder], input');
  let label = (input && (input.getAttribute('placeholder') || input.getAttribute('aria-label'))) || '';
  if (!label) {
    const lbl = element.closest('label');
    label = (lbl && lbl.textContent.trim()) || element.textContent.trim();
  }
  label = (label || 'Search colours').trim();
  const p = document.createElement('p');
  p.textContent = label;
  cells.push([p]);

  const form = element.closest('form');
  const action = form && form.getAttribute('action');
  if (action && action !== '#') {
    const a = document.createElement('a');
    a.href = action;
    a.textContent = action;
    cells.push([a]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'color-search', cells });
  element.replaceWith(block);
}
