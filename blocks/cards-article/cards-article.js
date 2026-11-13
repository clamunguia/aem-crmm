/*
 * Cards Article
 * Article teaser cards. Each row is one card: image (or icon) | title, tag, link.
 * Options: icon, icon-2, icon-alt (icon tiles), featured (first card large),
 * light, buttons (links rendered as pill buttons).
 */
import { buildCardList } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const list = buildCardList(block, 'cards-article');
  if (block.classList.contains('featured')) {
    list.firstElementChild?.classList.add('cards-article-card-featured');
  }
  block.replaceChildren(list);
}
