#!/usr/bin/env node
/*
 * Point links to the source site at our own pages, once those pages are migrated.
 * A link such as https://www.jameshardie.com/product-catalog/ becomes /product-catalog when
 * content/product-catalog.plain.html exists in the workspace. Links to pages that are not
 * migrated yet are left as they are; run this again after each batch.
 *
 *   node tools/importer/da-sync/relink.mjs <page|url>... [--urls <file>] [--all] [--dry-run]
 *
 * --all     every site page in the workspace (not the library)
 * Settings: SOURCE_HOSTS, comma-separated, default "www.jameshardie.com,jameshardie.com".
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  CONTENT_DIR, pagesFromArgs, flag, pageFile, readMain, writeMain, log,
} from './lib.mjs';

const HOSTS = new Set((process.env.SOURCE_HOSTS || 'www.jameshardie.com,jameshardie.com').split(',').map((h) => h.trim()));
const SKIP_DIRS = new Set(['media-da', 'shared-media', 'library']);

function allPages(dir = CONTENT_DIR, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) && !prefix ? [] : allPages(path.join(dir, e.name), `${prefix}${e.name}/`);
    return e.name.endsWith('.plain.html') ? [`${prefix}${e.name.replace(/\.plain\.html$/, '')}`] : [];
  });
}

/** The local path for a source URL when that page is migrated, else null. */
function localPath(href) {
  let u;
  try { u = new URL(href); } catch { return null; }
  if (!HOSTS.has(u.host)) return null;
  const p = decodeURIComponent(u.pathname).replace(/^\/+|\/+$/g, '');
  if (/\.[a-z0-9]{2,5}$/i.test(p)) return null; // a file (PDF…), not a page
  if (!fs.existsSync(pageFile(p || 'index'))) return null;
  return `/${p}${u.search}${u.hash}`;
}

const args = process.argv.slice(2);
const pages = flag(args, '--all') ? allPages() : pagesFromArgs(args);
if (!pages.length) {
  log('Usage: node tools/importer/da-sync/relink.mjs <page|url>... [--urls <file>] [--all] [--dry-run]');
  process.exit(2);
}
let total = 0;
pages.forEach((page) => {
  const file = pageFile(page);
  if (!fs.existsSync(file)) {
    log(`ERROR    ${page}: page not found in content/`);
    return;
  }
  const main = readMain(file);
  const changes = [];
  main.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    const to = localPath(href);
    if (!to) return;
    a.setAttribute('href', to);
    if (a.textContent.trim() === href) a.textContent = to;
    changes.push(to);
  });
  total += changes.length;
  if (changes.length && !flag(args, '--dry-run')) writeMain(file, main);
  log(`${changes.length ? 'RELINKED' : 'OK      '} ${page}: ${changes.length} link(s)${changes.length ? ` → ${[...new Set(changes)].join(', ')}` : ''}`);
});
log(`total: ${total} link(s)${flag(args, '--dry-run') ? ' (dry run)' : ''}`);
