/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-testimonial.
 * Source: Splide carousel of li.splide__slide (clones excluded). Each slide: h3 title (rendered
 * twice: card + modal; may be blank), quote <p>, a wrapper with name <p> + role <p>, and a portrait img
 * (with a "Click to open modal" sr span).
 * Output: one row per testimonial: [portrait image] | [optional bold title, quote, name + role].
 * Name and role are merged into the LAST paragraph (name<br>role) so the decorator's
 * "last paragraph = name" caption rule picks up both.
 */
export default function parse(element, { document }) {
  const cells = [];

  let slides = [...element.querySelectorAll('li.splide__slide')];
  if (!slides.length) slides = [...element.querySelectorAll('ul > li')];
  slides = slides.filter((li) => !li.classList.contains('splide__slide--clone') && !/clone/.test(li.id || ''));

  const seen = new Set();
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    const paras = [...slide.querySelectorAll('p')].filter((p) => p.textContent.trim());
    const key = `${img?.getAttribute('src') || ''}|${paras.map((p) => p.textContent.trim()).join('|')}`;
    if (seen.has(key)) return;
    seen.add(key);

    if (img) {
      const alt = (img.getAttribute('alt') || '').trim();
      img.setAttribute('alt', alt);
    }

    const body = [];
    const heading = [...slide.querySelectorAll('h1, h2, h3, h4, h5, h6')].find((h) => h.textContent.trim());
    if (heading) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.innerHTML = heading.innerHTML;
      p.append(strong);
      body.push(p);
    }

    // Quote paragraphs are those not inside the attribution wrapper (wrapper = a div holding 2+ short p)
    const attribution = paras.length > 1 ? paras[paras.length - 1].parentElement : null;
    const attrParas = attribution && attribution !== slide ? paras.filter((p) => p.parentElement === attribution) : [];
    const quoteParas = paras.filter((p) => !attrParas.includes(p));

    quoteParas.forEach((p) => {
      const np = document.createElement('p');
      np.innerHTML = p.innerHTML;
      body.push(np);
    });

    if (attrParas.length) {
      const np = document.createElement('p');
      attrParas.forEach((p, i) => {
        if (i) np.append(document.createElement('br'));
        np.append(...[...p.childNodes].map((n) => n.cloneNode(true)));
      });
      body.push(np);
    }

    if (!img && !body.length) return;
    cells.push([img || '', body.length ? body : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-testimonial', cells });
  element.replaceWith(block);
}
