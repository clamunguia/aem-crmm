/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq.
 * Source: grid > div (main column) > div (item) each with h3 > button > span (question)
 * and div.accordion-container (answer).
 * Output: one row per item, 2 columns: question | answer.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Items: any element that directly contains an h3 heading plus an answer container.
  let items = [...element.querySelectorAll('.accordion-container')]
    .map((c) => c.parentElement)
    .filter((p, i, arr) => p && arr.indexOf(p) === i);
  if (!items.length) {
    items = [...element.querySelectorAll('h3, h2, h4')].map((h) => h.parentElement);
  }

  items.forEach((item) => {
    const heading = item.querySelector(':scope > h3, :scope > h2, :scope > h4');
    const answer = item.querySelector(':scope > .accordion-container')
      || (heading && heading.nextElementSibling);

    let questionText = '';
    if (heading) {
      const span = heading.querySelector('button span') || heading.querySelector('button') || heading;
      questionText = span.textContent.trim();
    }
    if (!questionText) return;

    const q = document.createElement('p');
    q.textContent = questionText;

    const answerContent = [];
    if (answer) {
      answer.querySelectorAll('svg, button').forEach((n) => n.remove());
      [...answer.children].forEach((child) => {
        if (!child.textContent.trim() && !child.querySelector('img, picture, iframe')) return;
        answerContent.push(child);
      });
    }
    cells.push([q, answerContent.length ? answerContent : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
