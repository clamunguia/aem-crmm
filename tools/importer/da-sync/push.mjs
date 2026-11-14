#!/usr/bin/env node
/*
 * Push pages to Document Authoring: upload the media each page uses (when missing in DA),
 * then the page itself, read it back and compare. With --preview, preview the videos and pages.
 *
 *   node tools/importer/da-sync/push.mjs <page|url>... [--urls <file>]
 *     [--preview] [--force] [--dry-run]
 *
 * Safety: a page that already exists in DA with different content is skipped unless --force
 * (someone may have edited it in DA: run pull.mjs first). Pages that still load media from
 * another site are skipped: run localize.mjs first. Nothing is ever published live.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  CONTENT_DIR, DA_CONTENT, PREVIEW_HOST, pagesFromArgs, flag, pageFile, readMain, mapUrls,
  mediaRefs, isOwn, localToDa, daSourcePathOfMedia, daDocument, fetchDaMain, daPut, daExists,
  contentType, preview, log,
} from './lib.mjs';

const SHARED = '/shared-media/';
const sharedFile = (url) => {
  const p = url.startsWith('http') ? new URL(url).pathname : url;
  return p.startsWith(SHARED) ? p.slice(SHARED.length) : null;
};

async function pushPage(page, { force, dryRun, withPreview }) {
  const file = pageFile(page);
  if (!fs.existsSync(file)) return { page, status: 'error', detail: 'page not found in content/' };
  const main = readMain(file);
  const { images, videos } = mediaRefs(main);
  const external = [...images, ...videos].filter((u) => !isOwn(u));
  if (external.length) return { page, status: 'skipped', detail: `${external.length} media still on another site: run localize.mjs first` };

  const doc = daDocument(main);
  const local = readMain(file);
  mapUrls(local, (u) => localToDa(u));
  // compare in DA form: a DA page may also hold workspace-style /media-da/ paths
  const canonical = (m) => (m ? mapUrls(m, (u) => localToDa(u)).innerHTML.trim() : null);
  const current = canonical(await fetchDaMain(page));
  const unchanged = current === local.innerHTML.trim();
  if (current && !unchanged && !force) {
    return { page, status: 'skipped', detail: 'DA has a different version: run pull.mjs to get it, or --force to overwrite' };
  }

  // media first, so the page never points at a file DA does not have
  const uploads = [];
  images.filter((u) => u.startsWith('/media-da/')).forEach((u) => uploads.push({ local: path.join(CONTENT_DIR, u), da: daSourcePathOfMedia(u) }));
  videos.map(sharedFile).filter(Boolean).forEach((f) => uploads.push({ local: path.join(CONTENT_DIR, 'shared-media', f), da: `shared-media/${f}` }));
  let uploaded = 0;
  for (const u of uploads) {
    if (!(await daExists(u.da))) {
      if (!fs.existsSync(u.local)) return { page, status: 'error', detail: `missing in DA and locally: ${u.da}` };
      if (!dryRun) await daPut(u.da, fs.readFileSync(u.local), contentType(u.local));
      uploaded += 1;
    }
  }
  let pageNote = 'page unchanged';
  if (!current) pageNote = 'new page';
  else if (!unchanged) pageNote = 'page overwritten';
  if (dryRun) return { page, status: 'dry-run', detail: `would upload ${uploaded} media; ${pageNote}` };

  if (!unchanged) {
    await daPut(`${page}.html`, doc, 'text/html');
    const after = await fetchDaMain(page);
    if (!after || after.innerHTML.trim() !== local.innerHTML.trim()) return { page, status: 'error', detail: 'DA copy differs from the local page after upload' };
  }

  let previewNote = '';
  if (withPreview) {
    const files = videos.map(sharedFile).filter(Boolean);
    for (const f of files) await preview(`shared-media/${f}`);
    await preview(page === 'index' ? '' : page);
    const broken = [];
    for (const f of files) {
      const res = await fetch(`${PREVIEW_HOST}${SHARED}${f}`, { headers: { Range: 'bytes=0-0' } });
      if (!res.ok) broken.push(f);
    }
    previewNote = broken.length ? `, previewed, BROKEN videos: ${broken.join(', ')}` : `, previewed (${files.length} videos ok)`;
    if (broken.length) return { page, status: 'error', detail: `uploaded ${uploaded} media; ${pageNote}${previewNote}` };
  }
  return { page, status: 'ok', detail: `uploaded ${uploaded} media; ${pageNote}${previewNote}` };
}

const args = process.argv.slice(2);
const pages = pagesFromArgs(args);
if (!pages.length) {
  log('Usage: node tools/importer/da-sync/push.mjs <page|url>... [--urls <file>] [--preview] [--force] [--dry-run]');
  process.exit(2);
}
log(`DA: ${DA_CONTENT}`);
const opts = { force: flag(args, '--force'), dryRun: flag(args, '--dry-run'), withPreview: flag(args, '--preview') };
const results = [];
for (const page of pages) {
  let r;
  try {
    r = await pushPage(page, opts);
  } catch (e) {
    r = { page, status: 'error', detail: e.message };
  }
  results.push(r);
  log(`${r.status.toUpperCase().padEnd(8)} ${page}: ${r.detail}`);
}
process.exit(results.some((r) => r.status === 'error' || r.status === 'skipped') ? 1 : 0);
