/*
 * Video Poster
 * Standalone video with a poster image and play button.
 * One row: video link (YouTube, Vimeo or a video file) + optional poster image.
 * With a poster the video loads on click; otherwise when scrolled into view.
 * Based on the Block Collection video block.
 */
import { createVideo, optimizeImages } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const link = block.querySelector('a[href]');
  if (!link) return;
  const { href } = link;
  const title = link.title || link.textContent.trim();
  const placeholder = block.querySelector('picture');
  block.textContent = '';
  block.dataset.embedLoaded = 'false';

  const load = (autoplay) => {
    if (block.dataset.embedLoaded === 'true') return;
    block.dataset.embedLoaded = 'true';
    block.replaceChildren(createVideo(href, { autoplay, title }));
  };

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-poster-placeholder';
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'video-poster-play';
    play.setAttribute('aria-label', title && title !== href ? `Play video: ${title}` : 'Play video');
    wrapper.append(placeholder, play);
    optimizeImages(wrapper, [{ width: '1200' }]);
    wrapper.addEventListener('click', () => load(true), { once: true });
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        load(false);
      }
    }, { rootMargin: '200px' });
    observer.observe(block);
  }
}
