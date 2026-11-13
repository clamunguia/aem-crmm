/*
 * Accordion FAQ
 * Expandable question rows. Each row: question | answer.
 * Based on the project accordion block.
 */

let faqId = 0;

export default function decorate(block) {
  faqId += 1;
  const items = [];
  [...block.children].forEach((row, i) => {
    const [label, ...rest] = [...row.children];
    if (!label || !label.textContent.trim()) {
      row.remove();
      return;
    }

    const summary = document.createElement('summary');
    summary.className = 'accordion-faq-item-label';
    summary.id = `accordion-faq-${faqId}-label-${i}`;

    const title = document.createElement('span');
    title.className = 'accordion-faq-item-title';
    title.append(...label.childNodes);

    const icon = document.createElement('span');
    icon.className = 'accordion-faq-item-icon';
    icon.setAttribute('aria-hidden', 'true');
    summary.append(title, icon);

    const body = document.createElement('div');
    body.className = 'accordion-faq-item-body';
    body.setAttribute('role', 'region');
    body.setAttribute('aria-labelledby', summary.id);
    rest.forEach((cell) => body.append(...cell.childNodes));

    const details = document.createElement('details');
    details.className = 'accordion-faq-item';
    details.append(summary, body);
    items.push(details);
    row.remove();
  });
  block.append(...items);
}
