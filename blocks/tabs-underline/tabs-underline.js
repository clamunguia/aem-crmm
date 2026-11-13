/*
 * Tabs Underline
 * Row of tab labels with an underline on the active one.
 * Each row: label | panel content.
 *   - Panel content may be a single /fragments/ link (loaded when first shown),
 *     which lets a panel hold other blocks.
 *   - When no row has panel content and the labels are links, the block
 *     renders as category navigation: the link matching the current page is active.
 *   - A single row "title | link" renders as a section heading with a button.
 * Options: alt, alt-2, alt-3.
 */
import { toClassName } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

let tabsId = 0;

const SVG_NS = 'http://www.w3.org/2000/svg';

function arrowIcon() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  ['M0.75 12H23.25', 'M12.75 22.5L23.25 12L12.75 1.5'].forEach((d) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.append(path);
  });
  return svg;
}

/* the cell holds exactly one link and nothing else */
function soleLink(cell) {
  if (!cell) return null;
  const links = [...cell.querySelectorAll('a[href]')];
  if (links.length !== 1 || cell.textContent.trim() !== links[0].textContent.trim()) return null;
  return links[0];
}

/* single row "title | link": a section heading with a call-to-action button */
function buildHeading(block, [labelCell, contentCell]) {
  const link = soleLink(contentCell);
  const title = document.createElement('h3');
  title.className = 'tabs-underline-title';
  const authored = labelCell.querySelector('h1, h2, h3, h4, h5, h6');
  if (authored?.id) title.id = authored.id;
  title.append(...(authored || labelCell).childNodes);
  title.querySelectorAll('p').forEach((p) => p.replaceWith(...p.childNodes));

  const cta = document.createElement('a');
  cta.className = 'button secondary tabs-underline-cta';
  cta.href = link.href;
  if (link.title) cta.title = link.title;
  const text = document.createElement('span');
  text.textContent = link.textContent.trim();
  cta.append(text, arrowIcon());

  block.classList.add('tabs-underline-heading');
  block.replaceChildren(title, cta);
}

function fragmentPath(cell) {
  const link = soleLink(cell);
  if (!link) return null;
  const { pathname } = new URL(link.href, window.location.href);
  return pathname.includes('/fragments/') ? pathname : null;
}

function buildNav(block, rows) {
  const nav = document.createElement('nav');
  nav.className = 'tabs-underline-list tabs-underline-nav';
  nav.setAttribute('aria-label', 'Categories');
  const here = window.location.pathname.replace(/\/$/, '');
  rows.forEach(([labelCell]) => {
    const link = labelCell.querySelector('a[href]');
    const a = document.createElement('a');
    a.className = 'tabs-underline-tab';
    a.href = link.href;
    a.textContent = labelCell.textContent.trim();
    const path = new URL(link.href, window.location.href).pathname.replace(/\/$/, '');
    if (path === here) a.setAttribute('aria-current', 'page');
    nav.append(a);
  });
  block.replaceChildren(nav);
}

export default function decorate(block) {
  tabsId += 1;
  const rows = [...block.children]
    .map((row) => [...row.children])
    .filter(([label]) => label && label.textContent.trim());
  if (!rows.length) return;

  const hasPanels = rows.some(([, content]) => content && (content.textContent.trim() || content.querySelector('picture')));
  if (!hasPanels && rows.every(([label]) => label.querySelector('a[href]'))) {
    buildNav(block, rows);
    return;
  }
  if (rows.length === 1 && soleLink(rows[0][1]) && !fragmentPath(rows[0][1])) {
    buildHeading(block, rows[0]);
    return;
  }

  const tablist = document.createElement('div');
  tablist.className = 'tabs-underline-list';
  tablist.setAttribute('role', 'tablist');
  const panels = [];
  const tabs = [];

  rows.forEach(([labelCell, contentCell], i) => {
    const id = `tabs-underline-${tabsId}-${toClassName(labelCell.textContent) || i}`;
    const panel = document.createElement('div');
    panel.className = 'tabs-underline-panel';
    panel.id = `${id}-panel`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `${id}-tab`);
    panel.tabIndex = 0;
    panel.hidden = i !== 0;
    const fragment = fragmentPath(contentCell);
    if (fragment) panel.dataset.fragment = fragment;
    else if (contentCell) panel.append(...contentCell.childNodes);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tabs-underline-tab';
    tab.id = `${id}-tab`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    tab.setAttribute('aria-selected', String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
    const label = document.createElement('span');
    label.className = 'tabs-underline-label';
    label.append(...labelCell.childNodes);
    label.querySelectorAll('p').forEach((p) => p.replaceWith(...p.childNodes));
    tab.append(label);
    tabs.push(tab);
    panels.push(panel);
    tablist.append(tab);
  });

  const show = async (index) => {
    tabs.forEach((t, i) => {
      t.setAttribute('aria-selected', String(i === index));
      t.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    const panel = panels[index];
    if (panel.dataset.fragment && !panel.dataset.loaded) {
      panel.dataset.loaded = 'true';
      const frag = await loadFragment(panel.dataset.fragment);
      if (frag) panel.append(...frag.childNodes);
    }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => show(i));
    tab.addEventListener('keydown', (e) => {
      const map = {
        ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1,
      };
      if (!(e.key in map)) return;
      e.preventDefault();
      const next = (map[e.key] + tabs.length) % tabs.length;
      tabs[next].focus();
      show(next);
    });
  });

  block.replaceChildren(tablist, ...panels);
  show(0);
}
