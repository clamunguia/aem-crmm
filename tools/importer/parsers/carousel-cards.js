/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-cards.
 * Source shapes:
 *  - section with intro (h2 + p) beside a Splide carousel of link cards
 *  - bare Splide carousel (div.splide) of link cards (+ optional topic pill link)
 *  - controls-only fragment (prev/next buttons + progress bar), carousel chrome only
 * Output:
 *  - optional intro row (1 cell: heading, text, CTA links)
 *  - one row per card: [image] | [title (linked), extra text, extra links]
 * Variants: 'carousel-cards (alt)' = static set with no arrow controls; plain otherwise.
 */
export default function parse(element, { document }) {
  const cells = [];
  const HEADINGS = 'h1, h2, h3, h4, h5, h6';

  // Slides (exclude Splide clones and duplicates)
  let slides = [...element.querySelectorAll('li.splide__slide')];
  if (!slides.length) slides = [...element.querySelectorAll('ul > li')].filter((li) => li.querySelector('img, picture'));
  slides = slides.filter((li) => !li.classList.contains('splide__slide--clone'));
  const seen = new Set();
  slides = slides.filter((li) => {
    const key = `${li.querySelector('a[href]')?.getAttribute('href') || ''}|${li.textContent.trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Controls-only fragment: nothing to author; the slides belong to another mapping.
  if (!slides.length && !element.querySelector(`${HEADINGS}, p, img`)) {
    element.remove();
    return;
  }

  // Intro row: content outside the carousel
  const splideRoot = element.querySelector('.splide');
  const outside = (el) => !(splideRoot && splideRoot.contains(el)) && !el.closest('li.splide__slide');
  const introNodes = [];
  [...element.querySelectorAll(`${HEADINGS}, p, a[href]`)].forEach((el) => {
    if (!outside(el)) return;
    if (!el.textContent.trim()) return;
    if (introNodes.some((n) => n.contains(el))) return;
    introNodes.push(el);
  });
  if (introNodes.length) cells.push([introNodes]);

  // Card rows
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    const heading = slide.querySelector(HEADINGS);
    const cardLink = (heading && heading.closest('a[href]')) || (img && img.closest('a[href]')) || slide.querySelector('a[href]');
    const href = cardLink ? cardLink.getAttribute('href') : '';

    const body = [];
    if (heading) {
      const h = document.createElement(heading.tagName.toLowerCase());
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.innerHTML = heading.innerHTML;
        h.append(a);
      } else {
        h.innerHTML = heading.innerHTML;
      }
      body.push(h);
    }

    // Additional text inside the slide (descriptions)
    slide.querySelectorAll('p').forEach((p) => {
      if (!p.textContent.trim() || (heading && heading.contains(p))) return;
      const np = document.createElement('p');
      np.innerHTML = p.innerHTML;
      np.querySelectorAll('a').forEach((a) => a.replaceWith(...a.childNodes));
      body.push(np);
    });

    // Extra links (e.g. topic pills) outside the card link
    slide.querySelectorAll('a[href]').forEach((a) => {
      if (a === cardLink || cardLink?.contains(a) || a.contains(cardLink)) return;
      const text = a.textContent.trim();
      if (!text) return;
      const p = document.createElement('p');
      const na = document.createElement('a');
      na.href = a.getAttribute('href');
      na.textContent = text;
      p.append(na);
      body.push(p);
    });

    if (!heading && href) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = cardLink.getAttribute('aria-label') || img?.getAttribute('alt') || href;
      p.append(a);
      body.push(p);
    }

    if (!img && !body.length) return;
    cells.push([img || '', body.length ? body : '']);
  });

  const hasArrows = !!element.querySelector('.splide__arrows, button[aria-controls], button.splide__arrow');
  const name = hasArrows ? 'carousel-cards' : 'carousel-cards (alt)';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
