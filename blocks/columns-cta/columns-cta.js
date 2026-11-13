/*
 * columns-cta
 * Side-by-side headings, each with a CTA button. Each column: heading + link.
 * Based on the project columns block; authors may add or omit columns.
 */
import { isMediaCell, optimizeImages } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const width = Math.max(1, ...[...block.children].map((row) => row.children.length));
  block.classList.add(`columns-cta-${width}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-cta-row');
    [...row.children].forEach((col) => {
      if (isMediaCell(col)) {
        col.classList.add('columns-cta-img-col', 'columns-cta-media-col');
      } else {
        col.classList.add('columns-cta-text-col');
      }
    });
  });
  optimizeImages(block, [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }]);
}
