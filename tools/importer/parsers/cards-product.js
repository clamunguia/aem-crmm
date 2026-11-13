/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-product.
 * Source shapes (all handled):
 *  - product card: a[href] > (div > img) + (div > h4 + arrow svg + p)
 *  - promo card: div > img + div > (h2, p, empty p), no link
 * Cards are found by climbing from each heading while the parent still holds
 * only that heading, so both the <a> and <div> repeating units are covered.
 * Output (one row per card, 2 columns):
 *  - product card: image | linked name, description
 *  - promo card:   body (heading, text) | image   (text-first = wide promo card)
 */
export default function parse(element, { document }) {
  const cells = [];
  const HEADINGS = 'h1, h2, h3, h4, h5, h6';

  const absUrl = (src) => {
    if (!src) return src;
    const m = src.match(/\/_next\/image\/?\?url=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : src;
  };

  const cards = [];
  [...element.querySelectorAll(HEADINGS)].forEach((h) => {
    if (!h.textContent.trim()) return;
    let card = h;
    while (card.parentElement && card.parentElement !== element
      && card.parentElement.querySelectorAll(HEADINGS).length === 1) {
      card = card.parentElement;
    }
    if (!cards.includes(card)) cards.push(card);
  });

  cards.forEach((card) => {
    const heading = card.querySelector(HEADINGS);
    const title = heading.cloneNode(true);
    title.querySelectorAll('svg, div').forEach((n) => n.remove());
    title.querySelectorAll('[class], [style]').forEach((n) => { n.removeAttribute('class'); n.removeAttribute('style'); });
    const titleHtml = title.innerHTML.replace(/&nbsp;/g, ' ').trim();
    const titleText = title.textContent.replace(/ /g, ' ').trim();

    // image
    let media = '';
    const img = card.querySelector('img');
    if (img && img.getAttribute('src')) {
      const i = document.createElement('img');
      i.src = absUrl(img.getAttribute('src'));
      const alt = (img.getAttribute('alt') || '').replace(/ /g, ' ').trim();
      i.alt = alt && alt !== 'Image asset' ? alt : titleText;
      media = i;
    }

    // link: the card itself, or the first anchor inside it
    const link = card.matches('a[href]') ? card
      : (card.querySelector('a[href]') || card.closest('a[href]'));

    const body = [];
    const isPromo = !link;
    const h = document.createElement(isPromo ? 'h2' : 'h3');
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.innerHTML = titleHtml;
      h.append(a);
    } else {
      h.innerHTML = titleHtml;
    }
    body.push(h);

    [...card.querySelectorAll('p')].forEach((el) => {
      if (el.closest(HEADINGS) || !el.textContent.trim()) return;
      const p = document.createElement('p');
      p.innerHTML = el.innerHTML.trim();
      body.push(p);
    });

    // text-first row marks the wide promo card in blocks/cards-product
    if (isPromo && media) cells.push([body, media]);
    else cells.push([media, body]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
