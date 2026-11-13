/* eslint-disable */
/* global WebImporter */
/**
 * Parser for author-bio.
 * Source: div.author > div > div.author__details (h4 name, p bio) + div.author__actions (Share button).
 * Output: one row. Optional portrait cell | name heading + bio text.
 * The Share button is dropped; the block decorator rebuilds it.
 */
export default function parse(element, { document }) {
  const cells = [];
  const details = element.querySelector('.author__details') || element;

  const image = details.querySelector('picture') || details.querySelector('img');

  const body = [];
  const name = details.querySelector('h1, h2, h3, h4, h5, h6');
  if (name && name.textContent.trim()) {
    const h = document.createElement(name.tagName.toLowerCase());
    h.textContent = name.textContent.trim();
    body.push(h);
  }
  [...details.querySelectorAll('p')].forEach((p) => {
    if (p.textContent.trim()) body.push(p);
  });

  if (image) cells.push([image, body]);
  else cells.push([body]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'author-bio', cells });
  element.replaceWith(block);
}
