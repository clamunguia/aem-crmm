/*
 * Product Specs
 * Spec accordion beside an install-resources sidebar on product pages.
 * Rows:
 *   - two cells: spec title | spec content (table, text, lists) → accordion item.
 *     The content cell may instead be a single /fragments/ link, loaded on first open.
 *   - one cell: a resource (icon, heading, text, link) → sidebar.
 */
import { loadFragment } from '../fragment/fragment.js';
import { optimizeImages } from '../../scripts/block-utils.js';

let specsId = 0;

const SVG_NS = 'http://www.w3.org/2000/svg';

function plusIcon() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('viewBox', '0 0 18 18');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  ['M1.5 9H16.5', 'M9 1.5V16.5'].forEach((d) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.append(path);
  });
  const icon = document.createElement('span');
  icon.className = 'product-specs-item-icon';
  icon.append(svg);
  return icon;
}

function fragmentLink(cell) {
  const links = [...cell.querySelectorAll('a[href]')];
  if (links.length !== 1 || cell.textContent.trim() !== links[0].textContent.trim()) return null;
  const { pathname } = new URL(links[0].href, window.location.href);
  return pathname.includes('/fragments/') ? pathname : null;
}

function decorateTables(root) {
  root.querySelectorAll('table').forEach((table) => {
    if (table.parentElement.classList.contains('product-specs-table')) return;
    const wrap = document.createElement('div');
    wrap.className = 'product-specs-table';
    table.replaceWith(wrap);
    wrap.append(table);
  });
}

function setExpanded(button, body, expanded) {
  button.setAttribute('aria-expanded', String(expanded));
  body.inert = !expanded;
}

export default function decorate(block) {
  specsId += 1;
  const specs = document.createElement('div');
  specs.className = 'product-specs-list';
  const resources = document.createElement('ul');
  resources.className = 'product-specs-resources';
  const fragments = new WeakMap();

  [...block.children].forEach((row, i) => {
    const cells = [...row.children].filter((c) => c.textContent.trim() || c.querySelector('picture, table'));
    if (!cells.length) return;
    if (cells.length >= 2) {
      const [titleCell, ...bodyCells] = cells;
      const id = `product-specs-${specsId}-${i}`;
      const item = document.createElement('div');
      item.className = 'product-specs-item';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'product-specs-item-label';
      button.id = `${id}-label`;
      button.setAttribute('aria-controls', `${id}-body`);
      const title = document.createElement('span');
      title.className = 'product-specs-item-title';
      title.textContent = titleCell.textContent.trim();
      button.append(title, plusIcon());

      const body = document.createElement('div');
      body.className = 'product-specs-item-body';
      body.id = `${id}-body`;
      body.setAttribute('role', 'region');
      body.setAttribute('aria-labelledby', button.id);
      const content = document.createElement('div');
      content.className = 'product-specs-item-content';
      body.append(content);

      const fragment = bodyCells.length === 1 ? fragmentLink(bodyCells[0]) : null;
      if (fragment) {
        fragments.set(button, { path: fragment, content });
      } else {
        bodyCells.forEach((cell) => content.append(...cell.childNodes));
        decorateTables(content);
      }
      setExpanded(button, body, false);
      item.append(button, body);
      specs.append(item);
      return;
    }
    const li = document.createElement('li');
    li.className = 'product-specs-resource';
    li.append(...cells[0].childNodes);
    resources.append(li);
  });

  specs.addEventListener('click', async (e) => {
    const button = e.target.closest('.product-specs-item-label');
    if (!button) return;
    const body = button.nextElementSibling;
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    setExpanded(button, body, expanded);
    const pending = fragments.get(button);
    if (expanded && pending) {
      fragments.delete(button);
      const frag = await loadFragment(pending.path);
      if (frag) {
        pending.content.append(...frag.childNodes);
        decorateTables(pending.content);
      }
    }
  });

  optimizeImages(resources, [{ width: '120' }]);
  const children = [];
  if (specs.children.length) children.push(specs);
  if (resources.children.length) {
    const aside = document.createElement('aside');
    aside.className = 'product-specs-sidebar';
    aside.setAttribute('aria-label', 'Resources');
    aside.append(resources);
    children.push(aside);
  }
  block.replaceChildren(...children);
}
