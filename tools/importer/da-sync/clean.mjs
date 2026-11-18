#!/usr/bin/env node
/*
 * Remove import leftovers that the importer's cleanup misses: links with no address (the source
 * site's "English" / "Français (Canada)" language switcher, rendered by a script the importer
 * sees differently than the saved page) and the empty paragraphs they leave. Run it after each
 * import, before localize.
 *
 *   node tools/importer/da-sync/clean.mjs <page|url>... [--urls <file>] [--all] [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  CONTENT_DIR, pagesFromArgs, flag, pageFile, readMain, writeMain, log,
} from './lib.mjs';

const SKIP_DIRS = new Set(['media-da', 'shared-media', 'library']);
/** Labels of the source site's language switcher (Weglot). */
const LANGUAGE_LABELS = new Set(['English', 'Français (Canada)', 'Français', 'Español']);

function allPages(dir = CONTENT_DIR, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) && !prefix ? [] : allPages(path.join(dir, e.name), `${prefix}${e.name}/`);
    return e.name.endsWith('.plain.html') ? [`${prefix}${e.name.replace(/\.plain\.html$/, '')}`] : [];
  });
}

const args = process.argv.slice(2);
const pages = flag(args, '--all') ? allPages() : pagesFromArgs(args);
if (!pages.length) {
  log('Usage: node tools/importer/da-sync/clean.mjs <page|url>... [--urls <file>] [--all] [--dry-run]');
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
  const removed = [];
  // empty links, plus the language switcher's links once DA has turned their empty href into "/"
  const isLeftover = (a) => {
    const href = a.getAttribute('href');
    if (href === null || href === '') return true;
    return LANGUAGE_LABELS.has(a.textContent.trim()) && ['/', '#'].includes(href);
  };
  [...main.querySelectorAll('a')].filter(isLeftover).forEach((a) => {
    if (a.querySelector('img, picture, svg')) return; // an image without a link target: keep the image
    removed.push(a.textContent.trim());
    const parent = a.parentElement;
    a.remove();
    if (parent && parent.tagName === 'P' && !parent.textContent.trim() && !parent.children.length) parent.remove();
  });
  total += removed.length;
  if (removed.length && !flag(args, '--dry-run')) writeMain(file, main);
  if (removed.length) log(`CLEANED  ${page}: ${removed.length} empty link(s): ${[...new Set(removed)].join(', ')}`);
});
log(`total: ${total} empty link(s) removed from ${pages.length} page(s)${flag(args, '--dry-run') ? ' (dry run)' : ''}`);
