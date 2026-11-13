/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Content column = the wrapper that holds the quote paragraph (skip the icon column)
  const paragraphs = [...element.querySelectorAll('p')];
  const quoteP = paragraphs.find((p) => p.textContent.trim()) || null;

  // Attribution = the row after the quote paragraph (decorative line span + name/title paragraphs)
  let attributionPs = [];
  if (quoteP) {
    const attrRow = quoteP.nextElementSibling;
    if (attrRow) {
      attributionPs = [...attrRow.querySelectorAll('p')].filter((p) => p.textContent.trim());
    }
    if (!attributionPs.length) {
      attributionPs = paragraphs.filter((p) => p !== quoteP && p.textContent.trim());
    }
  }

  if (quoteP) {
    const q = document.createElement('p');
    q.innerHTML = quoteP.innerHTML;
    cells.push([q]);
  }

  if (attributionPs.length) {
    const attr = attributionPs.map((p, i) => {
      const np = document.createElement('p');
      const text = p.textContent.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
      if (i === 0) {
        const strong = document.createElement('strong');
        strong.textContent = text;
        np.append(strong);
      } else {
        np.textContent = text;
      }
      return np;
    });
    cells.push([attr]);
  }

  const name = attributionPs.length ? 'quote' : 'quote (alt)';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
