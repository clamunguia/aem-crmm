/*
 * columns-media
 * Text beside a large photo or video.
 * Columns: text (eyebrow, heading, text, CTA) | media (image, or video link + optional poster).
 * A video file without a poster plays as a muted, looping background video with a pause button
 * (still when the visitor prefers reduced motion); with a poster it is click-to-play.
 * Options: green, boxed (text in a box), benefits-list (icon list of benefits).
 * Based on the project columns block; authors may add or omit columns.
 */
import {
  isMediaCell, optimizeImages, decorateVideoCell, findVideoLink, createVideo,
} from '../../scripts/block-utils.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg(viewBox, width, height, paths) {
  const el = document.createElementNS(SVG_NS, 'svg');
  el.setAttribute('viewBox', viewBox);
  el.setAttribute('width', width);
  el.setAttribute('height', height);
  el.setAttribute('fill', 'none');
  el.setAttribute('aria-hidden', 'true');
  paths.forEach(({ d, cls }) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    if (cls) path.setAttribute('class', cls);
    el.append(path);
  });
  return el;
}

/** Text links alone in their paragraph (not buttons) become arrow links. */
function decorateCtas(col) {
  col.querySelectorAll('p > a[href]:not(.button)').forEach((a) => {
    if (a.closest('p').textContent.trim() !== a.textContent.trim()) return;
    a.classList.add('columns-media-cta');
    a.append(svg('0 0 14 12', 14, 12, [
      { d: 'M1.375 6H12.625' },
      { d: 'M7.375 11.25L12.625 5.99998L7.375 0.75' },
    ]));
  });
}

/** Muted looping background video with a pause/play toggle. */
function decorateBackgroundVideo(col, link) {
  const { href } = link;
  const title = link.title || link.textContent.trim();
  const linkParent = link.closest('p');
  if (linkParent && linkParent.textContent.trim() === link.textContent.trim()) linkParent.remove();
  else link.remove();

  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frame = createVideo(href, { background: true, autoplay: !still, title });
  const video = frame.querySelector('video');
  frame.classList.add('columns-media-bg-video');

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'columns-media-pause';
  const label = document.createElement('span');
  label.className = 'columns-media-sr';
  button.append(svg('0 0 24 25', 48, 48, [
    { d: 'M12 24.248C18.2132 24.248 23.25 19.2113 23.25 12.998C23.25 6.78484 18.2132 1.74805 12 1.74805C5.7868 1.74805 0.75 6.78484 0.75 12.998C0.75 19.2113 5.7868 24.248 12 24.248Z', cls: 'columns-media-pause-circle' },
    { d: 'M9.75 9.24805V16.748M14.25 9.24805V16.748', cls: 'columns-media-pause-bars' },
    { d: 'M10 8.75L16 12.998L10 17.25Z', cls: 'columns-media-play-icon' },
  ]), label);

  const setState = (paused) => {
    button.classList.toggle('is-paused', paused);
    label.textContent = paused ? 'Play' : 'Pause';
    button.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
  };
  setState(still);
  button.addEventListener('click', () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  video.addEventListener('play', () => setState(false));
  video.addEventListener('pause', () => setState(true));

  frame.append(button);
  col.classList.add('columns-media-video');
  col.prepend(frame);
}

export default function decorate(block) {
  const width = Math.max(1, ...[...block.children].map((row) => row.children.length));
  block.classList.add(`columns-media-${width}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-media-row');
    [...row.children].forEach((col) => {
      const videoLink = findVideoLink(col);
      if (videoLink && !col.querySelector('h1, h2, h3, h4, h5, h6')) {
        col.classList.add('columns-media-media-col');
        const isFile = !/youtube\.com|youtu\.be|vimeo\.com/i.test(videoLink.href);
        if (isFile && !col.querySelector('picture')) decorateBackgroundVideo(col, videoLink);
        else decorateVideoCell(col, 'columns-media');
        return;
      }
      if (isMediaCell(col)) {
        col.classList.add('columns-media-img-col', 'columns-media-media-col');
      } else {
        col.classList.add('columns-media-text-col');
        decorateCtas(col);
      }
    });
  });
  optimizeImages(block, [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }]);
}
