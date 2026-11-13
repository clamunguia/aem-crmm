/* eslint-disable */
/* global WebImporter */
/**
 * Parser for product-specs.
 * Source shapes (all handled):
 *  - spec accordion items: div > button > h5 "Specs: X" + div > table
 *    (thead of th; zero or more tbody, each starting with a one-cell "color collection"
 *    button row followed by data rows whose first cell is blank; header-only tables;
 *    placeholder rows with all-empty values)
 *  - sidebar resources: div > (div > svg[data-src] icon) + (div > h4 + p) + a[href] > span label
 * Output:
 *  - two-cell rows: spec title | spec content (a clean table, inline; no fragments)
 *  - one-cell rows: resource (icon, heading, text, link)
 */
export default function parse(element, { document }) {
  const cells = [];
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const stripAttrs = (el) => {
    el.querySelectorAll('[class], [style]').forEach((n) => { n.removeAttribute('class'); n.removeAttribute('style'); });
    return el;
  };

  // ---- spec accordion items ----
  const triggers = [...element.querySelectorAll('button')]
    .filter((b) => b.querySelector('h1, h2, h3, h4, h5, h6') && !b.closest('table'));

  triggers.forEach((btn) => {
    const title = clean(btn.querySelector('h1, h2, h3, h4, h5, h6').textContent);
    if (!title) return;
    let panel = btn.nextElementSibling;
    while (panel && !panel.querySelector('table') && !panel.matches('table')) panel = panel.nextElementSibling;
    const srcTable = panel && (panel.matches('table') ? panel : panel.querySelector('table'));

    const content = [];
    if (srcTable) {
      const headers = [...srcTable.querySelectorAll('thead th, thead td')].map((th) => clean(th.textContent));
      const width = headers.length || 1;
      const rows = [];
      const bodies = srcTable.querySelectorAll('tbody').length
        ? [...srcTable.querySelectorAll('tbody')] : [];
      bodies.forEach((tbody) => {
        let group = '';
        [...tbody.querySelectorAll('tr')].forEach((tr) => {
          const tds = [...tr.children];
          const groupBtn = tr.querySelector('button');
          if (groupBtn && tds.length === 1) {
            group = clean(groupBtn.getAttribute('aria-label') || groupBtn.textContent);
            return;
          }
          const vals = tds.map((td) => clean(td.textContent));
          if (!vals.slice(1).some(Boolean) && !(tds.length === 1 && vals[0])) return; // placeholder row
          if (!vals[0]) vals[0] = group;
          while (vals.length < width) vals.push('');
          rows.push(vals.slice(0, Math.max(width, vals.length)));
        });
      });

      const table = document.createElement('table');
      if (headers.length) {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        headers.forEach((h) => {
          const th = document.createElement('th');
          th.textContent = h;
          tr.append(th);
        });
        thead.append(tr);
        table.append(thead);
      }
      if (rows.length) {
        const tbody = document.createElement('tbody');
        rows.forEach((vals) => {
          const tr = document.createElement('tr');
          vals.forEach((v) => {
            const td = document.createElement('td');
            td.textContent = v;
            tr.append(td);
          });
          tbody.append(tr);
        });
        table.append(tbody);
      }
      if (headers.length || rows.length) content.push(table);
    } else if (panel) {
      // non-table panel: keep its text blocks
      [...panel.querySelectorAll('p, ul, ol')].forEach((n) => {
        if (n.parentElement.closest('p, ul, ol')) return;
        if (clean(n.textContent)) content.push(stripAttrs(n.cloneNode(true)));
      });
    }
    if (!content.length) {
      const p = document.createElement('p');
      p.textContent = title;
      content.push(p);
    }
    cells.push([title, content]);
  });

  // ---- sidebar resources ----
  const resHeadings = [...element.querySelectorAll('h1, h2, h3, h4, h5, h6')]
    .filter((h) => !h.closest('button') && clean(h.textContent));
  resHeadings.forEach((h) => {
    let card = h;
    while (card.parentElement && card.parentElement !== element
      && !card.querySelector('a[href]')) {
      card = card.parentElement;
    }
    const parts = [];

    const iconSvg = [...card.querySelectorAll('svg[data-src]')].find((s) => !s.closest('a'));
    const iconImg = [...card.querySelectorAll('img')].find((i) => !i.closest('a'));
    if (iconSvg || iconImg) {
      const img = document.createElement('img');
      img.src = iconSvg ? iconSvg.getAttribute('data-src') : iconImg.getAttribute('src');
      const name = (img.src.split('/').pop() || '').replace(/\.svg.*$/, '');
      img.alt = iconImg && iconImg.getAttribute('alt') ? iconImg.getAttribute('alt') : name.replace(/-/g, ' ');
      const p = document.createElement('p');
      p.append(img);
      parts.push(p);
    }

    const heading = document.createElement('h3');
    heading.innerHTML = h.innerHTML.replace(/&nbsp;/g, ' ').trim();
    parts.push(stripAttrs(heading));

    [...card.querySelectorAll('p')].forEach((el) => {
      if (el.closest('a') || !clean(el.textContent)) return;
      const p = document.createElement('p');
      p.innerHTML = el.innerHTML.replace(/&nbsp;/g, ' ').trim();
      parts.push(stripAttrs(p));
    });

    const link = card.querySelector('a[href]');
    if (link) {
      const label = clean((link.querySelector('span') || link).textContent) || clean(link.getAttribute('aria-label')) || 'Learn more';
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = label;
      p.append(a);
      parts.push(p);
    }
    cells.push([parts]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'product-specs', cells });
  element.replaceWith(block);
}
