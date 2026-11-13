/*
 * columns-stats
 * Set of stat callouts. Each column: figure (heading) + label text.
 * Based on the project columns block; authors may add or omit columns.
 */
import { isMediaCell, optimizeImages } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const width = Math.max(1, ...[...block.children].map((row) => row.children.length));
  block.classList.add(`columns-stats-${width}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-stats-row');
    [...row.children].forEach((col) => {
      if (isMediaCell(col)) {
        col.classList.add('columns-stats-img-col', 'columns-stats-media-col');
      } else {
        col.classList.add('columns-stats-text-col');
      }
    });
  });
  optimizeImages(block, [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }]);
}
