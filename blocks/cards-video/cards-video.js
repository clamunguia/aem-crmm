/*
 * Cards Video
 * Video cards with title and description. Each row:
 * video (poster image + video link) | title, text, optional link.
 * Clicking the poster plays the video inline.
 * Options: alt, caption-overlay (caption sits over the video).
 */
import { decorateVideoCell, findVideoLink, optimizeImages } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-video-list';
  [...block.children].forEach((row) => {
    const cells = [...row.children].filter((c) => c.textContent.trim() || c.querySelector('picture, a'));
    if (!cells.length) return;
    const li = document.createElement('li');
    li.className = 'cards-video-card';
    let mediaCell = cells.find((c) => findVideoLink(c) && (c.querySelector('picture') || !c.querySelector('h1, h2, h3, h4, h5, h6')));
    if (!mediaCell) mediaCell = cells.find((c) => c.querySelector('picture') && !c.querySelector('h1, h2, h3, h4, h5, h6'));
    cells.forEach((cell) => {
      if (cell === mediaCell) {
        cell.className = 'cards-video-card-media';
        optimizeImages(cell);
        decorateVideoCell(cell, 'cards-video');
      } else {
        cell.className = 'cards-video-card-body';
      }
      li.append(cell);
    });
    ul.append(li);
  });
  block.replaceChildren(ul);
}
