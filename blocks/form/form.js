/*
 * Form
 * Lead-capture / contact form. The fields come from either:
 *  - a form definition sheet: the block holds only a link to a .json sheet (as made by the forms
 *    importer). Columns: Name, Type, Label, Placeholder, Mandatory, Options, OptionNames, Value,
 *    Description. Options/OptionNames are comma lists (values / visible names). A "plain-text"
 *    row shows its Label as text ([label](url) links allowed, blank line = new paragraph); the
 *    "submit" row gives the button label and, in Value, the endpoint the form POSTs JSON to.
 *  - field rows in the block: label | type | options.
 *    type: text, email, tel, number, date, textarea, select, radio, checkbox,
 *          hidden, submit, confirmation (defaults to text when the cell is empty).
 *    options: comma-separated choices for select/radio/checkbox, the value for
 *             hidden, and the word "required" (alone or as the last choice).
 *    A "submit" row may hold a link: the endpoint the form POSTs JSON to.
 *    A "confirmation" row's label cell is shown after a successful submit.
 *    Single-cell rows are content: before the first field they form the intro
 *    (heading, text); after the last field they form the sidebar/notes
 *    (the "links-sidebar" option lays them out beside the form).
 * Without an endpoint nothing is sent: the form says so instead of confirming.
 * Options: links-sidebar, alt.
 */
import { toClassName } from '../../scripts/aem.js';

const TYPES = ['text', 'email', 'tel', 'number', 'date', 'textarea', 'select', 'radio', 'checkbox', 'hidden', 'submit', 'confirmation', 'url', 'plain-text'];
let formId = 0;

const list = (text) => (text || '').split(',').map((p) => p.trim()).filter(Boolean);
const truthy = (text) => ['true', 'x', 'yes', 'required', '1'].includes(String(text || '').trim().toLowerCase());

/** Field spec from a block row's options cell: comma choices plus the word "required". */
function specFromRow(label, type, optionsText) {
  const parts = list(optionsText);
  const required = parts.some((p) => p.toLowerCase() === 'required');
  const values = parts.filter((p) => p.toLowerCase() !== 'required');
  return {
    name: toClassName(label),
    label,
    type,
    required,
    choices: values.map((v) => ({ value: v, label: v })),
    placeholder: type === 'number' ? '' : values[0],
    value: type === 'hidden' ? values.join(',') : '',
  };
}

/** Field spec from a form definition sheet row. */
function specFromSheet(row) {
  const values = list(row.Options);
  const names = list(row.OptionNames);
  return {
    name: row.Name || toClassName(row.Label),
    label: row.Label || '',
    type: (row.Type || 'text').toLowerCase(),
    required: truthy(row.Mandatory),
    choices: values.map((v, i) => ({ value: v, label: names[i] || v })),
    placeholder: row.Placeholder || '',
    value: row.Value || '',
    description: row.Description || '',
  };
}

/** Paragraphs from plain text with [label](url) links; blank lines separate paragraphs. */
function textBlock(text) {
  const wrap = document.createElement('div');
  wrap.className = 'form-text';
  String(text).split(/\n\s*\n/).forEach((para) => {
    const p = document.createElement('p');
    let rest = para.trim();
    const link = /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]*)\)/;
    let m = rest.match(link);
    while (m) {
      p.append(document.createTextNode(rest.slice(0, m.index)));
      const a = document.createElement('a');
      const [, linkText, href] = m;
      a.href = href;
      a.textContent = linkText;
      p.append(a);
      rest = rest.slice(m.index + m[0].length);
      m = rest.match(link);
    }
    p.append(document.createTextNode(rest));
    wrap.append(p);
  });
  return wrap;
}

