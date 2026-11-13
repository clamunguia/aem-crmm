/*
 * Hero Banner
 * Text-only page intro banner. Content: heading, summary text, optional CTA.
 * Default layout is split (heading left, text right); authors may use one cell
 * (heading + text) or two cells (heading | text + CTA).
 * Options: centered (stacked, centred), green.
 */
export default function decorate(block) {
  const heading = document.createElement('div');
  heading.className = 'hero-banner-heading';
  const body = document.createElement('div');
  body.className = 'hero-banner-body';

  const cells = [...block.querySelectorAll(':scope > div > div')];
  cells.forEach((cell) => {
    [...cell.children].forEach((el) => {
      if (/^H[1-6]$/.test(el.tagName) && !body.children.length) heading.append(el);
      else body.append(el);
    });
  });

  const children = [];
  if (heading.children.length) children.push(heading);
  if (body.children.length) children.push(body);
  block.replaceChildren(...children);
}
