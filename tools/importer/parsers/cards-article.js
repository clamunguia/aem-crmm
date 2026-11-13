/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article.
 * Source shapes (all handled):
 *  - splide carousel: ul > li.splide__slide cards (icon tiles or image teasers with topic pills)
 *  - flex grid of image teaser cards (div > div > a)
 *  - featured layout: one large card (lg:w-8/12) + stacked cards (lg:w-5/12)
 * Output: one row per card, 2 columns: image or icon | title (linked heading), description, topic pills.
 * Variant detected from DOM: icon / icon-2 (icon tiles), featured, light (image cards
 * without topic pills), plain (image cards with topic pills).
 */
export default function parse(element, { document }) {
  const cells = [];
  const HEADINGS = 'h1, h2, h3, h4, h5, h6';
  const isPill = (a) => (a.id && a.id.indexOf('topic-pill') === 0) || /bg-tagpill/.test(a.className || '');

  // Cards: climb from each heading while the parent still holds only that heading.
  let headings = [...element.querySelectorAll(HEADINGS)];
  const cards = [];
  headings.forEach((h) => {
    let card = h;
    while (card.parentElement && card.parentElement !== element
      && card.parentElement.querySelectorAll(HEADINGS).length === 1) {
      card = card.parentElement;
    }
    if (!cards.includes(card)) cards.push(card);
  });
  // Prefer li slides when present (stable repeating unit)
  const slides = [...element.querySelectorAll('li')].filter((li) => li.querySelector(HEADINGS));
  const items = slides.length ? slides : cards;

  const absUrl = (src) => {
    if (!src) return src;
    const m = src.match(/\/_next\/image\/?\?url=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : src;
  };

  let hasIcons = false;
  let hasImages = false;
  let hasPills = false;

  items.forEach((card) => {
    const heading = card.querySelector(HEADINGS);
    if (!heading || !heading.textContent.trim()) return;

    // media
    let media = '';
    const img = card.querySelector('img');
    const iconSvg = card.querySelector('svg[data-src]');
    if (img && img.getAttribute('src')) {
      const i = document.createElement('img');
      i.src = absUrl(img.getAttribute('src'));
      const alt = img.getAttribute('alt');
      i.alt = alt && alt !== 'Image asset' ? alt : heading.textContent.trim();
      media = i;
      hasImages = true;
    } else if (iconSvg) {
      const i = document.createElement('img');
      i.src = iconSvg.getAttribute('data-src');
      const name = (i.src.split('/').pop() || '').replace(/\.svg.*$/, '');
      i.alt = name.replace(/-/g, ' ');
      media = i;
      hasIcons = true;
    }

    // primary link: first non-pill anchor
    const link = [...card.querySelectorAll('a[href]')].find((a) => !isPill(a))
      || card.closest('a[href]');

    const body = [];
    const h = document.createElement('h3');
    const title = heading.cloneNode(true);
    title.querySelectorAll('svg, div').forEach((n) => n.remove());
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.innerHTML = title.innerHTML.trim();
      h.append(a);
    } else {
      h.innerHTML = title.innerHTML.trim();
    }
    body.push(h);

    // description: leaf text p/span outside heading and pills
    [...card.querySelectorAll('p, span')].forEach((el) => {
      if (el.closest(HEADINGS)) return;
      const pa = el.closest('a');
      if (pa && isPill(pa)) return;
      if (el.querySelector('p, span')) return;
      if (!el.textContent.trim()) return;
      const p = document.createElement('p');
      p.innerHTML = el.innerHTML.trim();
      body.push(p);
    });

    // topic pills
    const pills = [...card.querySelectorAll('a[href]')].filter(isPill);
    if (pills.length) {
      hasPills = true;
      const p = document.createElement('p');
      pills.forEach((pill, idx) => {
        const a = document.createElement('a');
        a.href = pill.getAttribute('href');
        a.textContent = pill.textContent.trim();
        if (idx) p.append(' ');
        p.append(a);
      });
      body.push(p);
    }

    cells.push([media, body]);
  });

  // variant detection
  let variant = '';
  if (element.querySelector('[class*="w-8/12"]')) {
    variant = 'featured';
  } else if (hasIcons && !hasImages) {
    const tile = items[0] && items[0].querySelector('.group');
    variant = tile && /bg-neutral-color-low/.test(tile.className) ? 'icon-2' : 'icon';
  } else if (hasImages && !hasPills) {
    variant = 'light';
  }

  const name = variant ? `cards-article (${variant})` : 'cards-article';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
