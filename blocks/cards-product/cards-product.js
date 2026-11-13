/*
 * Cards Product
 * Product cards linking to product pages, optionally mixed with a wide promo card.
 * Each row: image | name, text, link. A row authored text-first
 * (body cell before the image cell) is rendered as the wide promo card.
 */
import { buildCardList } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const list = buildCardList(block, 'cards-product');
  [...list.children].forEach((card) => {
    const first = card.firstElementChild;
    if (first?.classList.contains('cards-product-card-body') && card.querySelector('.cards-product-card-image')) {
      card.classList.add('cards-product-card-promo');
    }
  });
  block.replaceChildren(list);
}
