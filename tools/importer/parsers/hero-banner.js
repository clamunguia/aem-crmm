/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner.
 * Source: section.horizontal-hero > div > [div (eyebrow? + h1 + desktop CTA?)] + p (summary) + div (mobile CTA?).
 * Output: one row, two cells: [eyebrow + heading] | [summary + CTA].
 * Variant: 'hero-banner (green)' when the banner carries a CTA link, else plain 'hero-banner'.
 */
export default function parse(element, { document }) {
  const section = element.querySelector('section') || element;
  const wrapper = section.querySelector(':scope > div') || section;
  const heading = wrapper.querySelector('h1, h2, h3, h4, h5, h6');

  // Heading column: the direct child of wrapper containing the heading
  let headCol = heading;
  while (headCol && headCol.parentElement && headCol.parentElement !== wrapper) headCol = headCol.parentElement;

  const headCell = [];
  const bodyCell = [];

  // Collect CTA links once (desktop + mobile copies share href)
  const seen = new Set();
  const ctas = [];
  [...wrapper.querySelectorAll('a[href]')].forEach((a) => {
    const href = a.getAttribute('href');
    const label = (a.querySelector('span') || a).textContent.trim();
    if (!label || seen.has(href)) return;
    seen.add(href);
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    const p = document.createElement('p');
    p.append(link);
    ctas.push(p);
  });

  if (headCol && headCol !== heading) {
    [...headCol.children].forEach((child) => {
      if (child.querySelector('a') || child.tagName === 'A') return; // CTA handled separately
      if (!child.textContent.trim()) return;
      headCell.push(child);
    });
  } else if (heading) {
    headCell.push(heading);
  }

  [...wrapper.children].forEach((child) => {
    if (child === headCol) return;
    if (child.tagName === 'A' || child.querySelector('a')) return;
    if (!child.textContent.trim()) return;
    bodyCell.push(child);
  });
  bodyCell.push(...ctas);

  const cells = [];
  if (headCell.length && bodyCell.length) cells.push([headCell, bodyCell]);
  else if (headCell.length || bodyCell.length) cells.push([[...headCell, ...bodyCell]]);

  const name = ctas.length ? 'hero-banner (green)' : 'hero-banner';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
