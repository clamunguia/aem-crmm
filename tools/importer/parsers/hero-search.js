/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-search.
 * Source: div.w-full > div (flex) > [div (img)] + [div (h1, span summary, search widget, disclaimer, dialog)].
 * Output: one row, two cells: image | heading, summary, search link ("Search"), disclaimer.
 * The decorator turns the standalone search link into a ZIP form.
 * Variant: 'hero-search (image-green)' when the widget is a plain ZIP lookup
 * (no "project type" select outside the location dialog), else plain 'hero-search'.
 */
export default function parse(element, { document }) {
  const flex = element.querySelector(':scope > div') || element;
  const img = flex.querySelector('img');
  const heading = flex.querySelector('h1, h2, h3');
  let contentCol = heading;
  while (contentCol && contentCol.parentElement && contentCol.parentElement !== flex) contentCol = contentCol.parentElement;
  if (!contentCol) contentCol = flex;

  // Drop location dialog and form chrome
  contentCol.querySelectorAll('dialog').forEach((d) => d.remove());

  const hasProjectSelect = [...contentCol.querySelectorAll('[class*="-control"], [role="combobox"]')]
    .some((el) => !el.closest('dialog') && !el.matches('input[type="text"]:not([role])'));

  const imageCell = [];
  if (img) {
    const image = document.createElement('img');
    image.src = img.getAttribute('src') || '';
    image.alt = img.getAttribute('alt') || '';
    imageCell.push(image);
  }

  const contentCell = [];
  if (heading) contentCell.push(heading);

  // Summary text (span sibling directly under the content column)
  [...contentCol.children].forEach((child) => {
    if (child === heading) return;
    if (child.tagName === 'SPAN' || child.tagName === 'P') {
      if (!child.textContent.trim()) return;
      const p = document.createElement('p');
      p.innerHTML = child.innerHTML;
      contentCell.push(p);
    }
  });

  // Search widget -> standalone link to the search page
  const widget = [...contentCol.children].find((c) => c.tagName === 'DIV' && c.querySelector('input, button'));
  if (widget) {
    const btn = [...widget.querySelectorAll('button, div')]
      .find((el) => !el.closest('dialog') && /^search$/i.test(el.textContent.trim()));
    const label = btn ? btn.textContent.trim() : 'Search';
    const canonical = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    let href = (canonical && canonical.getAttribute('href')) || (ogUrl && ogUrl.getAttribute('content')) || '';
    if (!href) {
      try { href = document.location.href; } catch (e) { href = '/'; }
    }
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    const p = document.createElement('p');
    p.append(a);
    contentCell.push(p);

    // Disclaimer / legal text with inline links (skip hidden error messages)
    [...widget.querySelectorAll('span')].forEach((span) => {
      if (span.closest('dialog')) return;
      if (/\binvisible\b/.test(span.className || '') || /a11yText/.test(span.className || '')) return;
      if (!span.querySelector('a') || !span.textContent.trim()) return;
      const inner = span.querySelector('p');
      const p = document.createElement('p');
      p.innerHTML = (inner || span).innerHTML;
      contentCell.push(p);
    });
  }

  const cells = [];
  if (imageCell.length) cells.push([imageCell, contentCell]);
  else cells.push([contentCell]);

  const name = hasProjectSelect ? 'hero-search' : 'hero-search (image-green)';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
