/*
 * columns-intro
 * Heading on the left, copy and CTA on the right. Column 1: heading; column 2: text + link.
 * Based on the project columns block; authors may add or omit columns.
 */
import { isMediaCell, optimizeImages } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const width = Math.max(1, ...[...block.children].map((row) => row.children.length));
  block.classList.add(`columns-intro-${width}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-intro-row');
    [...row.children].forEach((col) => {
      if (isMediaCell(col)) {
        col.classList.add('columns-intro-img-col', 'columns-intro-media-col');
      } else {
        col.classList.add('columns-intro-text-col');
      }
    });
  });
  optimizeImages(block, [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }]);
}
