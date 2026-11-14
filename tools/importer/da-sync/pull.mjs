#!/usr/bin/env node
/*
 * Pull pages from Document Authoring into the workspace: write DA's version of each page to
 * content/<page>.plain.html (DA media URLs mapped to content/media-da/) and download the images
 * the page uses that are not in the workspace yet. Use it before editing a page someone
 * changed in DA.
 *
 *   node tools/importer/da-sync/pull.mjs <page|url>... [--urls <file>] [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  CONTENT_DIR, DA_SOURCE, pagesFromArgs, flag, pageFile, writeMain, mapUrls, mediaRefs, daToLocal,
  daSourcePathOfMedia, fetchDaMain, authHeaders, log,
} from './lib.mjs';

async function pullPage(page, dryRun) {
  const main = await fetchDaMain(page);
  if (!main) return { page, status: 'error', detail: 'not found in DA' };
  mapUrls(main, (u) => daToLocal(u));
  let downloaded = 0;
  const missing = mediaRefs(main).images.filter((u) => u.startsWith('/media-da/') && !fs.existsSync(path.join(CONTENT_DIR, u)));
  for (const u of missing) {
    const res = await fetch(`${DA_SOURCE}/${daSourcePathOfMedia(u)}`, { headers: authHeaders() });
    if (!res.ok) return { page, status: 'error', detail: `could not download ${u} (HTTP ${res.status})` };
    if (!dryRun) {
      fs.mkdirSync(path.dirname(path.join(CONTENT_DIR, u)), { recursive: true });
      fs.writeFileSync(path.join(CONTENT_DIR, u), Buffer.from(await res.arrayBuffer()));
    }
    downloaded += 1;
  }
  const file = pageFile(page);
  const changed = !fs.existsSync(file) || fs.readFileSync(file, 'utf8').trim() !== main.innerHTML.trim();
  if (!dryRun && changed) writeMain(file, main);
  return { page, status: dryRun ? 'dry-run' : 'ok', detail: `${changed ? 'page updated' : 'page already up to date'}, ${downloaded} images downloaded` };
}

const args = process.argv.slice(2);
const pages = pagesFromArgs(args);
if (!pages.length) {
  log('Usage: node tools/importer/da-sync/pull.mjs <page|url>... [--urls <file>] [--dry-run]');
  process.exit(2);
}
const results = [];
for (const page of pages) {
  let r;
  try {
    r = await pullPage(page, flag(args, '--dry-run'));
  } catch (e) {
    r = { page, status: 'error', detail: e.message };
  }
  results.push(r);
  log(`${r.status.toUpperCase().padEnd(8)} ${page}: ${r.detail}`);
}
process.exit(results.some((r) => r.status === 'error') ? 1 : 0);
