/* eslint-disable */
/* global WebImporter */
/**
 * Parser for image-lightbox.
 * Sources (one parser for all):
 *  - single image: div > img + button (zoom)
 *  - rtf-image gallery: div.rtf-image > figure* > (div > img + button) + figcaption
 *  - colour swatches: div.grid > div* > (div > figure > img + button "Add sample") + span (colour name)
 * Output: one row per image, 2 columns: image | caption ('' when none).
 * Variant: 'image-lightbox (swatches)' for swatch grids, 'image-lightbox (dark)' when figures
 * carry captions, else plain 'image-lightbox'.
 */
export default function parse(element, { document }) {
  const isSwatchGrid = !!element.querySelector('button[id^="add-sample"]');
  // Zoom / add-sample buttons and their icon SVGs are UI chrome (the block rebuilds the zoom button)
  element.querySelectorAll('button, svg').forEach((el) => el.remove());

  // Repeating unit with fallbacks: figures -> item wrappers -> the element itself
  let items = [...element.querySelectorAll(':scope > figure')];
  let mode = 'figure';
  if (!items.length) {
    const divItems = [...element.querySelectorAll(':scope > div')].filter((d) => d.querySelector('img'));
    if (divItems.length > 1 || (divItems.length === 1 && !element.querySelector(':scope > img'))) {
      items = divItems;
      mode = 'swatch';
    }
  }
  if (!items.length) {
    items = [element];
    mode = 'single';
  }

  const cells = [];
  let hasFigCaption = false;
  items.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;
    const image = document.createElement('img');
    image.src = img.getAttribute('src') || '';
    image.alt = img.getAttribute('alt') || '';
    const title = img.getAttribute('title');
    if (title) image.title = title;

    let caption = '';
    const figcaption = item.querySelector('figcaption');
    if (figcaption && figcaption.textContent.trim()) {
      hasFigCaption = true;
      caption = figcaption.textContent.trim();
    } else if (mode === 'swatch') {
      const spans = [...item.querySelectorAll('span')]
        .filter((s) => !s.closest('button') && s.textContent.trim());
      if (spans.length) caption = spans[spans.length - 1].textContent.trim();
    } else if (mode === 'single') {
      // Blog images: the selected node is figure > div; its caption is the sibling figcaption
      const parent = element.parentElement;
      const sibCaption = parent && parent.tagName === 'FIGURE' ? parent.querySelector(':scope > figcaption') : null;
      if (sibCaption) {
        caption = sibCaption.textContent.trim();
        sibCaption.remove();
      }
    }

    cells.push([image, caption]);
  });

  const isSwatches = mode === 'swatch' || isSwatchGrid;
  let name = 'image-lightbox';
  if (isSwatches) name = 'image-lightbox (swatches)';
  else if (hasFigCaption) name = 'image-lightbox (dark)';

  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
