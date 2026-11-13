/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-video.
 * Source: div.hero-video-overlay > [div.hero-cover (img poster)] + [div (div.react-player > video, pause button)]
 *         + [div (h1, div intro, div > a CTA)]
 * Output (Hero library convention, read cell-by-cell by blocks/hero-video):
 *   row 1: background media (poster image + video file link)
 *   row 2: headline, text, CTA
 * Only direct video files play as background in the block; YouTube/Vimeo URLs are emitted as a plain link
 * and the block renders them as a "Watch video" link.
 * Variant (from DOM): CTA carrying an arrow icon -> 'hero-video (green)'; otherwise plain 'hero-video'.
 */
export default function parse(element, { document }) {
  const isImageUrl = (src) => !!src && !src.startsWith('data:')
    && (/\.(jpe?g|png|gif|webp|avif|svg)(\?|&|#|$)/i.test(src) || /\/_next\/image\/?\?url=/i.test(src));
  const isVideoUrl = (src) => !!src && /youtube\.com|youtu\.be|vimeo\.com|\.(mp4|webm|m3u8|mov)(\?|#|$)/i.test(src);

  const heading = element.querySelector('h1, h2, h3');

  // ---- media cell
  const mediaCell = [];
  const video = element.querySelector('video');
  let videoSrc = '';
  if (video) {
    const source = video.querySelector('source[src]');
    videoSrc = video.getAttribute('src') || (source && source.getAttribute('src')) || '';
  }
  if (!videoSrc) {
    const iframe = element.querySelector('iframe[src]');
    if (iframe && isVideoUrl(iframe.getAttribute('src'))) videoSrc = iframe.getAttribute('src');
  }
  if (!videoSrc) {
    const link = [...element.querySelectorAll('a[href]')].find((a) => isVideoUrl(a.getAttribute('href')));
    if (link) videoSrc = link.getAttribute('href');
  }

  // poster: first usable image not inside a CTA, then the video's poster attribute
  // (some pages render the cover img with the page URL as src; those are skipped)
  const img = [...element.querySelectorAll('img')].find((i) => !i.closest('a') && isImageUrl(i.getAttribute('src')));
  let posterSrc = img ? img.getAttribute('src') : '';
  if (!posterSrc && video && isImageUrl(video.getAttribute('poster'))) posterSrc = video.getAttribute('poster');
  if (posterSrc) {
    const poster = document.createElement('img');
    poster.src = posterSrc;
    const alt = (img && img.getAttribute('alt')) || '';
    poster.alt = alt === 'Image asset' ? '' : alt;
    mediaCell.push(poster);
  }
  if (videoSrc) {
    const a = document.createElement('a');
    a.href = videoSrc;
    a.textContent = videoSrc;
    const p = document.createElement('p');
    p.append(a);
    mediaCell.push(p);
  }

  // ---- text cell
  const textCell = [];
  if (heading) textCell.push(heading);
  const textCol = heading ? heading.parentElement : null;
  const ctas = [];
  const seen = new Set();
  if (textCol) {
    [...textCol.children].forEach((child) => {
      if (child === heading || child.tagName === 'BUTTON') return;
      const links = child.tagName === 'A' ? [child] : [...child.querySelectorAll('a[href]')];
      if (links.length) {
        links.forEach((a) => {
          const href = a.getAttribute('href');
          const label = (a.querySelector('span') || a).textContent.trim();
          if (!href || !label || seen.has(href)) return;
          seen.add(href);
          ctas.push({ href, label, icon: !!a.querySelector('svg, img') });
        });
        return;
      }
      if (!child.textContent.trim()) return;
      if (child.tagName === 'P') {
        textCell.push(child);
        return;
      }
      // intro divs may hold several paragraphs separated by blank lines
      const parts = child.querySelector('p') ? [...child.querySelectorAll('p')].map((p) => p.innerHTML)
        : child.innerHTML.split(/(?:\s*<br\s*\/?>\s*){2,}|\n\s*\n/);
      parts.map((html) => html.trim()).filter(Boolean).forEach((html) => {
        const p = document.createElement('p');
        p.innerHTML = html;
        textCell.push(p);
      });
    });
  }
  ctas.forEach(({ href, label }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    const p = document.createElement('p');
    p.append(a);
    textCell.push(p);
  });

  const cells = [];
  if (mediaCell.length) cells.push([mediaCell]);
  cells.push([textCell]);

  const name = ctas.some((c) => c.icon) ? 'hero-video (green)' : 'hero-video';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
