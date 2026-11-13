/*
 * Color Search
 * Colour-name search field.
 * Row 1 (optional): label / placeholder text.
 * Row 2 (optional): link to a search page; when present the form submits
 * there as ?q=<term>. Otherwise it filters colour items on the current page
 * (any element with data-color-name, e.g. gallery-mosaic or image-lightbox swatches)
 * and announces a `color-search` event with the term.
 */

let searchId = 0;

export default function decorate(block) {
  searchId += 1;
  const link = block.querySelector('a[href]');
  const action = link ? link.href : '';
  const labelText = [...block.querySelectorAll(':scope > div > div')]
    .map((cell) => (cell.querySelector('a') ? '' : cell.textContent.trim()))
    .find(Boolean) || 'Search colours';

  const form = document.createElement('form');
  form.className = 'color-search-form';
  form.setAttribute('role', 'search');
  const id = `color-search-${searchId}`;
  const label = document.createElement('label');
  label.className = 'color-search-label';
  label.htmlFor = id;
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = 'search';
  input.id = id;
  input.name = 'q';
  input.placeholder = labelText;
  input.autocomplete = 'off';
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'color-search-submit';
  submit.setAttribute('aria-label', 'Search');
  const status = document.createElement('p');
  status.className = 'color-search-status';
  status.setAttribute('role', 'status');
  form.append(label, input, submit, status);

  const filter = () => {
    const term = input.value.trim().toLowerCase();
    const items = [...document.querySelectorAll('[data-color-name]')];
    let shown = 0;
    items.forEach((item) => {
      const match = !term || item.dataset.colorName.toLowerCase().includes(term);
      item.hidden = !match;
      if (match) shown += 1;
    });
    status.textContent = term && items.length ? `${shown} colour${shown === 1 ? '' : 's'} found` : '';
    block.dispatchEvent(new CustomEvent('color-search', { bubbles: true, detail: { term } }));
  };

  if (action) {
    form.action = action;
    form.method = 'get';
  } else {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      filter();
    });
    input.addEventListener('input', filter);
  }

  block.replaceChildren(form);
}
