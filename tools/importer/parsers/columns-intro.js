/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-intro.
 * Source: div.inner-container (flex row) > [div (h3)] + [div (span intro, div.hidden.lg:block > div > a CTA)]
 * Output (Columns convention, blocks/columns-intro): one row, two cells: heading | text + CTA link.
 * No option classes catalogued: always plain 'columns-intro'.
 */
export default function parse(element, { document }) {
  const heading = element.querySelector('h1, h2, h3, h4, h5, h6');

  // heading column = direct child of the block holding the heading; the rest is the text column
  let headingCol = heading;
  while (headingCol && headingCol.parentElement && headingCol.parentElement !== element) {
    headingCol = headingCol.parentElement;
  }
  if (headingCol && headingCol.parentElement !== element) headingCol = null;
  const otherCols = [...element.children].filter((c) => c !== headingCol);

  const headingCell = [];
  if (heading) headingCell.push(heading);
  if (headingCol) {
    // any extra copy authored next to the heading
    [...headingCol.querySelectorAll('p')].forEach((p) => { if (p.textContent.trim()) headingCell.push(p); });
  }

  const textCell = [];
  const links = [];
  const seen = new Set();
  const walk = (node) => {
    [...node.children].forEach((child) => {
      if (child.tagName === 'BUTTON' || child === heading) return;
      if (child.tagName === 'A') {
        const href = child.getAttribute('href');
        const label = (child.querySelector('span') || child).textContent.trim();
        if (href && label && !seen.has(href)) {
          seen.add(href);
          links.push({ href, label });
        }
        return;
      }
      if (/^(P|SPAN)$/.test(child.tagName)) {
        if (!child.textContent.trim()) return;
        if (child.tagName === 'P') textCell.push(child);
        else {
          const p = document.createElement('p');
          p.innerHTML = child.innerHTML;
          textCell.push(p);
        }
        return;
      }
      if (/^(UL|OL)$/.test(child.tagName)) {
        textCell.push(child);
        return;
      }
      walk(child);
    });
  };
  otherCols.forEach(walk);
  links.forEach(({ href, label }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    const p = document.createElement('p');
    p.append(a);
    textCell.push(p);
  });

  const cells = [[headingCell, textCell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-intro', cells });
  element.replaceWith(block);
}
