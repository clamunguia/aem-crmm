/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-media.
 * Source: div.splide > div.splide__track > ul.splide__list > li.splide__slide
 *   - homepage:     li[aria-label="Open video player..."] > div[tabindex] > [div (video[poster], play svg)] + h5
 *   - product page: li > div > [div (video[poster]), button "Play"] + h2
 * Output (Carousel convention, blocks/carousel-media): one row per slide:
 *   media (poster image + video link, or image) | caption (heading, text).
 * Variant (from DOM): tiles with an inline Play button -> 'carousel-media (dark)'; otherwise plain.
 */
export default function parse(element, { document }) {
  const isImageUrl = (src) => !!src && !src.startsWith('data:')
    && (/\.(jpe?g|png|gif|webp|avif|svg)(\?|&|#|$)/i.test(src) || /\/_next\/image\/?\?url=/i.test(src));

  let slides = [...element.querySelectorAll('.splide__list > li, ul[role="presentation"] > li')];
  if (!slides.length) slides = [...element.querySelectorAll('li')];
  slides = slides.filter((li, i, arr) => arr.indexOf(li) === i && !li.classList.contains('splide__slide--clone'));

  const cells = [];
  let inlinePlay = false;
  slides.forEach((li) => {
    const mediaCell = [];
    const video = li.querySelector('video');
    const img = [...li.querySelectorAll('img')].find((i) => isImageUrl(i.getAttribute('src')));
    let videoSrc = '';
    if (video) {
      const source = video.querySelector('source[src]');
      videoSrc = video.getAttribute('src') || (source && source.getAttribute('src')) || '';
    }
    if (!videoSrc) {
      const iframe = li.querySelector('iframe[src]');
      if (iframe) videoSrc = iframe.getAttribute('src');
    }
    const posterSrc = (video && isImageUrl(video.getAttribute('poster')) && video.getAttribute('poster'))
      || (img && img.getAttribute('src')) || '';

    const heading = li.querySelector('h1, h2, h3, h4, h5, h6');
    const captionCell = [];
    if (heading) captionCell.push(heading);
    [...li.querySelectorAll('p')].forEach((p) => {
      if (p.textContent.trim() && !p.closest('button')) captionCell.push(p);
    });

    if (posterSrc) {
      const poster = document.createElement('img');
      poster.src = posterSrc;
      poster.alt = (img && img.getAttribute('alt')) || (heading ? heading.textContent.trim() : '');
      mediaCell.push(poster);
    }
    if (videoSrc) {
      const a = document.createElement('a');
      a.href = videoSrc;
      a.textContent = videoSrc;
      const p = document.createElement('p');
      p.append(a);
      mediaCell.push(p);
      if (li.querySelector('button')) inlinePlay = true;
    }

    if (!mediaCell.length && !captionCell.length) return;
    cells.push([mediaCell, captionCell]);
  });

  const name = inlinePlay ? 'carousel-media (dark)' : 'carousel-media';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
