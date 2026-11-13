/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];
  const content = [];

  const video = element.querySelector('video');
  let src = '';
  let poster = '';
  if (video) {
    src = video.getAttribute('src') || '';
    if (!src) {
      const source = video.querySelector('source[src]');
      if (source) src = source.getAttribute('src');
    }
    poster = video.getAttribute('poster') || '';
  }
  if (!src) {
    // Fallback: embedded player (iframe) or an existing video link
    const iframe = element.querySelector('iframe[src]');
    const link = element.querySelector('a[href]');
    src = (iframe && iframe.getAttribute('src')) || (link && link.getAttribute('href')) || '';
  }
  if (!poster) {
    const img = element.querySelector('img[src]');
    if (img) poster = img.getAttribute('src');
  }

  if (poster) {
    const img = document.createElement('img');
    img.src = poster;
    img.alt = (video && (video.getAttribute('title') || video.getAttribute('aria-label'))) || '';
    content.push(img);
  }
  if (src) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    p.append(a);
    content.push(p);
  }

  cells.push([content.length ? content : '']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'video-poster', cells });
  element.replaceWith(block);
}
