/*
 * Article List
 * Lists the published pages of a folder as article cards, a page at a time, with pagination.
 * The list comes from the site index (/query-index.json), so it updates itself whenever an
 * article is published or unpublished.
 *
 * Rows (key | value), all optional:
 *   folder    folder to list, e.g. /blog/explore-exterior-design (default: the current page)
 *   per-page  cards per page (default 15)
 *   index     index to read (default /query-index.json)
 *   exclude   comma-separated paths to leave out (e.g. the featured posts shown above)
 *
 * Pages are sorted newest first (by when they were last published). The page number is kept
 * in the address (?page=2), so a page of results can be linked to and works with Back/Forward.
 */
import {
  buildBlock, createOptimizedPicture, decorateBlock, loadBlock, readBlockConfig,
} from '../../scripts/aem.js';

const strip = (p) => p.replace(/\/+$/, '');

async function fetchIndex(url) {
  const rows = [];
  let offset = 0;
  // the index is delivered in chunks; read until a chunk comes back short
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(`${url}?offset=${offset}&limit=500`);
    if (!res.ok) break;
    // eslint-disable-next-line no-await-in-loop
    const json = await res.json();
    rows.push(...(json.data || []));
    offset += json.data?.length || 0;
    if (!json.data?.length || offset >= json.total) break;
  }
  return rows;
}

/** Card title: the page title without the site suffix (" | James Hardie", " | Hardie"). */
const cardTitle = (title) => title.replace(/\s*\|\s*(James\s+)?Hardie\s*$/i, '').trim();

function cardRow(item) {
  const title = cardTitle(item.title || '');
  const picture = item.image && !item.image.includes('default-meta-image')
    ? createOptimizedPicture(item.image, title, false, [{ width: '750' }])
    : '';
  const h3 = document.createElement('h3');
  const a = document.createElement('a');
  a.href = item.path;
  a.textContent = title;
  h3.append(a);
  return [picture, h3];
}

function pageLink(label, page, current, total, url) {
  const disabled = page < 1 || page > total;
  const el = document.createElement(disabled ? 'span' : 'a');
  el.className = 'article-list-page';
  el.textContent = label;
  if (disabled) {
    el.setAttribute('aria-disabled', 'true');
  } else {
    const u = new URL(url);
    u.searchParams.set('page', page);
    el.href = `${u.pathname}${u.search}`;
    el.dataset.page = page;
    if (page === current && /^Page/.test(label)) el.setAttribute('aria-current', 'page');
  }
  return el;
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const folder = strip(config.folder || window.location.pathname);
  const perPage = Math.max(1, parseInt(config['per-page'], 10) || 15);
  const exclude = new Set((config.exclude || '').split(',').map((p) => strip(p.trim())).filter(Boolean));
  block.textContent = '';

  const all = (await fetchIndex(config.index || '/query-index.json'))
    .filter((r) => r.path && strip(r.path).startsWith(`${folder}/`) && !exclude.has(strip(r.path)))
    .filter((r) => !/noindex/i.test(r.robots || ''))
    .sort((a, b) => (Number(b.lastModified) || 0) - (Number(a.lastModified) || 0));

  if (!all.length) {
    block.closest('.article-list-wrapper')?.remove();
    return;
  }

  const total = Math.ceil(all.length / perPage);
  const grid = document.createElement('div');
  const nav = document.createElement('nav');
  nav.className = 'article-list-pagination';
  nav.setAttribute('aria-label', 'Pagination');
  block.append(grid, nav);

  const render = async (requested) => {
    const page = Math.min(Math.max(1, requested), total);
    const items = all.slice((page - 1) * perPage, page * perPage);
    const cards = buildBlock('cards-article', items.map(cardRow));
    cards.classList.add('light');
    grid.replaceChildren(cards);
    decorateBlock(cards);
    await loadBlock(cards);

    nav.replaceChildren();
    if (total > 1) {
      const url = window.location.href;
      nav.append(pageLink('Previous page', page - 1, page, total, url));
      for (let i = 1; i <= total; i += 1) nav.append(pageLink(`Page ${i}`, i, page, total, url));
      nav.append(pageLink('Next page', page + 1, page, total, url));
    }
    return page;
  };

  const fromUrl = () => parseInt(new URLSearchParams(window.location.search).get('page'), 10) || 1;
  await render(fromUrl());

  nav.addEventListener('click', async (e) => {
    const link = e.target.closest('a.article-list-page');
    if (!link) return;
    e.preventDefault();
    const page = await render(Number(link.dataset.page));
    window.history.pushState({ page }, '', link.getAttribute('href'));
    block.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  window.addEventListener('popstate', () => render(fromUrl()));
}
