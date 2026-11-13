/*
 * Carousel Media
 * Slider of media tiles (photos or video posters) with captions, arrows and progress bar.
 * Each row: media (image, and/or a video link) | caption (heading, text).
 * A tile with a video link loads and plays inline only when its poster is clicked.
 * Options: dark, alt (photo slider), alt-2 (captioned photo row).
 */
import {
  buildSlider, decorateVideoCell, findVideoLink, optimizeImages,
} from '../../scripts/block-utils.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

const PLAY_PATHS = [
  'M12 24.248C18.2132 24.248 23.25 19.2113 23.25 12.998C23.25 6.78484 18.2132 1.74805 12 1.74805C5.7868 1.74805 0.75 6.78484 0.75 12.998C0.75 19.2113 5.7868 24.248 12 24.248Z',
  'M9 16.6132C9.00053 17.2545 9.37579 17.8364 9.9598 18.1015C10.5438 18.3666 11.2289 18.266 11.712 17.8442L17.25 13.0002L11.712 8.15316C11.2291 7.73041 10.5436 7.62925 9.95922 7.89451C9.37483 8.15977 8.99967 8.74239 9 9.38416V16.6132Z',
];
const ARROW_PATHS = ['M16.5 8L1.5 8', 'M8.5 1L1.5 8L8.5 15'];

function icon(paths, width, height, viewBox) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  paths.forEach((d) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.append(path);
  });
  return svg;
}

function decorateArrow(button, label, text) {
  if (!button) return;
  button.setAttribute('aria-label', label);
  const sr = document.createElement('span');
  sr.className = 'carousel-media-sr';
  sr.textContent = text;
  button.replaceChildren(icon(ARROW_PATHS, 18, 16, '0 0 18 16'), sr);
}

export default function decorate(block) {
  const tiles = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children].filter((c) => c.textContent.trim() || c.querySelector('picture, a'));
    if (!cells.length) return;
    const tile = document.createElement('div');
    tile.className = 'carousel-media-item';
    const media = cells.find((c) => c.querySelector('picture') || findVideoLink(c)) || null;
    const captionText = cells.filter((c) => c !== media)
      .map((c) => (c.querySelector('h1, h2, h3, h4, h5, h6') || c).textContent.trim())
      .find(Boolean) || '';
    cells.forEach((cell) => {
      if (cell === media) {
        cell.className = 'carousel-media-media';
        optimizeImages(cell);
        const link = findVideoLink(cell);
        // authored video links usually show the raw URL: name the video after its caption
        // (decorateButtons copies the link text into title, so a URL title counts as unset)
        const isUrl = (s) => /^https?:\/\//.test((s || '').trim());
        if (link && captionText && isUrl(link.textContent) && (!link.title || isUrl(link.title))) {
          link.title = captionText;
        }
        if (decorateVideoCell(cell, 'carousel-media')) {
          cell.querySelector('.carousel-media-play')?.append(icon(PLAY_PATHS, 45, 45, '0 0 24 25'));
        } else if (cell.textContent.trim()) {
          // image cell that also carries caption text: split it out
          const caption = document.createElement('div');
          caption.className = 'carousel-media-caption';
          [...cell.children].filter((el) => !el.querySelector('picture') && el.tagName !== 'PICTURE')
            .forEach((el) => caption.append(el));
          tile.append(cell, caption);
          return;
        }
      } else {
        cell.className = 'carousel-media-caption';
      }
      tile.append(cell);
    });
    tiles.push(tile);
  });

  const slider = buildSlider(tiles, 'carousel-media', { label: 'Media gallery' });
  decorateArrow(slider.querySelector('.carousel-media-prev'), 'Previous slide', 'Previous');
  decorateArrow(slider.querySelector('.carousel-media-next'), 'Next slide', 'Next');
  block.replaceChildren(slider);

  // the poster (and its play button) is replaced by the player on click: keep keyboard focus on it
  block.addEventListener('click', (e) => {
    if (!e.target.closest('.carousel-media-poster')) return;
    const item = e.target.closest('.carousel-media-item');
    requestAnimationFrame(() => item?.querySelector('.player-frame video, .player-frame iframe')?.focus());
  }, true);
}
