/*
 * Hero Video
 * Full-bleed hero with a background video (or photo), headline, text and CTA.
 * Cells: media (poster image and/or video link) | headline, text, CTA.
 * The video plays muted and looped, unless the user prefers reduced motion;
 * a pause/play button is always provided.
 * Option: green.
 */
import { findVideoLink, isMediaCell, optimizeImages } from '../../scripts/block-utils.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const SVG_NS = 'http://www.w3.org/2000/svg';
const CIRCLE = 'M12 24.248C18.2132 24.248 23.25 19.2113 23.25 12.998C23.25 6.78484 18.2132 1.74805 12 1.74805C5.7868 1.74805 0.75 6.78484 0.75 12.998C0.75 19.2113 5.7868 24.248 12 24.248Z';
const ICONS = {
  pause: ['M9.75 9.24805V16.748', 'M14.25 9.24805V16.748'],
  play: ['M9.75 8.99805V16.998L16.5 12.998Z'],
};

function svgPath(d, className) {
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', className);
  return path;
}

function buildToggleIcon() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 25');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.append(svgPath(CIRCLE, 'hero-video-toggle-ring'));
  Object.entries(ICONS).forEach(([name, paths]) => {
    paths.forEach((d) => svg.append(svgPath(d, `hero-video-toggle-${name}`)));
  });
  return svg;
}

/* a paragraph holding only a link is the call to action */
function decorateCta(content) {
  content.querySelectorAll(':scope > p').forEach((p) => {
    const links = p.querySelectorAll('a[href]');
    if (links.length !== 1 || p.textContent.trim() !== links[0].textContent.trim()) return;
    const a = links[0];
    if (a.querySelector('img')) return;
    p.className = 'button-wrapper';
    a.classList.add('button');
    if (!a.matches('.primary, .secondary, .accent')) a.classList.add('primary');
    const formatting = a.parentElement !== p ? p.firstElementChild : null;
    if (formatting) formatting.replaceWith(a);
  });
}

function buildBackgroundVideo(href) {
  const video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('aria-hidden', 'true');
  video.preload = 'none';
  const source = document.createElement('source');
  source.src = href;
  video.append(source);
  return video;
}

export default function decorate(block) {
  const background = document.createElement('div');
  background.className = 'hero-video-background';
  const content = document.createElement('div');
  content.className = 'hero-video-content';
  let videoHref = '';

  [...block.querySelectorAll(':scope > div > div')].forEach((cell) => {
    const videoLink = findVideoLink(cell);
    if (videoLink && !cell.querySelector('h1, h2, h3, h4, h5, h6')) {
      videoHref = videoLink.href;
      const p = videoLink.closest('p');
      if (p && p.textContent.trim() === videoLink.textContent.trim()) p.remove();
      else videoLink.remove();
    }
    if (isMediaCell(cell) || (videoHref && !cell.querySelector('h1, h2, h3, h4, h5, h6') && !cell.textContent.trim())) {
      cell.querySelectorAll('picture').forEach((pic) => background.append(pic));
      return;
    }
    cell.querySelectorAll('picture').forEach((pic) => {
      const p = pic.closest('p');
      background.append(pic);
      if (p && !p.textContent.trim()) p.remove();
    });
    content.append(...cell.childNodes);
  });

  optimizeImages(background, [{ media: '(min-width: 900px)', width: '2000' }, { width: '900' }]);
  const poster = background.querySelector('img');
  if (poster) {
    poster.loading = 'eager';
    poster.fetchPriority = 'high';
  }

  const children = [background, content];
  // YouTube/Vimeo cannot play as a native background; only direct files are used
  if (videoHref && /\.(mp4|webm|mov)(\?|#|$)/i.test(videoHref)) {
    const video = buildBackgroundVideo(videoHref);
    background.append(video);
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'hero-video-toggle';
    const label = document.createElement('span');
    label.className = 'hero-video-toggle-label';
    toggle.append(buildToggleIcon(), label);
    const setState = (playing) => {
      toggle.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
      label.textContent = playing ? 'Pause' : 'Play';
      toggle.classList.toggle('hero-video-paused', !playing);
    };
    toggle.addEventListener('click', () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });
    video.addEventListener('play', () => setState(true));
    video.addEventListener('pause', () => setState(false));
    setState(false);
    if (!reducedMotion.matches) {
      // start after the poster (LCP) has loaded
      const start = () => {
        video.preload = 'auto';
        video.play().catch(() => setState(false));
      };
      if (document.readyState === 'complete') setTimeout(start, 0);
      else window.addEventListener('load', start, { once: true });
    }
    children.push(toggle);
  } else if (videoHref) {
    const link = document.createElement('a');
    link.href = videoHref;
    link.className = 'hero-video-watch';
    link.textContent = 'Watch video';
    content.append(link);
  }

  decorateCta(content);

  block.replaceChildren(...children);
}