function buildField(spec) {
  formId += 1;
  const id = `form-field-${formId}`;
  const {
    type, label, required, choices, placeholder, value, description,
  } = spec;
  const name = spec.name || id;
  const wrap = document.createElement('div');
  wrap.className = `form-field form-field-${type}`;

  if (type === 'plain-text') {
    wrap.append(textBlock(label));
    return wrap;
  }

  if (type === 'hidden') {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    wrap.append(input);
    return wrap;
  }

  if (type === 'radio' || type === 'checkbox') {
    const group = document.createElement('fieldset');
    const options = choices.length ? choices : [{ value: value || 'on', label }];
    // a single checkbox is its own label; a group gets a legend
    if (choices.length) {
      const legend = document.createElement('legend');
      legend.textContent = label;
      if (required) legend.classList.add('form-required');
      group.append(legend);
    }
    options.forEach((choice, i) => {
      const opt = document.createElement('label');
      const input = document.createElement('input');
      input.type = type;
      input.name = name;
      input.value = choice.value;
      input.id = `${id}-${i}`;
      if (type === 'radio' && value && choice.value === value) input.checked = true;
      if (required && type === 'radio' && i === 0) input.required = true;
      if (required && type === 'checkbox' && options.length <= 1) input.required = true;
      opt.append(input, document.createTextNode(` ${choice.label}`));
      if (required && !choices.length) opt.classList.add('form-required');
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
    const first = document.createElement('option');
    first.value = '';
    first.textContent = placeholder || 'Select…';
    control.append(first, ...choices.map((c) => {
      const o = document.createElement('option');
      o.value = c.value;
      o.textContent = c.label;
      if (value && c.value === value) o.selected = true;
      return o;
    }));
  } else {
    control = document.createElement('input');
    control.type = type;
    if (type === 'email') control.autocomplete = 'email';
    if (type === 'tel') control.autocomplete = 'tel';
    if (placeholder) control.placeholder = placeholder;
    if (value) control.value = value;
  }
  control.id = id;
  control.name = name;
  if (required) {
    control.required = true;
    labelEl.classList.add('form-required');
  }
  wrap.append(labelEl, control);
  if (description) {
    const help = document.createElement('p');
    help.className = 'form-description';
    help.textContent = description;
    wrap.append(help);
  }
  return wrap;
}

/** The form definition sheet the block links to, when that link is all the block holds. */
function definitionLink(block) {
  const link = block.querySelector('a[href]');
  if (!link || block.querySelectorAll('a[href]').length !== 1) return null;
  const url = new URL(link.getAttribute('href'), window.location.href);
  if (!url.pathname.endsWith('.json')) return null;
  return block.textContent.trim() === link.textContent.trim() ? url : null;
}

async function loadDefinition(url) {
  const resp = await fetch(url.pathname + url.search);
  if (!resp.ok) throw new Error(`form definition: HTTP ${resp.status}`);
  const json = await resp.json();
  return json.data || json[json[':names']?.[0]]?.data || [];
}

export default async function decorate(block) {
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

  const definition = definitionLink(block);
  if (definition) {
    let rows = [];
    try {
      rows = await loadDefinition(definition);
    } catch {
      rows = [];
    }
    rows.map(specFromSheet).forEach((spec) => {
      if (spec.type === 'submit') {
        submitLabel = spec.label || submitLabel;
        if (/^(https?:\/\/|\/)/.test(spec.value)) action = spec.value;
        return;
      }
      if (spec.type === 'confirmation') {
        confirmation.textContent = spec.label;
        return;
      }
      form.append(buildField(spec));
    });
  } else {
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
      form.append(buildField(specFromRow(label, type, cells[2]?.textContent)));
    });
  }

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
    if (!action) {
      // no endpoint configured: say so rather than confirm a submission that went nowhere
      error.textContent = 'This form is not connected yet, so nothing was sent.';
      return;
    }
    const data = {};
    new FormData(form).forEach((value, key) => {
      data[key] = data[key] ? `${data[key]}, ${value}` : value;
    });
    submit.disabled = true;
    try {
      const resp = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
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
