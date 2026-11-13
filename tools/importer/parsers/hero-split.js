/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-split.
 * Sources:
 *  - landing hero: div.w-full > div (flex) > [div.hero-aspect-square (img|video)] + [div (h1, span intro, div CTAs)]
 *  - blog intro:   div > [div (h1, div > p intro, button gallery)] + [div (img)]
 * Output: one row, two cells: text (heading, intro, CTA links) | media (image, or video link + poster).
 * Variant (from DOM): blog intro layout -> plain 'hero-split'; landing hero with video media or
 * icon CTA -> 'light'; landing hero with 2+ CTAs -> 'light-2'; other landing heroes -> 'alt'.
 */
export default function parse(element, { document }) {
  const heading = element.querySelector('h1, h2, h3');

  // Text column = child of the flex row containing the heading; media column = sibling holding img/video
  let textCol = heading;
  let row = null;
  while (textCol && textCol.parentElement && textCol.parentElement !== element) {
    if ([...textCol.parentElement.children].some((c) => c !== textCol && c.querySelector('img, video, picture'))) break;
    textCol = textCol.parentElement;
  }
  if (textCol) row = textCol.parentElement;
  const mediaCol = row ? [...row.children].find((c) => c !== textCol && c.querySelector('img, video, picture')) : null;

  // ---- text cell
  const textCell = [];
  if (heading) textCell.push(heading);

  const ctaLinks = [];
  const seen = new Set();
  const intro = [];
  if (textCol) {
    const walk = (node) => {
      [...node.children].forEach((child) => {
        if (child === heading || child.contains(heading)) {
          if (child !== heading) walk(child);
          return;
        }
        if (child.tagName === 'BUTTON') return; // JS-only chrome (e.g. gallery modal trigger)
        if (child.tagName === 'A') {
          const href = child.getAttribute('href');
          const label = (child.querySelector('span') || child).textContent.trim();
          if (href && label && !seen.has(href)) {
            seen.add(href);
            ctaLinks.push({ href, label, el: child });
          }
          return;
        }
        if (child.tagName === 'P' || child.tagName === 'SPAN') {
          if (!child.textContent.trim()) return;
          intro.push(child);
          return;
        }
        if (child.tagName === 'DIV') walk(child);
      });
    };
    walk(textCol);
  }

  intro.forEach((el) => {
    if (el.tagName === 'P') textCell.push(el);
    else {
      const p = document.createElement('p');
      p.innerHTML = el.innerHTML;
      textCell.push(p);
    }
  });
  ctaLinks.forEach(({ href, label }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    const p = document.createElement('p');
    p.append(a);
    textCell.push(p);
  });

  // ---- media cell
  const mediaCell = [];
  let hasVideo = false;
  if (mediaCol) {
    const video = mediaCol.querySelector('video');
    const img = mediaCol.querySelector('img');
    if (video) {
      const source = video.getAttribute('src') || (video.querySelector('source') && video.querySelector('source').getAttribute('src'));
      const posterSrc = video.getAttribute('poster');
      if (posterSrc || img) {
        const poster = document.createElement('img');
        poster.src = posterSrc || img.getAttribute('src');
        poster.alt = (img && img.getAttribute('alt')) || '';
        mediaCell.push(poster);
      }
      if (source) {
        hasVideo = true;
        const a = document.createElement('a');
        a.href = source;
        a.textContent = source;
        const p = document.createElement('p');
        p.append(a);
        mediaCell.push(p);
      }
    } else if (img) {
      const image = document.createElement('img');
      image.src = img.getAttribute('src') || '';
      image.alt = img.getAttribute('alt') || '';
      mediaCell.push(image);
    }
  }

  const cells = [];
  if (mediaCell.length) cells.push([textCell, mediaCell]);
  else cells.push([textCell]);

  // ---- variant detection
  // text-only horizontal-hero sections (careers, architect pages) belong to the landing/alt family too
  const landing = !!element.querySelector('.hero-aspect-square')
    || element.classList.contains('horizontal-hero') || !!element.querySelector('.horizontal-hero')
    || (mediaCol && row && row.firstElementChild === mediaCol);
  let name = 'hero-split';
  if (landing) {
    const iconCta = ctaLinks.some(({ el }) => el.querySelector('svg, img'));
    if (hasVideo || iconCta) name = 'hero-split (light)';
    else if (ctaLinks.length > 1) name = 'hero-split (light-2)';
    else name = 'hero-split (alt)';
  }

  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
