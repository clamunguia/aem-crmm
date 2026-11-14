#!/usr/bin/env node
/*
 * Localize a page's media: download every image and video the page loads from another site,
 * save it in the workspace and point the page at the local copy. Run it after each import.
 *
 *   node tools/importer/da-sync/localize.mjs <page|url>... [--urls <file>] [--dry-run]
 *
 * Images -> content/media-da/<page>/<name>-<hash>.<ext>
 *           PNG, JPEG or SVG; resizer URLs (?url=…) are resolved to the original image.
 * Videos -> content/shared-media/<name>-<hash>.mp4
 *           linked as <preview host>/shared-media/<file>; push.mjs uploads and previews them.
 * Exit code 1 when something could not be localized (listed in the report).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  CONTENT_DIR, PREVIEW_HOST, MAX_VIDEO_BYTES, pagesFromArgs, flag, pageFile, readMain, writeMain,
  mapUrls, mediaRefs, isOwn, log,
} from './lib.mjs';

const SIGNATURES = {
  jpg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  gif: [0x47, 0x49, 0x46],
  webp: [0x52, 0x49, 0x46, 0x46],
};
const ACCEPTED_IMAGES = new Set(['jpg', 'png', 'svg']);

function sniff(buf) {
  const found = Object.keys(SIGNATURES).find((k) => SIGNATURES[k].every((b, i) => buf[i] === b));
  if (found) return found;
  if (buf.subarray(0, 512).toString().includes('<svg')) return 'svg';
  if (buf.subarray(4, 8).toString() === 'ftyp') return 'mp4';
  return null;
}

function slug(text) {
  return text.toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'media';
}

const hash = (text) => crypto.createHash('sha1').update(text).digest('hex').slice(0, 8);

/** The real asset behind a resizer URL (its url= parameter), else the URL itself. */
function innerUrl(url) {
  const inner = new URL(url).searchParams.get('url');
  return inner ? decodeURIComponent(inner) : url;
}

/** URLs to try for an image, best first. */
function imageCandidates(url) {
  const real = innerUrl(url);
  if (real.includes('images.ctfassets.net')) {
    const base = real.split('?')[0];
    const isPng = /\.png$/i.test(new URL(base).pathname);
    return [`${base}?w=2000${isPng ? '' : '&fm=jpg&q=80'}`, url];
  }
  return real === url ? [url] : [url, real];
}

async function download(candidates, accept) {
  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate, { headers: { Accept: accept }, redirect: 'follow' });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        const kind = sniff(buf);
        if (kind) return { buf, kind };
      }
    } catch { /* try the next candidate */ }
  }
  return null;
}

async function localizePage(page, dryRun) {
  const file = pageFile(page);
  if (!fs.existsSync(file)) return { page, error: 'page not found in content/' };
  const main = readMain(file);
  const { images, videos } = mediaRefs(main);
  const map = {};
  const failed = [];

  for (const url of images.filter((u) => !isOwn(u))) {
    const got = await download(imageCandidates(url), 'image/jpeg,image/png,image/svg+xml;q=0.9,*/*;q=0.5');
    if (!got || !ACCEPTED_IMAGES.has(got.kind)) {
      failed.push({ url, reason: got ? `unsupported image type ${got.kind}` : 'download failed' });
    } else {
      const name = `${slug(path.basename(new URL(innerUrl(url)).pathname))}-${hash(url)}.${got.kind}`;
      const rel = `/media-da/${page}/${name}`;
      if (!dryRun) {
        fs.mkdirSync(path.join(CONTENT_DIR, 'media-da', page), { recursive: true });
        fs.writeFileSync(path.join(CONTENT_DIR, rel), got.buf);
      }
      map[url] = rel;
    }
  }

  for (const url of videos.filter((u) => !isOwn(u))) {
    const got = await download([url], 'video/mp4,*/*;q=0.5');
    if (!got || got.kind !== 'mp4') {
      failed.push({ url, reason: 'download failed or not an MP4' });
    } else if (got.buf.length > MAX_VIDEO_BYTES) {
      failed.push({ url, reason: `video is ${(got.buf.length / 1048576).toFixed(1)} MB; the preview accepts up to 36 MB (compress it first)` });
    } else {
      const name = `${slug(path.basename(new URL(url).pathname))}-${hash(url)}.mp4`;
      if (!dryRun) {
        fs.mkdirSync(path.join(CONTENT_DIR, 'shared-media'), { recursive: true });
        fs.writeFileSync(path.join(CONTENT_DIR, 'shared-media', name), got.buf);
      }
      map[url] = `${PREVIEW_HOST}/shared-media/${name}`;
    }
  }

  if (!dryRun && Object.keys(map).length) {
    mapUrls(main, (u) => map[u] || u);
    writeMain(file, main);
  }
  const left = mediaRefs(main);
  return {
    page,
    localized: Object.keys(map).length,
    stillExternal: [...left.images, ...left.videos].filter((u) => !isOwn(u)).length,
    failed,
  };
}

const args = process.argv.slice(2);
const pages = pagesFromArgs(args);
if (!pages.length) {
  log('Usage: node tools/importer/da-sync/localize.mjs <page|url>... [--urls <file>] [--dry-run]');
  process.exit(2);
}
const results = [];
for (const page of pages) {
  const r = await localizePage(page, flag(args, '--dry-run'));
  results.push(r);
  let label = 'OK   ';
  if (r.error) label = 'ERROR';
  else if (r.failed.length) label = 'WARN ';
  log(`${label} ${page}: ${r.error || `${r.localized} localized, ${r.stillExternal} still external`}`);
  (r.failed || []).forEach((f) => log(`       - ${f.reason}: ${f.url.slice(0, 120)}`));
}
process.exit(results.some((r) => r.error || r.failed.length) ? 1 : 0);
