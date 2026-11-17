#!/usr/bin/env node
/*
 * Rebuild the team inventory (content/library/inventory.json, the DA sheet library/inventory)
 * from the site pages in the workspace. Run it after importing or editing pages, then push the
 * sheet to DA.
 *
 *   node tools/importer/da-sync/inventory.mjs [--dry-run]
 *
 * Regenerated tabs: blocks, section-styles, images, videos, pending (media still on another site).
 * Kept as they are: templates, icons (curated by hand), plus each video's and style's notes.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  CONTENT_DIR, DA_CONTENT, PREVIEW_HOST, readMain, mediaRefs, isOwn, localToDa, flag, log,
} from './lib.mjs';

const INVENTORY = path.join(CONTENT_DIR, 'library', 'inventory.json');
const SKIP_DIRS = new Set(['media-da', 'shared-media', 'library']);
const NOT_BLOCKS = new Set(['metadata', 'section-metadata', 'library-metadata']);
const sheet = (rows) => ({
  total: rows.length, limit: rows.length, offset: 0, data: rows,
});

function sitePages(dir = CONTENT_DIR, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) && !prefix ? [] : sitePages(path.join(dir, e.name), `${prefix}${e.name}/`);
    return e.name.endsWith('.plain.html') ? [`${prefix}${e.name.replace(/\.plain\.html$/, '')}`] : [];
  }).sort();
}

const url = (p) => `/${p === 'index' ? '' : p}`;
const blockOf = (el) => el.closest('main > div > div[class]')?.className.split(' ')[0] || 'default-content';

const old = JSON.parse(fs.readFileSync(INVENTORY, 'utf8'));
const oldNotes = Object.fromEntries((old.videos?.data || []).map((v) => [v.file, v.note || '']));
const oldStyles = Object.fromEntries((old['section-styles']?.data || []).map((s) => [s.style, s]));
const libraryBlocks = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'library', 'blocks.json'), 'utf8')).data;
const blockDocs = Object.fromEntries(libraryBlocks.map((r) => [r.path.split('/').pop(), r.path]));

const blocks = {};
const styles = {};
const images = [];
const videos = [];
const pending = [];
const pages = sitePages();
pages.forEach((p) => {
  const main = readMain(path.join(CONTENT_DIR, `${p}.plain.html`));
  main.querySelectorAll(':scope > div > div[class]').forEach((b) => {
    const [name, ...opts] = b.className.split(' ');
    if (NOT_BLOCKS.has(name)) return;
    const key = opts.length ? `${name} (${opts.join(' ')})` : name;
    blocks[key] = blocks[key] || {
      block: name, variant: opts.join(' ') || 'default', uses: 0, pages: new Set(),
    };
    blocks[key].uses += 1;
    blocks[key].pages.add(url(p));
  });
  main.querySelectorAll('.section-metadata > div').forEach((row) => {
    if (row.children[0]?.textContent.trim().toLowerCase() !== 'style') return;
    row.children[1].textContent.split(',').map((s) => s.trim()).filter(Boolean).forEach((s) => {
      (styles[s] = styles[s] || new Set()).add(url(p));
    });
  });
  main.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    const daUrl = src.startsWith('/media-da/') ? localToDa(src) : src;
    const local = src.startsWith('/media-da/') ? path.join(CONTENT_DIR, src) : null;
    images.push({
      page: url(p),
      file: src.split('/').pop(),
      block: blockOf(img),
      alt: img.getAttribute('alt') || '',
      'size-kb': local && fs.existsSync(local) ? Math.round(fs.statSync(local).size / 1024) : '',
      'da-location': daUrl,
    });
  });
  const { images: imgRefs, videos: vidRefs } = mediaRefs(main);
  vidRefs.filter((v) => isOwn(v)).forEach((v) => {
    const file = v.split('/').pop();
    const a = [...main.querySelectorAll('a[href]')].find((x) => x.getAttribute('href') === v);
    videos.push({
      page: url(p),
      file,
      block: a ? blockOf(a) : '',
      'da-location': `${DA_CONTENT}/shared-media/${file}`,
      'site-url': v.startsWith('http') ? v : `${PREVIEW_HOST}${v}`,
      note: oldNotes[file] || '',
    });
  });
  [...imgRefs, ...vidRefs].filter((u) => !isOwn(u)).forEach((u) => {
    pending.push({
      page: url(p), type: /\.mp4/i.test(u) ? 'video' : 'image', reason: 'Still served by another site', url: u,
    });
  });
});

const inv = { ...old };
inv.blocks = sheet(Object.entries(blocks).sort(([a], [b]) => a.localeCompare(b)).map(([, b]) => ({
  block: b.block, variant: b.variant, uses: b.uses, pages: [...b.pages].join(', '), code: `blocks/${b.block}/`, 'library-example': blockDocs[b.block] || '',
})));
inv['section-styles'] = sheet(Object.entries(styles).sort(([a], [b]) => a.localeCompare(b)).map(([s, ps]) => ({
  style: s,
  description: oldStyles[s]?.description || '',
  pages: [...ps].join(', '),
  css: oldStyles[s]?.css || 'styles/styles.css',
})));
inv.images = sheet(images);
inv.videos = sheet(videos);
inv.pending = sheet(pending);
inv[':names'] = ['templates', 'blocks', 'section-styles', 'icons', 'images', 'videos', 'pending'];
inv[':version'] = 3;
inv[':type'] = 'multi-sheet';

log(`pages: ${pages.length} | ${inv[':names'].map((n) => `${n}(${inv[n].data.length})`).join(', ')}`);
if (!flag(process.argv, '--dry-run')) fs.writeFileSync(INVENTORY, `${JSON.stringify(inv, null, 2)}\n`);
