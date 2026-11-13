/*
 * Shared helpers for generated blocks (images, video, sliders).
 * Blocks import from /scripts/ only; fragment.js is the only cross-block import.
 */
import { createOptimizedPicture } from './aem.js';

/**
 * Replaces authored pictures with optimized ones, but only for same-origin,
 * non-SVG images (migrated images keep absolute source URLs until upload).
 * @param {Element} root container to scan
 * @param {Array} breakpoints createOptimizedPicture breakpoints
 */
export function optimizeImages(root, breakpoints = [{ width: '750' }]) {
  root.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, breakpoints));
  });
}

/**
 * True when a cell holds only an image (picture or icon), no meaningful text.
 * @param {Element} cell
 */
export function isMediaCell(cell) {
  if (!cell) return false;
  const hasMedia = cell.querySelector('picture, img, video, iframe');
  return !!hasMedia && !cell.textContent.trim();
}

/**
 * True when an href points to a video (YouTube, Vimeo or a video file).
 * @param {string} href
 */
export function isVideoHref(href) {
  if (!href) return false;
  return /youtube\.com|youtu\.be|vimeo\.com|\.(mp4|webm|m3u8|mov)(\?|#|$)/i.test(href);
}

/**
 * Finds the first video link inside an element.
 * @param {Element} el
 * @returns {HTMLAnchorElement|null}
 */
export function findVideoLink(el) {
  if (!el) return null;
  return [...el.querySelectorAll('a[href]')].find((a) => isVideoHref(a.href)) || null;
}

function youtubeId(url) {
  if (url.hostname.includes('youtu.be')) return url.pathname.split('/')[1];
  if (url.pathname.startsWith('/embed/')) return url.pathname.split('/')[2];
  if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2];
  return url.searchParams.get('v') || '';
}

/**
 * Builds a responsive video element (iframe for YouTube/Vimeo, <video> otherwise).
 * @param {string} href video URL
 * @param {object} [opts]
 * @param {boolean} [opts.autoplay]
 * @param {boolean} [opts.background] muted, looped, no controls
 * @param {string} [opts.title]
 * @returns {HTMLElement}
 */
export function createVideo(href, { autoplay = false, background = false, title = '' } = {}) {
  const url = new URL(href, window.location.href);
  const wrapper = document.createElement('div');
  wrapper.className = 'player-frame';
  const isYoutube = /youtube\.com|youtu\.be/.test(url.hostname);
  const isVimeo = /vimeo\.com/.test(url.hostname);

  if (isYoutube || isVimeo) {
    const params = new URLSearchParams();
    if (autoplay) params.set('autoplay', '1');
    if (background) {
      params.set(isYoutube ? 'mute' : 'muted', '1');
      params.set('loop', '1');
      params.set('controls', '0');
      params.set('playsinline', '1');
      if (isVimeo) params.set('background', '1');
    }
    let src;
    if (isYoutube) {
      const id = youtubeId(url);
      params.set('rel', '0');
      if (background && id) params.set('playlist', id);
      src = `https://www.youtube.com/embed/${encodeURIComponent(id)}?${params}`;
    } else {
      const id = url.pathname.split('/').filter(Boolean).pop();
      src = `https://player.vimeo.com/video/${encodeURIComponent(id)}?${params}`;
    }
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title || `Video from ${url.hostname}`;
    iframe.loading = 'lazy';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.allowFullscreen = true;
    wrapper.append(iframe);
    return wrapper;
  }

  const video = document.createElement('video');
  video.playsInline = true;
  video.preload = 'metadata';
  if (background) {
    video.muted = true;
    video.loop = true;
    video.setAttribute('muted', '');
  } else {
    video.controls = true;
  }
  if (autoplay) video.autoplay = true;
  if (title) video.setAttribute('aria-label', title);
  const source = document.createElement('source');
  source.src = url.href;
  const ext = url.pathname.split('.').pop().toLowerCase();
  if (ext === 'mp4' || ext === 'webm') source.type = `video/${ext}`;
  video.append(source);
  wrapper.append(video);
  return wrapper;
}

/**
 * Turns a container holding a poster picture and/or a video link into a
 * click-to-play video. Without a poster the video loads when scrolled near.
 * @param {Element} container cell holding the picture and the link
 * @param {string} prefix class prefix (block name)
 * @returns {boolean} true when a video link was found
 */
