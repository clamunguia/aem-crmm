/*
 * Docs Browse Toggle
 * Radio toggle that switches between ways of browsing tech docs.
 * Each row is one option: label | content.
 * The content cell may hold content directly, or a single link to a
 * fragment (/fragments/...) that is loaded when the option is first chosen.
 * A row with only a label and a plain page link navigates to that page.
 */
import { loadFragment } from '../fragment/fragment.js';

let toggleId = 0;

function fragmentPath(cell) {
  const links = [...cell.querySelectorAll('a[href]')];
  if (links.length !== 1 || cell.textContent.trim() !== links[0].textContent.trim()) return null;
  const url = new URL(links[0].href, window.location.href);
  return url.pathname.includes('/fragments/') ? url.pathname : null;
}

export default function decorate(block) {
  toggleId += 1;
  const name = `docs-browse-toggle-${toggleId}`;
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'docs-browse-toggle-options';
  const legend = document.createElement('legend');
  legend.className = 'docs-browse-toggle-legend';
  legend.textContent = 'Browse by';
  fieldset.append(legend);
  const panels = document.createElement('div');
  panels.className = 'docs-browse-toggle-panels';

  const options = [];
  [...block.children].forEach((row, i) => {
    const [labelCell, contentCell] = [...row.children];
    const label = labelCell?.textContent.trim();
    if (!label) return;
    const id = `${name}-${i}`;
    const navLink = !contentCell?.textContent.trim() ? labelCell.querySelector('a[href]') : null;

    const wrap = document.createElement('label');
    wrap.className = 'docs-browse-toggle-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = id;
    const text = document.createElement('span');
    text.textContent = label;
    wrap.append(input, text);
    fieldset.append(wrap);

    let panel = null;
    let fragment = null;
    if (contentCell && contentCell.textContent.trim()) {
      panel = document.createElement('div');
      panel.className = 'docs-browse-toggle-panel';
      panel.id = id;
      panel.hidden = true;
      fragment = fragmentPath(contentCell);
      if (!fragment) panel.append(...contentCell.childNodes);
      panels.append(panel);
      input.setAttribute('aria-controls', id);
    }
    options.push({
      input, panel, fragment, navLink,
    });
  });

  const select = async (option) => {
    if (option.navLink) {
      window.location.href = option.navLink.href;
      return;
    }
    options.forEach((o) => { if (o.panel) o.panel.hidden = o !== option; });
    if (option.fragment && !option.panel.dataset.loaded) {
      option.panel.dataset.loaded = 'true';
      const frag = await loadFragment(option.fragment);
      if (frag) option.panel.append(...frag.childNodes);
    }
  };

  options.forEach((option) => {
    option.input.addEventListener('change', () => { if (option.input.checked) select(option); });
  });

  const current = options.find((o) => o.navLink
    && new URL(o.navLink.href).pathname === window.location.pathname)
    || options.find((o) => !o.navLink);
  if (current) {
    current.input.checked = true;
    if (!current.navLink) select(current);
  }

  block.replaceChildren(fieldset, ...(panels.children.length ? [panels] : []));
}
