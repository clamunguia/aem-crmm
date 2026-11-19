/*
 * Search Results
 * Filterable results with sidebar filters (keyword, sort, categories) and result cards.
 * Rows:
 *   - Config rows (first cell is a key): source | link to a JSON index
 *     (e.g. /query-index.json); limit | page size (default 12);
 *     filter-title | sidebar heading for categories.
 *   - Single-cell rows before the results: intro (heading, text, "view all" link).
 *   - Result rows (static items): image | title link + text | categories (comma-separated) | date.
 *   - category | path prefix | label: items without a category of their own get the label of
 *     the first rule whose prefix starts their path (e.g. /blog/ | Blog); category-default |
 *     label for the rest. Rules are checked in order.
 * JSON items use: path, title, description, image, category or tags, date or lastModified.
 * A paged index (total > data.length, like query-index.json) is read in full. Pages marked
 * robots noindex are left out.
 * The keyword field reads/writes ?q= in the URL; every word must match (title, description or
 * path), and title matches rank first. ?tab=<category> preselects that category.
 * Options: alt (tech docs), light (products), alt-2 (colour collections).
 */
import { createOptimizedPicture } from '../../scripts/aem.js';

const CONFIG_KEYS = ['source', 'limit', 'filter-title', 'category-default'];
let resultsId = 0;

function toList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch { /* plain text */ }
  return String(value).split(',').map((v) => v.trim()).filter(Boolean);
}

