/*
 * Hero Split
 * Page-opening split banner: text panel (heading, intro, CTAs) beside a
 * full-height photo or video.
 * Cells: text | media (image, or a video link with optional poster), in either order.
 * Options: alt, light, light-2.
 */
import {
  createVideo, findVideoLink, isMediaCell, optimizeImages,
} from '../../scripts/block-utils.js';

const LOOKS = ['alt', 'light', 'light-2'];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export default function decorate(block) {
  const text = document.createElement('div');
  text.className = 'hero-split-content';
  const media = document.createElement('div');
  media.className = 'hero-split-media';

  const cells = [...block.querySelectorAll(':scope > div > div')];
  cells.forEach((cell) => {
    const videoLink = findVideoLink(cell);
    const hasHeading = cell.querySelector('h1, h2, h3, h4, h5, h6');
    if (videoLink && !hasHeading) {
      const poster = cell.querySelector('picture');
      if (poster) media.append(poster);
      media.append(createVideo(videoLink.href, {
        autoplay: !reducedMotion.matches,
        background: true,
        title: videoLink.textContent.trim(),
      }));
      media.classList.add('hero-split-media-video');
    } else if (isMediaCell(cell)) {
      media.append(...cell.childNodes);
    } else {
      // pictures authored inside the text cell move to the media panel
      cell.querySelectorAll('picture').forEach((pic) => {
        const p = pic.closest('p');
        media.append(pic);
        if (p && !p.textContent.trim()) p.remove();
      });
      text.append(...cell.childNodes);
    }
  });

  optimizeImages(media, [{ media: '(min-width: 900px)', width: '1400' }, { width: '750' }]);
  media.querySelectorAll('img').forEach((img, i) => {
    if (i === 0) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    }
  });

  const children = [text];
  if (media.children.length) children.push(media);
  block.classList.toggle('hero-split-no-media', !media.children.length);
  // a text-only hero with no look chosen renders as the light section intro
  if (!media.children.length && !LOOKS.some((look) => block.classList.contains(look))) {
    block.classList.add('light');
  }
  block.replaceChildren(...children);
}
