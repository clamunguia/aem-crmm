/* eslint-disable */
/* global WebImporter */
/**
 * Parser for product-configurator.
 * Source (product detail panel):
 *   div > ... > [div (h1, p intro)]                      (mobile heading, duplicated on desktop)
 *             + figure (img#product-detail-image)          (preview)
 *             + div > [div (h1, p intro)] + div > [div (span group title, div > button* choices), div (a CTA, span note)]
 *   Each choice button: div > img swatch, p label, p description.
 * Output (blocks/product-configurator), authored content only (no external services):
 *   row 1: preview image | name (heading), intro
 *   option-group rows: title (+ choice descriptions as notes) | list of choices (swatch image, label, preview image)
 *   single-cell rows: CTAs / notes
 * Both catalogued instances are plain (variant null): always 'product-configurator'.
 */
export default function parse(element, { document }) {
  const isImageUrl = (src) => !!src && !src.startsWith('data:')
    && (/\.(jpe?g|png|gif|webp|avif|svg)(\?|&|#|$)/i.test(src) || /\/_next\/image\/?\?url=/i.test(src));
  const makeImg = (src, alt) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    return img;
  };
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

  const cells = [];

  // ---- row 1: preview | name + intro (first heading only; the desktop copy duplicates it)
  const heading = element.querySelector('h1, h2, h3');
  const introCell = [];
  if (heading) {
    const headingWrap = heading.parentElement;
    introCell.push(heading);
    if (headingWrap && headingWrap !== element) {
      [...headingWrap.children].forEach((child) => {
        if (child !== heading && child.textContent.trim() && /^(P|SPAN|DIV|UL|OL)$/.test(child.tagName)) {
          if (child.tagName === 'P' || /^(UL|OL)$/.test(child.tagName)) introCell.push(child);
          else {
            const p = document.createElement('p');
            p.innerHTML = child.innerHTML;
            introCell.push(p);
          }
        }
      });
    }
  }
  const previewEl = element.querySelector('#product-detail-image')
    || [...element.querySelectorAll('figure img, img')].find((i) => !i.closest('button') && isImageUrl(i.getAttribute('src')));
  const previewCell = [];
  if (previewEl && isImageUrl(previewEl.getAttribute('src'))) {
    previewCell.push(makeImg(previewEl.getAttribute('src'), previewEl.getAttribute('alt')));
  }
  if (previewCell.length) cells.push([previewCell, introCell]);
  else cells.push([introCell, '']);

  // ---- option groups: containers whose direct children are choice buttons
  const choiceButtons = [...element.querySelectorAll('button')]
    .filter((b) => b.querySelector('img') || clean(b.textContent));
  const containers = [];
  choiceButtons.forEach((b) => {
    if (b.parentElement && !containers.includes(b.parentElement)) containers.push(b.parentElement);
  });

  const groupEls = [];
  containers.forEach((container) => {
    const buttons = [...container.children].filter((c) => c.tagName === 'BUTTON' && choiceButtons.includes(c));
    if (!buttons.length) return;
    const groupEl = container.parentElement;
    if (groupEl && !groupEls.includes(groupEl)) groupEls.push(groupEl);

    // group title: text-only sibling preceding the choices
    let title = '';
    let sib = container.previousElementSibling;
    while (sib && !title) {
      if (!sib.querySelector('button, img')) title = clean(sib.textContent);
      sib = sib.previousElementSibling;
    }
    if (!title) title = 'Available products';

    const titleCell = [];
    const titleP = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = title;
    titleP.append(strong);
    titleCell.push(titleP);

    const ul = document.createElement('ul');
    buttons.forEach((button, i) => {
      const img = button.querySelector('img');
      const texts = [...button.querySelectorAll('p, span')].filter((t) => !t.querySelector('p, span') && clean(t.textContent));
      const label = clean(texts[0] && texts[0].textContent)
        || clean(img && (img.getAttribute('title') || img.getAttribute('alt'))) || `Option ${i + 1}`;
      const li = document.createElement('li');
      if (img && isImageUrl(img.getAttribute('src'))) {
        const src = img.getAttribute('src');
        li.append(makeImg(src, img.getAttribute('alt') || label));
        li.append(document.createTextNode(label));
        // second image = preview shown when the choice is selected
        li.append(makeImg(src, img.getAttribute('alt') || label));
      } else {
        li.append(document.createTextNode(label));
      }
      ul.append(li);
      // keep choice descriptions as group notes (the block renders notes under the title)
      const desc = texts.slice(1).map((t) => clean(t.textContent)).filter(Boolean).join(' ');
      if (desc) {
        const p = document.createElement('p');
        const b = document.createElement('strong');
        b.textContent = `${label}:`;
        p.append(b, ` ${desc}`);
        titleCell.push(p);
      }
    });
    cells.push([titleCell, [ul]]);
  });

  // ---- CTAs / notes: siblings of the groups that hold no choices
  const actionCell = [];
  const seen = new Set();
  const collect = (node) => {
    [...node.children].forEach((child) => {
      if (child.tagName === 'BUTTON' || child.querySelector('button')) return;
      if (child.tagName === 'A') {
        const href = child.getAttribute('href');
        const label = clean((child.querySelector('span') || child).textContent);
        if (href && label && !seen.has(href)) {
          seen.add(href);
          const a = document.createElement('a');
          a.href = href;
          a.textContent = label;
          const p = document.createElement('p');
          p.append(a);
          actionCell.push(p);
        }
        return;
      }
      if (/^(P|SPAN)$/.test(child.tagName)) {
        if (!clean(child.textContent)) return;
        const p = document.createElement('p');
        p.innerHTML = child.innerHTML;
        actionCell.push(p);
        return;
      }
      collect(child);
    });
  };
  if (groupEls.length) {
    const groupParents = [];
    groupEls.forEach((g) => { if (g.parentElement && !groupParents.includes(g.parentElement)) groupParents.push(g.parentElement); });
    groupParents.forEach((parent) => {
      [...parent.children].filter((c) => !groupEls.includes(c) && !c.querySelector('button, h1, h2, h3'))
        .forEach((c) => {
          if (c.tagName === 'A') {
            const wrap = document.createElement('div');
            wrap.append(c);
            collect(wrap);
          } else collect(c);
        });
    });
  } else {
    // no picker found: keep any links outside the heading/preview as CTAs
    [...element.querySelectorAll('a[href]')].filter((a) => !a.closest('figure')).forEach((a) => {
      const wrap = document.createElement('div');
      wrap.append(a.cloneNode(true));
      collect(wrap);
    });
  }
  actionCell.forEach((p) => cells.push([p]));

  const block = WebImporter.Blocks.createBlock(document, { name: 'product-configurator', cells });
  element.replaceWith(block);
}
