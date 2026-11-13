/*
 * Carousel Testimonial
 * Testimonial slider: one quote at a time with name and portrait, plus arrows.
 * Each row: portrait image | quote text + name (heading or last paragraph).
 */
import { buildSlider, isMediaCell, optimizeImages } from '../../scripts/block-utils.js';

export default function decorate(block) {
  const slides = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children].filter((c) => c.textContent.trim() || c.querySelector('picture'));
    if (!cells.length) return;
    const item = document.createElement('figure');
    item.className = 'carousel-testimonial-item';
    const quote = document.createElement('blockquote');
    quote.className = 'carousel-testimonial-quote';
    const portrait = document.createElement('div');
    portrait.className = 'carousel-testimonial-portrait';
    cells.forEach((cell) => {
      if (isMediaCell(cell)) portrait.append(...cell.childNodes);
      else quote.append(...cell.childNodes);
    });
    // the name: an authored heading, or else the last short paragraph
    const caption = document.createElement('figcaption');
    caption.className = 'carousel-testimonial-name';
    const heading = quote.querySelector('h1, h2, h3, h4, h5, h6');
    const paras = [...quote.children];
    const name = heading || (paras.length > 1 ? paras[paras.length - 1] : null);
    if (name) caption.append(name);

    optimizeImages(portrait, [{ width: '400' }]);
    if (portrait.children.length) item.append(portrait);
    item.append(quote);
    if (caption.textContent.trim()) item.append(caption);
    slides.push(item);
  });
  block.replaceChildren(buildSlider(slides, 'carousel-testimonial', { label: 'Testimonials' }));
}
