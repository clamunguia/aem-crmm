#!/usr/bin/env node
/*
 * Remove import leftovers that the importer's cleanup misses: links with no address (the source
 * site's "English" / "Français (Canada)" language switcher, rendered by a script the importer
 * sees differently than the saved page) and the empty paragraphs they leave. Run it after each
 * import, before localize.
 * It also joins links the importer split around a ™/® superscript: "Trim-Over", "™" and
 * "Installation Method" as three links to the same page, with spaces between, become one link
 * that reads "Trim-Over™ Installation Method".
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

const WRAPPERS = new Set(['STRONG', 'EM', 'B', 'U']);
/** A link, or a <strong>/<em> that holds only a link: { a, wrap }, else null. */
function linkUnit(node) {
  if (node.nodeType !== 1) return null;
  if (node.tagName === 'A') return { a: node, wrap: '' };
  const only = node.children.length === 1 && node.firstElementChild;
  if (WRAPPERS.has(node.tagName) && only?.tagName === 'A' && node.textContent.trim() === only.textContent.trim()) {
    return { a: only, wrap: node.tagName };
  }
  return null;
}

/** True when the first visible text of a node is in a <sup> (™, ®). */
function startsWithSup(node) {
  const walker = node.ownerDocument.createTreeWalker(node, 4); // NodeFilter.SHOW_TEXT
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    if (t.textContent.trim()) return Boolean(t.parentElement.closest('sup'));
  }
  return false;
}

/** Join runs of sibling links to the same href, separated only by spaces. Returns the count. */
function joinSplitLinks(main) {
  let joined = 0;
  [main, ...main.querySelectorAll('*')].forEach((parent) => {
    const kids = [...parent.childNodes];
    for (let i = 0; i < kids.length; i += 1) {
      const first = linkUnit(kids[i]);
      if (first) {
        const href = first.a.getAttribute('href');
        let j = i + 1;
        let last = i;
        while (j < kids.length) {
          const k = kids[j];
          const blank = k.nodeType === 3 && !k.textContent.trim();
          const u = blank ? null : linkUnit(k);
          if (!blank && !(u && u.wrap === first.wrap && u.a.getAttribute('href') === href)) break;
          if (u) last = j;
          j += 1;
        }
        if (last > i) {
          for (let k = i + 1; k <= last; k += 1) {
            const u = linkUnit(kids[k]);
            if (u) {
              const leadingSpace = /^\s/.test(u.a.textContent);
              if (!leadingSpace && !startsWithSup(u.a)) first.a.append(' ');
              first.a.append(...u.a.childNodes);
            }
            kids[k].remove();
          }
          joined += 1;
          i = last;
        }
      }
    }
  });
  return joined;
}

const args = process.argv.slice(2);
const pages = flag(args, '--all') ? allPages() : pagesFromArgs(args);
if (!pages.length) {
  log('Usage: node tools/importer/da-sync/clean.mjs <page|url>... [--urls <file>] [--all] [--dry-run]');
  process.exit(2);
}
let total = 0;
let totalJoined = 0;
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
  const joined = joinSplitLinks(main);
  total += removed.length;
  totalJoined += joined;
  if ((removed.length || joined) && !flag(args, '--dry-run')) writeMain(file, main);
  if (removed.length) log(`CLEANED  ${page}: ${removed.length} empty link(s): ${[...new Set(removed)].join(', ')}`);
  if (joined) log(`JOINED   ${page}: ${joined} link(s) split around ™/®`);
});
log(`total: ${total} empty link(s) removed, ${totalJoined} split link(s) joined, in ${pages.length} page(s)${flag(args, '--dry-run') ? ' (dry run)' : ''}`);
