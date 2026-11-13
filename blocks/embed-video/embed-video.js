/*
 * Embed Video
 * Embedded YouTube / Vimeo player. One row: video link, optional poster image.
 * With a poster the player loads on click; otherwise when scrolled into view.
 * Based on the Block Collection embed block.
 */
import { createVideo, optimizeImages } from '../../scripts/block-utils.js';

function loadEmbed(block, href, autoplay) {
  if (block.dataset.embedLoaded === 'true') return;
  block.dataset.embedLoaded = 'true';
  block.replaceChildren(createVideo(href, { autoplay }));
}

export default function decorate(block) {
  const link = block.querySelector('a[href]');
  if (!link) return;
  const { href } = link;
  const placeholder = block.querySelector('picture');
  block.textContent = '';
  block.dataset.embedLoaded = 'false';

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-video-placeholder';
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'embed-video-play';
    play.setAttribute('aria-label', 'Play video');
    wrapper.append(placeholder, play);
    optimizeImages(wrapper, [{ width: '1200' }]);
    wrapper.addEventListener('click', () => loadEmbed(block, href, true), { once: true });
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadEmbed(block, href, false);
      }
    }, { rootMargin: '200px' });
    observer.observe(block);
  }
}
