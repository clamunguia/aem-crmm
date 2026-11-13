/*
 * Image Lightbox
 * Image(s) with a zoom button that opens a full-size lightbox.
 * Each row is one image: image | caption (optional).
 * Several rows render as a grid (e.g. before/after pairs).
 * Options: dark, swatches (colour swatch gallery; captions are colour names).
 */
import { optimizeImages } from '../../scripts/block-utils.js';

const EXPAND_ICON = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <circle class="image-lightbox-zoom-ring" cx="16" cy="16" r="15.5"></circle>
  <g stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.5 17.498L23.5 23.498"></path><path d="M8.5 12.998L8.5 8.49805L13 8.49805"></path>
    <path d="M23.5 18.998L23.5 23.498L19 23.498"></path><path d="M8.5 8.49805L14.5 14.498"></path>
  </g>
</svg>`;

function buildDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-lightbox-dialog';
  dialog.innerHTML = `<button type="button" class="image-lightbox-close" aria-label="Close"></button>
    <figure class="image-lightbox-figure"><img alt=""><figcaption></figcaption></figure>`;
  dialog.querySelector('.image-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  return dialog;
}

export default function decorate(block) {
  const swatches = block.classList.contains('swatches');
  const list = document.createElement('ul');
  list.className = 'image-lightbox-list';
  const dialog = buildDialog();
  const dialogImg = dialog.querySelector('img');
  const dialogCaption = dialog.querySelector('figcaption');

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell, i, cells) => {
      const picture = cell.querySelector('picture');
      if (!picture) return;
      const img = picture.querySelector('img');
      const fullSrc = img.currentSrc || img.src;
      const next = cells[i + 1];
      const captionCell = next && !next.querySelector('picture') ? next : null;
      const captionText = (captionCell?.textContent || cell.textContent).trim();

      const li = document.createElement('li');
      li.className = 'image-lightbox-item';
      const figure = document.createElement('figure');
      figure.className = 'image-lightbox-figure-inline';
      const media = document.createElement('div');
      media.className = 'image-lightbox-media';
      media.append(picture);
      const zoom = document.createElement('button');
      zoom.type = 'button';
      zoom.className = 'image-lightbox-zoom';
      zoom.setAttribute('aria-label', `Enlarge image${captionText ? `: ${captionText}` : ''}`);
      zoom.setAttribute('aria-haspopup', 'dialog');
      zoom.innerHTML = EXPAND_ICON;
      zoom.addEventListener('click', () => {
        dialogImg.src = fullSrc;
        dialogImg.alt = img.alt || captionText;
        dialogCaption.textContent = captionText;
        dialog.showModal();
      });
      media.append(zoom);
      figure.append(media);
      if (captionText) {
        const caption = document.createElement('figcaption');
        caption.className = 'image-lightbox-caption';
        caption.textContent = captionText;
        figure.append(caption);
      }
      if (swatches && captionText) li.dataset.colorName = captionText;
      li.append(figure);
      list.append(li);
    });
  });

  optimizeImages(list, [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }]);
  list.classList.toggle('image-lightbox-multiple', list.children.length > 1);
  block.replaceChildren(list, dialog);
}
