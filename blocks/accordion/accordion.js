/*
 * Accordion Block
 * Based on https://www.aem.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [label, body] = row.children;
    if (!label || !label.textContent.trim()) {
      row.remove();
      return;
    }

    // decorate accordion item label
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // decorate accordion item body
    const content = body || document.createElement('div');
    content.className = 'accordion-item-body';

    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, content);
    row.replaceWith(details);
  });
}
