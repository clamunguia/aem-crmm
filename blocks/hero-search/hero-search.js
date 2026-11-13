/*
 * Hero Search
 * Split hero whose job is a contractor-finder search.
 * Cells: image | heading, text, optional list of project types, search link.
 *   - The last standalone link is the search page; its text labels the button.
 *     The form submits there as ?zip=<zip>[&projectType=<type>].
 *   - A bulleted list becomes the "project type" select.
 *   - Other links stay as secondary links below the form.
 * Option: image-green (ZIP lookup only).
 */
import { isMediaCell, optimizeImages } from '../../scripts/block-utils.js';

let searchId = 0;

function buildForm(action, label, types) {
  searchId += 1;
  const form = document.createElement('form');
  form.className = 'hero-search-form';
  form.setAttribute('role', 'search');
  form.method = 'get';
  form.action = action;
  if (types.length) {
    const id = `hero-search-type-${searchId}`;
    const field = document.createElement('div');
    field.className = 'hero-search-field';
    field.innerHTML = `<label for="${id}">Project type</label><select id="${id}" name="projectType"></select>`;
    const select = field.querySelector('select');
    types.forEach((t) => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      select.append(opt);
    });
    form.append(field);
  }
  const zipId = `hero-search-zip-${searchId}`;
  const zip = document.createElement('div');
  zip.className = 'hero-search-field';
  zip.innerHTML = `<label for="${zipId}">ZIP code</label>
    <input id="${zipId}" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}" maxlength="5" required>`;
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'hero-search-submit button';
  submit.textContent = label || 'Search';
  form.append(zip, submit);
  return form;
}

export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'hero-search-content';
  const media = document.createElement('div');
  media.className = 'hero-search-media';

  [...block.querySelectorAll(':scope > div > div')].forEach((cell) => {
    if (isMediaCell(cell)) {
      media.append(...cell.childNodes);
      return;
    }
    cell.querySelectorAll('picture').forEach((pic) => {
      const p = pic.closest('p');
      media.append(pic);
      if (p && !p.textContent.trim()) p.remove();
    });
    content.append(...cell.childNodes);
  });

  const list = content.querySelector('ul, ol');
  const types = list ? [...list.querySelectorAll('li')].map((li) => li.textContent.trim()).filter(Boolean) : [];
  if (list) list.remove();

  const standalone = [...content.querySelectorAll('a[href]')]
    .filter((a) => a.closest('p') && a.closest('p').textContent.trim() === a.textContent.trim());
  const searchLink = standalone[0];
  if (searchLink) {
    const form = buildForm(searchLink.href, searchLink.textContent.trim(), types);
    const p = searchLink.closest('p');
    p.replaceWith(form);
  }

  optimizeImages(media, [{ media: '(min-width: 900px)', width: '1400' }, { width: '750' }]);
  const img = media.querySelector('img');
  if (img) {
    img.loading = 'eager';
    img.fetchPriority = 'high';
  }
  const children = [content];
  if (media.children.length) children.push(media);
  block.replaceChildren(...children);
}
