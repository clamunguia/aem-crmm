#!/usr/bin/env node
/*
 * Point links to the source site at our own pages, once those pages are migrated.
 * A link such as https://www.jameshardie.com/product-catalog/ becomes /product-catalog when
 * content/product-catalog.plain.html exists in the workspace. Links to pages that are not
 * migrated yet are left as they are; run this again after each batch.
 * Site-relative links copied from the source (/blog/siding-durability/) get the same EDS form
 * (/blog/siding-durability): EDS answers 404 for a page path with a trailing slash.
 *
 *   node tools/importer/da-sync/relink.mjs <page|url>... [--urls <file>] [--all] [--dry-run]
 *     [--ignore-live]
 *
 * --all          every site page in the workspace (not the library)
 * Live safety:   a page that is already published only gets links to pages that are published
 *                too, so publishing it never creates a 404. Its other links are reported as
 *                "waiting" and get converted on a later run, once their target is published.
 *                --ignore-live skips this check (no network calls).
 * Anchors:       a link to #section whose target has no element with that id is converted but
 *                reported, because the importer renames ids from heading text.
 * Settings: SOURCE_HOSTS, comma-separated, default "www.jameshardie.com,jameshardie.com".
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  CONTENT_DIR, ADMIN, ORG, SITE, REF, authHeaders, pagesFromArgs, flag, pageFile, readMain,
  writeMain, log,
} from './lib.mjs';

const HOSTS = new Set((process.env.SOURCE_HOSTS || 'www.jameshardie.com,jameshardie.com').split(',').map((h) => h.trim()));
const SKIP_DIRS = new Set(['media-da', 'shared-media', 'library']);

function allPages(dir = CONTENT_DIR, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) && !prefix ? [] : allPages(path.join(dir, e.name), `${prefix}${e.name}/`);
    return e.name.endsWith('.plain.html') ? [`${prefix}${e.name.replace(/\.plain\.html$/, '')}`] : [];
  });
}

/** The migrated page a source URL or site-relative link points to: { page, to, hash }, or null. */
function target(href) {
  const relative = href.startsWith('/') && !href.startsWith('//');
  let u;
  try { u = relative ? new URL(href, 'https://source.invalid') : new URL(href); } catch { return null; }
  if (!relative && !HOSTS.has(u.host)) return null;
  // EDS page paths are lowercase: /…/vision-house-Sussex is imported as /…/vision-house-sussex
  const p = decodeURIComponent(u.pathname).replace(/^\/+|\/+$/g, '').toLowerCase();
  if (/\.[a-z0-9]{2,5}$/i.test(p)) return null; // a file (PDF…), not a page
  const page = p || 'index';
  if (!fs.existsSync(pageFile(page))) return null;
  return { page, to: `/${p}${u.search}${u.hash}`, hash: u.hash.slice(1) };
}

const liveCache = new Map();
/** True when the page is published (live), from the admin status API. */
async function isLive(page) {
  if (!liveCache.has(page)) {
    const web = page === 'index' ? '' : page;
    liveCache.set(page, fetch(`${ADMIN}/status/${ORG}/${SITE}/${REF}/${web}`, { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : {}))
      .then((s) => s.live?.status === 200)
      .catch(() => false));
  }
  return liveCache.get(page);
}

const hasId = (page, id) => fs.readFileSync(pageFile(page), 'utf8').includes(`id="${id}"`);

const args = process.argv.slice(2);
const checkLive = !flag(args, '--ignore-live');
const pages = flag(args, '--all') ? allPages() : pagesFromArgs(args);
if (!pages.length) {
  log('Usage: node tools/importer/da-sync/relink.mjs <page|url>... [--urls <file>] [--all] [--dry-run] [--ignore-live]');
  process.exit(2);
}
let total = 0;
let waiting = 0;
for (const page of pages) {
  const file = pageFile(page);
  if (!fs.existsSync(file)) {
    log(`ERROR    ${page}: page not found in content/`);
    continue; // eslint-disable-line no-continue
  }
  const main = readMain(file);
  const pageIsLive = checkLive && await isLive(page);
  const changes = [];
  const held = [];
  const anchors = [];
  for (const a of main.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    const t = target(href);
    if (!t || t.to === href) continue; // eslint-disable-line no-continue
    if (pageIsLive && !(await isLive(t.page))) {
      held.push(t.to);
      continue; // eslint-disable-line no-continue
    }
    if (t.hash && !hasId(t.page, t.hash)) anchors.push(t.to);
    a.setAttribute('href', t.to);
    if (a.textContent.trim() === href) a.textContent = t.to;
    changes.push(t.to);
  }
  total += changes.length;
  waiting += held.length;
  if (changes.length && !flag(args, '--dry-run')) writeMain(file, main);
  const label = changes.length ? 'RELINKED' : 'OK      ';
  log(`${label} ${page}: ${changes.length} link(s)${changes.length ? ` → ${[...new Set(changes)].join(', ')}` : ''}`);
  if (held.length) log(`  WAITING  ${held.length} link(s) to pages not published yet (this page is live): ${[...new Set(held)].join(', ')}`);
  if (anchors.length) log(`  CHECK    anchor not found on the target page: ${[...new Set(anchors)].join(', ')}`);
}
log(`total: ${total} link(s)${waiting ? `, ${waiting} waiting for their target to be published` : ''}${flag(args, '--dry-run') ? ' (dry run)' : ''}`);