function toTime(value) {
  if (!value) return 0;
  const n = Number(value);
  if (!Number.isNaN(n)) return n < 1e12 ? n * 1000 : n;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

function itemFromRow(cells) {
  const [imageCell, bodyCell, catCell, dateCell] = cells;
  const link = bodyCell?.querySelector('a[href]') || imageCell?.querySelector('a[href]');
  const heading = bodyCell?.querySelector('h1, h2, h3, h4, h5, h6');
  return {
    title: (heading || link || bodyCell)?.textContent.trim() || '',
    path: link?.href || '',
    description: [...(bodyCell?.querySelectorAll('p') || [])]
      .filter((p) => !p.querySelector('a') || p.textContent.trim() !== p.querySelector('a').textContent.trim())
      .map((p) => p.textContent.trim()).join(' '),
    picture: imageCell?.querySelector('picture') || null,
    categories: toList(catCell?.textContent.trim()),
    date: toTime(dateCell?.textContent.trim()),
  };
}

/** All entries of a JSON index, following offset/limit pages when the index has more. */
async function loadIndex(source) {
  const url = new URL(source, window.location.href);
  const entries = [];
  for (let offset = 0, guard = 0; guard < 20; guard += 1) {
    url.searchParams.set('offset', offset);
    // eslint-disable-next-line no-await-in-loop
    const resp = await fetch(url);
    if (!resp.ok) break;
    // eslint-disable-next-line no-await-in-loop
    const json = await resp.json();
    const data = Array.isArray(json) ? json : json.data || [];
    entries.push(...data);
    offset += data.length;
    if (Array.isArray(json) || !data.length || !json.total || offset >= json.total) break;
  }
  return entries;
}

function itemFromJson(entry) {
  return {
    title: (entry.title || entry.navTitle || entry.path || '').replace(/\s*\|\s*(James )?Hardie\s*$/i, ''),
    path: entry.path || entry.url || '',
    description: entry.description || '',
    image: entry.image || '',
    categories: toList(entry.category || entry.categories || entry.tags),
    date: toTime(entry.date || entry.publicationDate || entry.lastModified),
    noindex: /noindex/i.test(entry.robots || ''),
  };
}

function renderCard(item) {
  const li = document.createElement('li');
  li.className = 'search-results-card';
  const media = document.createElement('div');
  media.className = 'search-results-card-image';
  if (item.picture) {
    media.append(item.picture.cloneNode(true));
  } else if (item.image) {
    const url = new URL(item.image, window.location.href);
    const sameOrigin = url.origin === window.location.origin && !/\.svg$/i.test(url.pathname);
    if (sameOrigin) {
      media.append(createOptimizedPicture(item.image, item.title, false, [{ width: '500' }]));
    } else {
      const img = document.createElement('img');
      img.src = url.href;
      img.alt = item.title;
      img.loading = 'lazy';
      media.append(img);
    }
  }
  if (media.children.length) li.append(media);
  const body = document.createElement('div');
  body.className = 'search-results-card-body';
  const title = document.createElement('h3');
  title.className = 'search-results-card-title';
  if (item.path) {
    const a = document.createElement('a');
    a.href = item.path;
    a.textContent = item.title;
    title.append(a);
  } else {
    title.textContent = item.title;
  }
  body.append(title);
  if (item.description) {
    const p = document.createElement('p');
    p.textContent = item.description;
    body.append(p);
  }
  li.append(body);
  return li;
}

export default async function decorate(block) {
  resultsId += 1;
  const id = `search-results-${resultsId}`;
  const config = { limit: 12, 'filter-title': 'Filter by Category' };
  const intro = document.createElement('div');
  intro.className = 'search-results-intro';
  let items = [];
  const categoryRules = [];

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const key = cells[0]?.textContent.trim().toLowerCase();
    if (cells.length >= 3 && key === 'category') {
      categoryRules.push({
        prefix: cells[1].textContent.trim(),
        label: cells[2].textContent.trim(),
      });
      return;
    }
    if (cells.length >= 2 && CONFIG_KEYS.includes(key)) {
      const link = cells[1].querySelector('a[href]');
      config[key] = link ? link.href : cells[1].textContent.trim();
      return;
    }
    const filled = cells.filter((c) => c.textContent.trim() || c.querySelector('picture'));
    if (filled.length === 1 && !filled[0].querySelector('picture') && !items.length) {
      intro.append(...filled[0].childNodes);
      return;
    }
    if (filled.length) items.push(itemFromRow(cells));
  });

  if (config.source) {
    try {
      const data = await loadIndex(config.source);
      items = items.concat(data.map(itemFromJson).filter((i) => !i.noindex));
    } catch { /* keep static items */ }
  }

  // categories by path for items that have none of their own
  if (categoryRules.length || config['category-default']) {
    items.forEach((item) => {
      if (item.categories.length) return;
      const path = item.path ? new URL(item.path, window.location.href).pathname : '';
      const rule = categoryRules.find((r) => path.startsWith(r.prefix));
      const label = rule ? rule.label : config['category-default'];
      if (label) item.categories = [label];
    });
  }

  const pageSize = parseInt(config.limit, 10) || 12;
  // categories in rule order (as authored), then any others alphabetically
  const ruled = [...new Set([...categoryRules.map((r) => r.label), config['category-default']].filter(Boolean))];
  const found = new Set(items.flatMap((i) => i.categories));
  const others = [...found].filter((c) => !ruled.includes(c)).sort();
  const categories = [...ruled.filter((c) => found.has(c)), ...others];
  const params = new URLSearchParams(window.location.search);

  // sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'search-results-filters';
  sidebar.setAttribute('aria-label', 'Filters');
  sidebar.innerHTML = `
    <p class="search-results-filters-title">Filter by</p>
    <p class="search-results-active" aria-live="polite"></p>
    <div class="search-results-field">
      <label for="${id}-q">Search</label>
      <input id="${id}-q" type="search" name="q" autocomplete="off">
    </div>
    <div class="search-results-field">
      <label for="${id}-sort">Sort</label>
      <select id="${id}-sort">
        <option value="relevance-desc">Relevance</option>
        <option value="date-desc">Date (desc)</option>
        <option value="date-asc">Date (asc)</option>
        <option value="title-asc">Title (A–Z)</option>
      </select>
    </div>`;
  const keyword = sidebar.querySelector('input');
  keyword.value = params.get('q') || '';
  const sort = sidebar.querySelector('select');
  const active = sidebar.querySelector('.search-results-active');
  if (categories.length) {
    const group = document.createElement('details');
    group.className = 'search-results-category';
    group.open = true;
    group.innerHTML = `<summary>${config['filter-title']}</summary><fieldset><legend class="search-results-sr">${config['filter-title']}</legend></fieldset>`;
    const fieldset = group.querySelector('fieldset');
    const tab = (params.get('tab') || '').trim().toLowerCase();
    categories.forEach((cat, i) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = cat;
      input.id = `${id}-cat-${i}`;
      if (tab && cat.toLowerCase() === tab) input.checked = true;
      const n = items.filter((item) => item.categories.includes(cat)).length;
      label.append(input, document.createTextNode(` ${cat} (${n})`));
      fieldset.append(label);
    });
    sidebar.append(group);
  }

  // results
  const results = document.createElement('div');
  results.className = 'search-results-main';
  const count = document.createElement('p');
  count.className = 'search-results-count';
  count.setAttribute('aria-live', 'polite');
  const list = document.createElement('ul');
  list.className = 'search-results-list';
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'search-results-more button';
  more.textContent = 'Load more';
  if (intro.textContent.trim()) results.append(intro);
  results.append(count, list, more);

  let shown = pageSize;
  // every word must match; a word in the title counts more than one in the description or path
  const score = (item, words) => {
    if (!words.length) return 0;
    const title = item.title.toLowerCase();
    const rest = `${item.description} ${item.path}`.toLowerCase();
    let total = 0;
    for (let w = 0; w < words.length; w += 1) {
      if (title.includes(words[w])) total += 3;
      else if (rest.includes(words[w])) total += 1;
      else return -1;
    }
    return total;
  };

  const render = () => {
    const term = keyword.value.trim().toLowerCase();
    const words = term.split(/\s+/).filter(Boolean);
    const checked = [...sidebar.querySelectorAll('input[type="checkbox"]:checked')].map((c) => c.value);
    const scored = items.map((item) => ({ item, s: score(item, words) }))
      .filter(({ item, s }) => s >= 0
        && (!checked.length || item.categories.some((c) => checked.includes(c))));
    const [field, dir] = sort.value.split('-');
    scored.sort((a, b) => {
      let cmp;
      if (field === 'title') cmp = a.item.title.localeCompare(b.item.title);
      else if (field === 'relevance') cmp = (a.s - b.s) || (a.item.date - b.item.date);
      else cmp = a.item.date - b.item.date;
      return dir === 'asc' ? cmp : -cmp;
    });
    const filtered = scored.map(({ item }) => item);
    const activeCount = checked.length + (term ? 1 : 0);
    active.textContent = `${activeCount} filter${activeCount === 1 ? '' : 's'} activated`;
    count.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'}`;
    list.replaceChildren(...filtered.slice(0, shown).map(renderCard));
    more.hidden = filtered.length <= shown;
  };

  const reset = () => {
    shown = pageSize;
    render();
  };
  keyword.addEventListener('input', () => {
    const url = new URL(window.location.href);
    if (keyword.value.trim()) url.searchParams.set('q', keyword.value.trim());
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
    reset();
  });
  sort.addEventListener('change', reset);
  sidebar.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') reset();
  });
  more.addEventListener('click', () => {
    shown += pageSize;
    render();
  });

  block.replaceChildren(sidebar, results);
  render();
}
