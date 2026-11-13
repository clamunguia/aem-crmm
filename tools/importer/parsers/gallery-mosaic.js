/* eslint-disable */
/* global WebImporter */
/**
 * Parser for gallery-mosaic.
 * Two source shapes:
 *  1. Sprinklr social mosaic: div.swe_posts_container > div.swe_posts > div.swe_post (xN).
 *     Image = background-image url on .swe_post_image, link = data-permalink,
 *     caption = author name + post text.
 *     Output (default 'gallery-mosaic'): one row per post, one cell: image, caption, link.
 *  2. Colour swatch grid: div.grid > div[style=background-color] (xN), each with a
 *     colour-name span and an "Add sample" cart button (dropped).
 *     Output ('gallery-mosaic (swatches)' or palette browser
 *     'gallery-mosaic (cyan-light-green-grey-orange-yellow)' when the page shows the
 *     colour-family filter row): one row per colour: swatch image | colour name.
 *     The swatch is a solid-colour SVG data URI built from the background colour.
 */
export default function parse(element, { document }) {
  const cells = [];
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const bgUrl = (el) => {
    const st = (el && el.getAttribute('style')) || '';
    const m = st.match(/background-image\s*:\s*url\(\s*(?:&quot;|["'])?([^"')]+?)(?:&quot;|["'])?\s*\)/i);
    return m ? m[1].replace(/&amp;/g, '&') : '';
  };

  let posts = [...element.querySelectorAll('.swe_post')];
  if (!posts.length) posts = [...element.querySelectorAll('[data-post-id]')];

  if (posts.length) {
    posts.forEach((post) => {
      const imgHost = post.querySelector('.swe_post_image, [style*="background-image"]');
      let src = bgUrl(imgHost);
      if (!src) {
        const im = post.querySelector('img[src]');
        if (im) src = im.getAttribute('src');
      }
      if (!src) return;
      const author = clean((post.querySelector('.swe_post_user_fullname') || {}).textContent);
      const text = clean((post.querySelector('.swe_post_text') || {}).textContent);
      const meta = post.querySelector('[data-permalink]');
      const permalink = meta ? meta.getAttribute('data-permalink') : '';

      const content = [];
      const img = document.createElement('img');
      img.src = src;
      img.alt = author || clean(imgHost && imgHost.getAttribute('alt')).slice(0, 120);
      content.push(img);
      if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        content.push(p);
      }
      if (permalink) {
        const a = document.createElement('a');
        a.href = permalink;
        a.textContent = author || permalink;
        const p = document.createElement('p');
        p.append(a);
        content.push(p);
      } else if (author) {
        const p = document.createElement('p');
        p.textContent = author;
        content.push(p);
      }
      cells.push([content]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: 'gallery-mosaic', cells });
    element.replaceWith(block);
    return;
  }

  // colour swatch grid
  let swatches = [...element.querySelectorAll(':scope > div[style*="background-color"]')];
  if (!swatches.length) swatches = [...element.querySelectorAll(':scope > div')].filter((d) => d.querySelector(':scope > span'));

  const toHex = (color) => {
    const m = (color || '').match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (m) return `#${[m[1], m[2], m[3]].map((n) => (+n).toString(16).padStart(2, '0')).join('')}`;
    const h = (color || '').match(/#[0-9a-f]{3,8}/i);
    return h ? h[0] : '';
  };

  swatches.forEach((sw) => {
    const nameEl = sw.querySelector(':scope > span') || sw.querySelector('span');
    const name = clean(nameEl ? nameEl.textContent : sw.textContent.replace(/Add sample/i, ''));
    if (!name) return;
    const st = sw.getAttribute('style') || '';
    const bgm = st.match(/background-color\s*:\s*([^;]+)/i);
    const hex = toHex(bgm ? bgm[1] : '');
    const imgSrc = bgUrl(sw) || (sw.querySelector('img[src]') && sw.querySelector('img[src]').getAttribute('src'));
    const img = document.createElement('img');
    img.alt = name;
    if (imgSrc) {
      img.src = imgSrc;
    } else if (hex) {
      img.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="${hex}"/></svg>`)}`;
    }
    const p = document.createElement('p');
    p.textContent = name;
    // keep the colour value as text too, so it survives if the data-URI image is dropped
    const swatchCell = [];
    if (img.getAttribute('src')) swatchCell.push(img);
    if (hex && !imgSrc) {
      const hp = document.createElement('p');
      hp.textContent = hex;
      swatchCell.push(hp);
    }
    cells.push([swatchCell.length ? swatchCell : '', p]);
  });

  // palette browser variant: the page shows a colour-family filter row just before the grid
  const prev = element.previousElementSibling;
  const hasFilters = !!(prev && /\b(green|brown|gray|grey|blue|white|black|neutral|red|orange|yellow|purple)\b/i.test(clean(prev.textContent).replace(/([a-z])(?=green|brown|gray|grey|blue|white|black|neutral|red|orange|yellow|purple)/gi, '$1 ')));
  const variant = hasFilters ? 'cyan-light-green-grey-orange-yellow' : 'swatches';

  const block = WebImporter.Blocks.createBlock(document, { name: `gallery-mosaic (${variant})`, cells });
  element.replaceWith(block);
}
