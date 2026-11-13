/*
 * Dealer Locator
 * ZIP + radius search bar with an optional dealer list and map image.
 * Rows:
 *   1. intro: heading / text, and optionally a link to the dealer search page
 *      (the form submits there as ?zip=&radius=).
 *   2+. (optional) dealers: name + address + phone / links, one dealer per row.
 *       An image-only row is used as the map.
 * Without a search link the form filters the authored dealers by ZIP text.
 * Option: image (search bar over a background image).
 */
import { isMediaCell, optimizeImages } from '../../scripts/block-utils.js';

const RADII = [10, 25, 50, 100];
let locatorId = 0;

function buildForm(action) {
  locatorId += 1;
  const form = document.createElement('form');
  form.className = 'dealer-locator-form';
  form.setAttribute('role', 'search');
  const zipId = `dealer-locator-zip-${locatorId}`;
  const radiusId = `dealer-locator-radius-${locatorId}`;
  form.innerHTML = `
    <div class="dealer-locator-field">
      <label for="${zipId}">ZIP code</label>
      <input id="${zipId}" name="zip" type="text" inputmode="numeric" autocomplete="postal-code"
        pattern="[0-9]{5}" maxlength="5" required>
    </div>
    <div class="dealer-locator-field">
      <label for="${radiusId}">Radius</label>
      <select id="${radiusId}" name="radius">
        ${RADII.map((r) => `<option value="${r}"${r === 25 ? ' selected' : ''}>${r} miles</option>`).join('')}
      </select>
    </div>
    <button type="submit" class="dealer-locator-submit">Search</button>`;
  if (action) {
    form.action = action;
    form.method = 'get';
  }
  return form;
}

export default function decorate(block) {
  const rows = [...block.children];
  const intro = document.createElement('div');
  intro.className = 'dealer-locator-intro';
  const map = document.createElement('div');
  map.className = 'dealer-locator-map';
  const list = document.createElement('ul');
  list.className = 'dealer-locator-list';
  let action = '';

  rows.forEach((row, i) => {
    const cells = [...row.children];
    if (cells.every((c) => !c.textContent.trim() && !c.querySelector('picture'))) return;
    if (cells.every((c) => isMediaCell(c) || !c.textContent.trim())) {
      cells.forEach((c) => map.append(...c.childNodes));
      return;
    }
    if (i === 0) {
      cells.forEach((cell) => {
        const link = cell.querySelector('a[href]');
        if (link && !action && link.closest('p')?.textContent.trim() === link.textContent.trim()) {
          action = link.href;
          link.closest('p').remove();
        }
        cell.querySelectorAll('picture').forEach((pic) => map.append(pic));
        intro.append(...cell.childNodes);
      });
      return;
    }
    const li = document.createElement('li');
    li.className = 'dealer-locator-dealer';
    cells.forEach((cell) => li.append(...cell.childNodes));
    list.append(li);
  });

  const form = buildForm(action);
  const status = document.createElement('p');
  status.className = 'dealer-locator-status';
  status.setAttribute('role', 'status');
  if (!action) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const zip = form.elements.zip.value.trim();
      const dealers = [...list.children];
      let shown = 0;
      dealers.forEach((li) => {
        const match = !zip || li.textContent.includes(zip.slice(0, 3));
        li.hidden = !match;
        if (match) shown += 1;
      });
      status.textContent = dealers.length ? `${shown} dealer${shown === 1 ? '' : 's'} near ${zip}` : '';
    });
  }

  const search = document.createElement('div');
  search.className = 'dealer-locator-search';
  if (intro.textContent.trim()) search.append(intro);
  search.append(form, status);

  optimizeImages(map, [{ media: '(min-width: 900px)', width: '1600' }, { width: '750' }]);
  if (block.classList.contains('image') && map.children.length) {
    map.className = 'dealer-locator-background';
    search.prepend(map);
  }
  const children = [search];
  if (list.children.length || (map.children.length && !map.isConnected)) {
    const results = document.createElement('div');
    results.className = 'dealer-locator-results';
    if (list.children.length) results.append(list);
    if (map.children.length && !map.isConnected) results.append(map);
    children.push(results);
  }
  block.replaceChildren(...children);
}
