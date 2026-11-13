/* eslint-disable */
/* global WebImporter */
export default function parse(element, { document }) {
  // A previous call (tab bar) may already have consumed this element as a panel.
  if (!element.isConnected) return;

  const clean = (t) => (t || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const BLOCK_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'UL', 'OL', 'TABLE', 'BLOCKQUOTE'];

  const scrub = (node) => {
    node.querySelectorAll('svg, script, style, noscript').forEach((n) => n.remove());
    node.querySelectorAll('button').forEach((b) => {
      if (clean(b.textContent)) b.replaceWith(...b.childNodes);
      else b.remove();
    });
    return node;
  };

  // Collect meaningful content (headings, paragraphs, lists, images, links) from a subtree
  const collect = (root, skip = []) => {
    const out = [];
    const walk = (node) => {
      if (skip.includes(node)) return;
      if (node.nodeType === 3) {
        const t = clean(node.textContent);
        if (t) {
          const p = document.createElement('p');
          p.textContent = t;
          out.push(p);
        }
        return;
      }
      if (node.nodeType !== 1) return;
      const tag = node.tagName;
      if (['SVG', 'svg', 'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'].includes(tag)) return;
      if (tag === 'BUTTON' && !clean(node.textContent)) return;
      if (BLOCK_TAGS.includes(tag)) {
        if (!clean(node.textContent) && !node.querySelector('img')) return;
        out.push(scrub(node.cloneNode(true)));
        return;
      }
      if (tag === 'IMG') {
        const src = node.getAttribute('src');
        if (!src) return;
        const img = document.createElement('img');
        img.src = src;
        img.alt = node.getAttribute('alt') || '';
        out.push(img);
        return;
      }
      if (tag === 'A') {
        const href = node.getAttribute('href');
        const text = clean(node.textContent);
        if (!href || !text) return;
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = href;
        a.textContent = text;
        p.append(a);
        out.push(p);
        return;
      }
      if (tag === 'FIGCAPTION') {
        const t = clean(node.textContent);
        if (t) {
          const p = document.createElement('p');
          p.textContent = t;
          out.push(p);
        }
        return;
      }
      [...node.childNodes].forEach(walk);
    };
    [...root.childNodes].forEach(walk);
    return out;
  };

  const cellOf = (nodes) => (nodes && nodes.length ? nodes : '');

  // Tab bar = element whose direct children are >= 2 buttons with text
  const isTabBar = (el) => {
    if (!el || el.nodeType !== 1) return false;
    const btns = [...el.children].filter((c) => c.tagName === 'BUTTON' && clean(c.textContent));
    return btns.length >= 2 && btns.length === el.children.length;
  };

  // If the element is (inside) a panel that follows a tab bar, use that bar instead
  let bar = null;
  if (isTabBar(element)) {
    bar = element;
  } else {
    let cur = element;
    for (let depth = 0; cur && depth < 3 && !bar; depth += 1) {
      let prev = cur.previousElementSibling;
      while (prev && !bar) {
        if (isTabBar(prev)) bar = prev;
        prev = prev.previousElementSibling;
      }
      cur = cur.parentElement;
    }
  }

  const cells = [];
  let variant = null;
  let target = element;

  if (bar) {
    const buttons = [...bar.children];
    const isContentTabs = buttons.some((b) => b.querySelector('h1, h2, h3, h4, h5, h6'));
    // Panels are the bar's following siblings (one per tab, hidden ones included)
    const panels = isContentTabs ? [] : null;
    if (isContentTabs) {
      let sib = bar.nextElementSibling;
      while (sib && panels.length < buttons.length) {
        panels.push(sib);
        sib = sib.nextElementSibling;
      }
    }
    buttons.forEach((btn, i) => {
      const label = clean(btn.textContent);
      const panel = panels && panels[i];
      cells.push([label, panel ? cellOf(collect(panel)) : '']);
    });
    if (isContentTabs) {
      const styleTabs = panels.some((p) => p.querySelector('.cards-container, .featuredProducts, .post-content, .article-detail'));
      variant = styleTabs ? 'alt' : 'alt-2';
      // Consume panels so they are not imported twice; replace the bar itself
      panels.forEach((p) => { if (p !== element && !p.contains(element)) p.remove(); });
      if (bar !== element) {
        // element is a panel (or part of one): replace the bar position with the block
        target = bar;
        panels.forEach((p) => { if (p.isConnected && (p === element || p.contains(element))) p.remove(); });
      }
    } else if (bar !== element) {
      target = bar;
    }
  } else if (['OL', 'UL'].includes(element.tagName) || (element.children.length === 1 && ['OL', 'UL'].includes(element.firstElementChild.tagName))) {
    const list = ['OL', 'UL'].includes(element.tagName) ? element : element.firstElementChild;
    const items = [...list.children].filter((li) => li.tagName === 'LI');
    let statLike = false;
    items.forEach((li) => {
      const headings = [...li.querySelectorAll('h1, h2, h3, h4, h5, h6')];
      const links = [...li.querySelectorAll('a[href]')];
      if (!headings.length && links.length === 1 && clean(links[0].textContent) === clean(li.textContent)) {
        // Category navigation item
        const a = document.createElement('a');
        a.href = links[0].getAttribute('href');
        a.textContent = clean(links[0].textContent);
        cells.push([a, '']);
        return;
      }
      const labelEl = headings.length > 1 ? headings[1] : headings[0];
      if (headings.length > 1) statLike = true;
      const label = labelEl ? clean(labelEl.textContent) : clean(li.textContent);
      const content = labelEl ? collect(li, [labelEl]) : [];
      cells.push([label, cellOf(content)]);
    });
    if (statLike) variant = 'alt-3';
  } else {
    // Generic: a heading-led container (section header with link, text + image, etc.)
    const labelEl = element.querySelector('h1, h2, h3, h4, h5, h6');
    const label = labelEl ? clean(labelEl.textContent) : '';
    const content = collect(element, labelEl ? [labelEl] : []);
    if (label || content.length) {
      if (label) cells.push([label, cellOf(content)]);
      else {
        const first = content.shift();
        cells.push([clean(first.textContent) || '', cellOf(content)]);
      }
    }
  }

  const name = variant ? `tabs-underline (${variant})` : 'tabs-underline';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  target.replaceWith(block);
  if (target !== element && element.isConnected) element.remove();
}
