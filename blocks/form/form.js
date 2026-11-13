/*
 * Form
 * Lead-capture / contact form.
 * Field rows: label | type | options.
 *   type: text, email, tel, number, date, textarea, select, radio, checkbox,
 *         hidden, submit, confirmation (defaults to text when the cell is empty).
 *   options: comma-separated choices for select/radio/checkbox, the value for
 *            hidden, and the word "required" (alone or as the last choice).
 *   A "submit" row may hold a link: the endpoint the form POSTs JSON to.
 *   A "confirmation" row's label cell is shown after a successful submit.
 * Single-cell rows are content: before the first field they form the intro
 * (heading, text); after the last field they form the sidebar/notes
 * (the "links-sidebar" option lays them out beside the form).
 * Options: links-sidebar, alt.
 */
import { toClassName } from '../../scripts/aem.js';

const TYPES = ['text', 'email', 'tel', 'number', 'date', 'textarea', 'select', 'radio', 'checkbox', 'hidden', 'submit', 'confirmation', 'url'];
let formId = 0;

function parseOptions(text) {
  const parts = (text || '').split(',').map((p) => p.trim()).filter(Boolean);
  const required = parts.some((p) => p.toLowerCase() === 'required');
  return { required, choices: parts.filter((p) => p.toLowerCase() !== 'required') };
}

function buildField(label, type, optionsText) {
  formId += 1;
  const id = `form-field-${formId}`;
  const name = toClassName(label) || id;
  const { required, choices } = parseOptions(optionsText);
  const wrap = document.createElement('div');
  wrap.className = `form-field form-field-${type}`;

  if (type === 'hidden') {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = choices.join(',');
    wrap.append(input);
    return wrap;
  }

  if (type === 'radio' || type === 'checkbox') {
    const group = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = label;
    group.append(legend);
    (choices.length ? choices : [label]).forEach((choice, i) => {
      const opt = document.createElement('label');
      const input = document.createElement('input');
      input.type = type;
      input.name = name;
      input.value = choice;
      input.id = `${id}-${i}`;
      if (required && type === 'radio' && i === 0) input.required = true;
      if (required && type === 'checkbox' && choices.length <= 1) input.required = true;
      opt.append(input, document.createTextNode(` ${choice}`));
      group.append(opt);
    });
    wrap.append(group);
    return wrap;
  }

  const labelEl = document.createElement('label');
  labelEl.htmlFor = id;
  labelEl.textContent = label;
  let control;
  if (type === 'textarea') {
    control = document.createElement('textarea');
    control.rows = 4;
  } else if (type === 'select') {
    control = document.createElement('select');
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select…';
    control.append(placeholder, ...choices.map((c) => {
      const o = document.createElement('option');
      o.value = c;
      o.textContent = c;
      return o;
    }));
  } else {
    control = document.createElement('input');
    control.type = type;
    if (type === 'email') control.autocomplete = 'email';
    if (type === 'tel') control.autocomplete = 'tel';
    if (choices.length && type !== 'number') [control.placeholder] = choices;
  }
  control.id = id;
  control.name = name;
  if (required) {
    control.required = true;
    labelEl.classList.add('form-required');
  }
  wrap.append(labelEl, control);
  return wrap;
}

export default function decorate(block) {
  const intro = document.createElement('div');
  intro.className = 'form-intro';
  const aside = document.createElement('div');
  aside.className = 'form-aside';
  const form = document.createElement('form');
  form.className = 'form-form';
  const confirmation = document.createElement('div');
  confirmation.className = 'form-confirmation';
  confirmation.hidden = true;
  confirmation.setAttribute('role', 'status');
  confirmation.tabIndex = -1;
  let action = '';
  let submitLabel = 'Submit';
  let seenField = false;

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const typeText = cells[1]?.textContent.trim().toLowerCase();
    const plainLabel = cells[0]?.textContent.trim()
      && !cells[0].querySelector('h1, h2, h3, h4, h5, h6, picture, ul, ol');
    const isField = cells.length >= 2 && (TYPES.includes(typeText) || (!typeText && plainLabel));
    if (!isField) {
      const target = seenField ? aside : intro;
      cells.forEach((cell) => target.append(...cell.childNodes));
      return;
    }
    seenField = true;
    const label = cells[0].textContent.trim();
    const type = typeText || 'text';
    if (type === 'submit') {
      submitLabel = label || submitLabel;
      const link = row.querySelector('a[href]');
      if (link) action = link.href;
      else if (cells[2]?.textContent.trim()) action = cells[2].textContent.trim();
      return;
    }
    if (type === 'confirmation') {
      confirmation.append(...cells[0].childNodes);
      return;
    }
    form.append(buildField(label, type, cells[2]?.textContent));
  });

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'form-submit button';
  submit.textContent = submitLabel;
  const error = document.createElement('p');
  error.className = 'form-error';
  error.setAttribute('role', 'alert');
  form.append(submit, error);
  if (!confirmation.textContent.trim()) confirmation.textContent = 'Thank you. Your submission has been received.';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    error.textContent = '';
    const data = {};
    new FormData(form).forEach((value, key) => {
      data[key] = data[key] ? `${data[key]}, ${value}` : value;
    });
    submit.disabled = true;
    try {
      if (action) {
        const resp = await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      }
      form.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
    } catch {
      error.textContent = 'Something went wrong. Please try again.';
    } finally {
      submit.disabled = false;
    }
  });

  const main = document.createElement('div');
  main.className = 'form-main';
  if (intro.textContent.trim()) main.append(intro);
  main.append(form, confirmation);
  const children = [main];
  if (aside.textContent.trim() || aside.querySelector('picture')) children.push(aside);
  block.replaceChildren(...children);
}
