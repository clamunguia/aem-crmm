/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Label: direct text nodes of the heading (e.g. "Showing products for:"), ignoring icon SVG and button
  let labelText = [...element.childNodes]
    .filter((n) => n.nodeType === 3)
    .map((n) => n.textContent)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!labelText) {
    const clone = element.cloneNode(true);
    clone.querySelectorAll('svg, button').forEach((n) => n.remove());
    labelText = clone.textContent.replace(/\s+/g, ' ').trim();
  }
  labelText = labelText.replace(/:\s*$/, '');

  // Default ZIP: text of the change-location button
  const button = element.querySelector('button');
  let zip = '';
  if (button) {
    zip = (button.querySelector('span') || button).textContent.replace(/\s+/g, ' ').trim();
    if (!zip) {
      const m = (button.getAttribute('aria-label') || '').match(/\b\d{5}\b/);
      if (m) zip = m[0];
    }
  }

  cells.push([labelText || 'Your location', zip]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'location-indicator', cells });
  element.replaceWith(block);
}
