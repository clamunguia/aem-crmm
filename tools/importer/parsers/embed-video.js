/* eslint-disable */
/* global WebImporter */
/**
 * Parser for embed-video.
 * Source: react-player wrapper (div.bg-black > div > iframe[src*=youtube]) or a bare
 * <iframe> (e.g. Hover designer embed) or a wrapper div > iframe. Fallback: <video src>.
 * Output: one row, one cell: optional poster image above a link to the video URL.
 * YouTube embed URLs are normalised to https://www.youtube.com/watch?v=ID.
 */
export default function parse(element, { document }) {
  const media = element.matches('iframe, video') ? element : element.querySelector('iframe[src], video[src], video source[src], iframe');

  let src = '';
  let poster = '';
  let title = '';
  if (media) {
    src = media.getAttribute('src') || media.getAttribute('data-src') || '';
    if (!src && media.tagName.toLowerCase() === 'video') {
      const source = media.querySelector('source[src]');
      if (source) src = source.getAttribute('src');
    }
    const videoEl = media.closest('video') || media;
    poster = videoEl.getAttribute('poster') || '';
    title = media.getAttribute('title') || '';
  }
  if (!src) {
    const a = element.querySelector('a[href]');
    if (a) src = a.getAttribute('href');
  }

  // normalise YouTube embed URLs
  const yt = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/i);
  if (yt) src = `https://www.youtube.com/watch?v=${yt[1]}`;
  const vimeo = src.match(/player\.vimeo\.com\/video\/(\d+)/i);
  if (vimeo) src = `https://vimeo.com/${vimeo[1]}`;
  if (src.startsWith('//')) src = `https:${src}`;

  const content = [];
  if (!poster) {
    const img = element.querySelector('img[src]');
    if (img) poster = img.getAttribute('src');
  }
  if (poster && !/fallback/i.test(poster)) {
    const img = document.createElement('img');
    img.src = poster;
    img.alt = title;
    content.push(img);
  }
  if (src) {
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    content.push(a);
  }

  const cells = content.length ? [[content]] : [];
  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-video', cells });
  element.replaceWith(block);
}
