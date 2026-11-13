/*
 * Location Indicator
 * Shows the visitor's ZIP code with a "change location" action.
 * Row 1: label text (e.g. "Showing results for") | optional default ZIP.
 * Row 2 (optional): change-action label (defaults to "Change").
 * The ZIP is stored in localStorage (key `location-zip`) and shared with other
 * location-aware blocks via the `location-change` event on document.
 */

const STORAGE_KEY = 'location-zip';
let indicatorId = 0;

function readZip(fallback) {
  try {
    return localStorage.getItem(STORAGE_KEY) || fallback;
  } catch {
    return fallback;
  }
}

export default function decorate(block) {
  indicatorId += 1;
  const rows = [...block.children].map((row) => [...row.children].map((c) => c.textContent.trim()));
  const [labelText = 'Your location', defaultZip = ''] = rows[0] || [];
  const changeText = rows[1]?.[0] || 'Change';

  const display = document.createElement('div');
  display.className = 'location-indicator-display';
  const label = document.createElement('span');
  label.className = 'location-indicator-label';
  label.textContent = labelText;
  const value = document.createElement('strong');
  value.className = 'location-indicator-zip';
  const change = document.createElement('button');
  change.type = 'button';
  change.className = 'location-indicator-change';
  change.textContent = changeText;
  change.setAttribute('aria-expanded', 'false');
  display.append(label, value, change);

  const id = `location-indicator-${indicatorId}`;
  const form = document.createElement('form');
  form.className = 'location-indicator-form';
  form.hidden = true;
  form.id = `${id}-form`;
  change.setAttribute('aria-controls', form.id);
  form.innerHTML = `<label for="${id}-input">ZIP code</label>
    <input id="${id}-input" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}" maxlength="5" required>
    <button type="submit" class="location-indicator-apply">Apply</button>
    <button type="button" class="location-indicator-cancel">Cancel</button>`;
  const input = form.querySelector('input');

  const render = (zip) => {
    value.textContent = zip || 'Not set';
    block.classList.toggle('location-indicator-unset', !zip);
  };
  const toggle = (open) => {
    form.hidden = !open;
    display.hidden = open;
    change.setAttribute('aria-expanded', String(open));
    if (open) {
      input.value = readZip(defaultZip);
      input.focus();
    } else {
      change.focus();
    }
  };

  change.addEventListener('click', () => toggle(true));
  form.querySelector('.location-indicator-cancel').addEventListener('click', () => toggle(false));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const zip = input.value.trim();
    try {
      localStorage.setItem(STORAGE_KEY, zip);
    } catch { /* storage unavailable */ }
    render(zip);
    toggle(false);
    document.dispatchEvent(new CustomEvent('location-change', { detail: { zip } }));
  });
  document.addEventListener('location-change', (e) => render(e.detail?.zip));

  render(readZip(defaultZip));
  block.replaceChildren(display, form);
}