export function decorateVideoCell(container, prefix) {
  const link = findVideoLink(container);
  if (!link) return false;
  const { href } = link;
  const title = link.title || link.textContent.trim();
  const poster = container.querySelector('picture');
  const linkParent = link.closest('p');
  if (linkParent && linkParent.textContent.trim() === link.textContent.trim()) linkParent.remove();
  else link.remove();
  container.classList.add(`${prefix}-video`);

  if (poster) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `${prefix}-play`;
    button.setAttribute('aria-label', title ? `Play video: ${title}` : 'Play video');
    const posterWrap = document.createElement('div');
    posterWrap.className = `${prefix}-poster`;
    poster.closest('p')?.remove();
    posterWrap.append(poster, button);
    container.prepend(posterWrap);
    posterWrap.addEventListener('click', () => {
      posterWrap.replaceWith(createVideo(href, { autoplay: true, title }));
    }, { once: true });
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        container.prepend(createVideo(href, { title }));
      }
    }, { rootMargin: '200px' });
    observer.observe(container);
  }
  return true;
}

/**
 * Builds a horizontal scroll-snap slider with prev/next buttons and a progress bar.
 * @param {HTMLElement[]} items slide contents (moved into <li>s)
 * @param {string} prefix class prefix (block name)
 * @param {object} [opts]
 * @param {string} [opts.label] accessible name of the slider
 * @returns {HTMLElement} slider root
 */
export function buildSlider(items, prefix, { label = 'Carousel' } = {}) {
  const root = document.createElement('div');
  root.className = `${prefix}-slider`;
  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'carousel');
  root.setAttribute('aria-label', label);

  const track = document.createElement('ul');
  track.className = `${prefix}-track`;
  items.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = `${prefix}-slide`;
    li.setAttribute('aria-roledescription', 'slide');
    li.setAttribute('aria-label', `${i + 1} of ${items.length}`);
    li.append(item);
    track.append(li);
  });

  const controls = document.createElement('div');
  controls.className = `${prefix}-controls`;
  const progress = document.createElement('div');
  progress.className = `${prefix}-progress`;
  const bar = document.createElement('span');
  bar.className = `${prefix}-progress-bar`;
  progress.append(bar);
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = `${prefix}-prev`;
  prev.setAttribute('aria-label', 'Previous');
  const next = document.createElement('button');
  next.type = 'button';
  next.className = `${prefix}-next`;
  next.setAttribute('aria-label', 'Next');
  controls.append(progress, prev, next);

  const step = () => {
    const first = track.querySelector('li');
    if (!first) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    const overflowing = max > 1;
    root.classList.toggle(`${prefix}-static`, !overflowing);
    controls.hidden = !overflowing;
    const visible = track.clientWidth / (track.scrollWidth || 1);
    const ratio = max > 0 ? track.scrollLeft / max : 0;
    bar.style.width = `${Math.min(100, visible * 100)}%`;
    bar.style.marginLeft = `${ratio * (100 - Math.min(100, visible * 100))}%`;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max - 1;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);

  root.append(track, controls);
  return root;
}

/**
 * Converts block rows into a <ul> of cards. Media-only cells become
 * `${prefix}-card-image` (or `-card-icon` for icons/SVGs); the rest become
 * `${prefix}-card-body`. A card with exactly one distinct link target gets
 * `${prefix}-card-linked` so CSS can make the whole card clickable.
 * @param {Element} block
 * @param {string} prefix class prefix (block name)
 * @returns {HTMLUListElement}
 */
export function buildCardList(block, prefix) {
  const ul = document.createElement('ul');
  ul.className = `${prefix}-list`;
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells.some((c) => c.textContent.trim() || c.querySelector('picture, img, a'))) return;
    const li = document.createElement('li');
    li.className = `${prefix}-card`;
    cells.forEach((cell) => {
      if (!cell.textContent.trim() && !cell.querySelector('picture, img, a, span.icon')) return;
      if (isMediaCell(cell) || (cell.querySelector('span.icon') && !cell.textContent.trim())) {
        const img = cell.querySelector('img');
        const isIcon = cell.querySelector('span.icon') || (img && /\.svg(\?|$)/i.test(img.src));
        cell.className = isIcon ? `${prefix}-card-icon` : `${prefix}-card-image`;
      } else {
        cell.className = `${prefix}-card-body`;
      }
      li.append(cell);
    });
    const hrefs = new Set([...li.querySelectorAll('a[href]')].map((a) => a.href));
    if (hrefs.size === 1) {
      li.classList.add(`${prefix}-card-linked`);
      li.querySelector('a[href]').classList.add(`${prefix}-card-link`);
    }
    ul.append(li);
  });
  optimizeImages(ul);
  return ul;
}
