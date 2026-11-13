/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hotspot.
 * Source: Splide carousel (div.splide) of li.splide__slide items. Each slide has an image and
 * zero or more hotspots: an absolutely positioned pin <button style="left:x%;top:y%"> followed
 * by a popover sibling (h5 title, p colour, "View product" link).
 * Output: one row per slide: [image] | [hotspot 1] | [hotspot 2] ...
 * Hotspot cell = <p>"x, y"</p> + heading + text + link. Rows padded with '' to equal width.
 */
export default function parse(element, { document }) {
  const cells = [];

  let slides = [...element.querySelectorAll('li.splide__slide')];
  if (!slides.length) slides = [...element.querySelectorAll('ul > li')];
  slides = slides.filter((li) => !li.classList.contains('splide__slide--clone') && li.querySelector('img'));

  const round = (n) => String(Math.round(parseFloat(n) * 10) / 10);
  const getPos = (btn) => {
    if (!btn) return null;
    const style = btn.getAttribute('style') || '';
    const x = style.match(/left:\s*([\d.]+)%/);
    const y = style.match(/top:\s*([\d.]+)%/);
    return x && y ? `${round(x[1])}, ${round(y[1])}` : null;
  };

  const seen = new Set();
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    const key = `${img.getAttribute('src')}|${slide.textContent.trim()}`;
    if (seen.has(key)) return; // drop duplicate (aria-hidden filler) slides
    seen.add(key);

    const row = [img];
    // Popovers: elements holding a heading, paired with the preceding pin button
    const popovers = [...slide.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => {
      let pop = h;
      while (pop.parentElement && pop.parentElement !== slide && !(pop.previousElementSibling && pop.previousElementSibling.matches('button'))) {
        pop = pop.parentElement;
      }
      return { h, pop };
    });

    popovers.forEach(({ h, pop }) => {
      const btn = pop.previousElementSibling && pop.previousElementSibling.matches('button') ? pop.previousElementSibling : null;
      const pos = getPos(btn);
      const content = [];
      if (pos) {
        const p = document.createElement('p');
        p.textContent = pos;
        content.push(p);
      }
      const heading = document.createElement(h.tagName.toLowerCase());
      heading.innerHTML = h.innerHTML;
      content.push(heading);
      const scope = h.parentElement || pop;
      scope.querySelectorAll('p').forEach((p) => {
        if (!p.textContent.trim()) return;
        const np = document.createElement('p');
        np.innerHTML = p.innerHTML;
        content.push(np);
      });
      scope.querySelectorAll('a[href]').forEach((a) => {
        const text = a.textContent.trim();
        if (!text) return;
        const p = document.createElement('p');
        const na = document.createElement('a');
        na.href = a.getAttribute('href');
        na.textContent = text;
        p.append(na);
        content.push(p);
      });
      row.push(content);
    });
    cells.push(row);
  });

  const width = Math.max(1, ...cells.map((r) => r.length));
  cells.forEach((r) => { while (r.length < width) r.push(''); });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hotspot', cells });
  element.replaceWith(block);
}
