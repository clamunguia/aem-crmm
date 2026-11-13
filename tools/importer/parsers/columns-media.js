/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-media.
 * Source shapes handled:
 *  - .textImageItem: [text body (eyebrow span, h2, rich-text div, arrow link)] [media (img | video)]
 *  - green promo: div[style=background] > max-width div > [text (h3, p, button)] [img] [mobile dup button]
 *  - blog split hero: [h1 + button] [img]
 *  - request form page: [h1, intro, form] [img] (form is not importable and is dropped)
 *  - stat list: ol > li columns
 * Output: one row, N columns (text | media). Videos become a link (+ poster image when real).
 * Variant: 'columns-media (green)' for the background-colored promo shape.
 */
export default function parse(element, { document }) {
  const MEDIA = 'img, picture, video, iframe';
  const hasContent = (el) => !!(el.textContent.trim() || el.querySelector(MEDIA) || el.matches(MEDIA));
  const clean = (s) => s.replace(/\s+/g, ' ').trim();

  // 1. find the element whose children are the columns
  let container = element;
  for (let i = 0; i < 6; i += 1) {
    const kids = [...container.children].filter(hasContent);
    if (kids.length !== 1 || kids[0].matches(MEDIA)) break;
    container = kids[0];
  }
  let cols = [...container.children].filter(hasContent);
  if (cols.length < 2 && container.children.length === 1 && container.matches('ol, ul')) cols = [...container.children];

  const isBlockish = (el) => !!el.querySelector('div, p, h1, h2, h3, h4, h5, h6, ul, ol, img, picture, video, iframe, a, button, form, table');

  const collect = (node, out) => {
    [...node.children].forEach((el) => {
      const tag = el.tagName.toLowerCase();
      if (['svg', 'form', 'select', 'input', 'label', 'script', 'style', 'noscript'].includes(tag)) return;
      if (el.classList.contains('sr-only')) return;
      if (/^h[1-6]$/.test(tag)) {
        if (clean(el.textContent)) out.push(el);
        return;
      }
      if (tag === 'img') {
        const src = el.getAttribute('src');
        if (!src) return;
        const img = document.createElement('img');
        img.src = src;
        img.alt = el.getAttribute('alt') || '';
        out.push(img);
        return;
      }
      if (tag === 'picture') {
        out.push(el);
        return;
      }
      if (tag === 'video' || tag === 'iframe') {
        const src = el.getAttribute('src') || (el.querySelector('source[src]') && el.querySelector('source[src]').getAttribute('src'));
        const poster = el.getAttribute('poster');
        if (poster && !/fallback/i.test(poster)) {
          const img = document.createElement('img');
          img.src = poster;
          img.alt = '';
          out.push(img);
        }
        if (src) {
          const a = document.createElement('a');
          a.href = src;
          a.textContent = src;
          const p = document.createElement('p');
          p.append(a);
          out.push(p);
        }
        return;
      }
      if (tag === 'a') {
        const label = clean(el.textContent);
        const href = el.getAttribute('href');
        if (label && href) {
          const a = document.createElement('a');
          a.href = href;
          a.textContent = label;
          const p = document.createElement('p');
          p.append(a);
          out.push(p);
        } else if (el.querySelector(MEDIA)) {
          collect(el, out);
        }
        return;
      }
      if (tag === 'button') {
        // media player controls are chrome
        if (el.parentElement && el.parentElement.querySelector('video, iframe')) return;
        const label = clean(el.textContent);
        if (!label || /^(play|pause)$/i.test(label)) return;
        const p = document.createElement('p');
        p.textContent = label;
        out.push(p);
        return;
      }
      if (tag === 'ul' || tag === 'ol') {
        if (clean(el.textContent)) out.push(el);
        return;
      }
      if (tag === 'p') {
        if (clean(el.textContent) || el.querySelector(MEDIA)) out.push(el);
        return;
      }
      if (!isBlockish(el)) {
        // text-only div/span (eyebrow, rich-text without <p>)
        if (clean(el.textContent)) {
          const p = document.createElement('p');
          p.innerHTML = el.innerHTML;
          out.push(p);
        }
        return;
      }
      collect(el, out);
    });
  };

  const row = [];
  const seenText = [];
  cols.forEach((col) => {
    const out = [];
    if (col.matches(MEDIA)) {
      const wrap = document.createElement('div');
      wrap.append(col.cloneNode(true));
      collect(wrap, out);
    } else {
      collect(col, out);
    }
    if (!out.length) return;
    // skip responsive duplicates (e.g. mobile-only copy of the CTA button)
    const txt = clean(out.map((o) => o.textContent).join(' '));
    const hasMedia = out.some((o) => o.matches(MEDIA) || o.querySelector(MEDIA) || o.querySelector('a[href]'));
    if (txt && !hasMedia && seenText.some((t) => t.includes(txt))) return;
    seenText.push(txt);
    row.push(out);
  });

  const isGreen = !element.classList.contains('textImageItem')
    && /background-color/i.test(element.getAttribute('style') || '')
    && !!element.querySelector('button, a.button-primary');
  const name = isGreen ? 'columns-media (green)' : 'columns-media';

  const cells = row.length ? [row] : [];
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
