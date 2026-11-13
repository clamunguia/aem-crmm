/*
 * Cards Feature
 * Row of feature items. Each row: icon | heading + text.
 * Option: alt (alternate layout, styled in the design pass).
 */
import { buildCardList } from '../../scripts/block-utils.js';

export default function decorate(block) {
  block.replaceChildren(buildCardList(block, 'cards-feature'));
}
