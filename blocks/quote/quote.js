/*
 * Quote
 * Pull quote with a quote glyph and optional attribution.
 * Row 1: quote text. Row 2 or second cell (optional): attribution.
 * Option: alt (quote without attribution).
 */
const GLYPH = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 40 28" fill="none" aria-hidden="true" focusable="false">'
  + '<g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
  + '<circle cx="8.75" cy="18.9966" r="7.5"/><path d="M1.25 19C1.25 9.33502 9.08502 1.5 18.75 1.5"/>'
  + '<circle cx="28.75" cy="18.9966" r="7.5"/><path d="M21.25 19C21.25 9.33502 29.085 1.5 38.75 1.5"/>'
  + '</g></svg>';

/**
 * Moves a cell's content into target, wrapping bare inline content in a paragraph.
 * @param {Element} cell source cell
 * @param {Element} target destination element
 */
function moveContent(cell, target) {
  if (cell.querySelector(':scope > p, :scope > div, :scope > ul, :scope > ol')) {
    target.append(...cell.childNodes);
    return;
  }
  const p = document.createElement('p');
  p.append(...cell.childNodes);
  target.append(p);
}

export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')].filter((c) => c.textContent.trim());
  if (!cells.length) return;
  const [quoteCell, ...rest] = cells;

  const figure = document.createElement('figure');
  figure.className = 'quote-figure';

  const glyph = document.createElement('span');
  glyph.className = 'quote-glyph';
  glyph.innerHTML = GLYPH;
  figure.append(glyph);

  const blockquote = document.createElement('blockquote');
  blockquote.className = 'quote-text';
  moveContent(quoteCell, blockquote);
  figure.append(blockquote);

  if (rest.length) {
    const caption = document.createElement('figcaption');
    caption.className = 'quote-attribution';
    const text = document.createElement('div');
    text.className = 'quote-attribution-text';
    rest.forEach((cell) => moveContent(cell, text));
    // attribution is bold by design: unwrap a sole <strong>/<b> so CSS owns the weight
    text.querySelectorAll(':scope > p').forEach((p) => {
      const only = p.children.length === 1 && p.firstElementChild;
      if (only && ['STRONG', 'B'].includes(only.tagName)
        && p.textContent.trim() === only.textContent.trim()) {
        only.replaceWith(...only.childNodes);
      }
    });
    caption.append(text);
    figure.append(caption);
  }
  block.replaceChildren(figure);
}
