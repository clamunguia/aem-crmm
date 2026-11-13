/*
 * Author Bio
 * Blog author name and bio.
 * Rows/cells: optional portrait | name (heading) + bio text.
 */
import { optimizeImages, isMediaCell } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const image = document.createElement('div');
  image.className = 'author-bio-image';
  const body = document.createElement('div');
  body.className = 'author-bio-body';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      if (isMediaCell(cell)) image.append(...cell.childNodes);
      else body.append(...cell.childNodes);
    });
  });

  const children = [];
  if (image.children.length) {
    optimizeImages(image, [{ width: '240' }]);
    children.push(image);
  }
  children.push(body);
  block.replaceChildren(...children);
}
