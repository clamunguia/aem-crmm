#!/usr/bin/env node
/*
 * Build content/redirects.json, the EDS redirects sheet (Source -> Destination), for the pages
 * that are published:
 *  - every catalog URL whose page is live: its source path (with the trailing slash, original
 *    case) -> the EDS path (no trailing slash, lowercase). EDS answers 404 for "/faq/".
 *    Paths with capitals also get their no-slash form.
 *  - the lines of redirects-extra.txt whose new path is live (both slash forms of the old path).
 * The live pages come from the live site index (query-index.json). A Source that is itself a
 * live page, or a Destination that is not live, stops the run.
 * Upload the sheet to DA as /redirects and publish it; EDS applies it on the live site.
 *
 *   node tools/importer/da-sync/redirects.mjs [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONTENT_DIR, ORG, SITE, flag, log,
} from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const LIVE = `https://main--${SITE}--${ORG}.aem.live`;

const eds = (p) => (p.replace(/\/+$/, '').toLowerCase() || '/');

async function livePaths() {
  const paths = new Set(['/']);
  let offset = 0;
  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const json = await (await fetch(`${LIVE}/query-index.json?limit=500&offset=${offset}`)).json();
    json.data.forEach((r) => paths.add(r.path));
    offset += json.data.length;
    if (!json.data.length || offset >= json.total) break;
  }
  return paths;
}

const live = await livePaths();
const rows = new Map();
const add = (source, destination) => {
  if (source !== destination && !rows.has(source)) rows.set(source, destination);
};

const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog/template-catalog.json'), 'utf8'));
let fromCatalog = 0;
catalog.templates.forEach((t) => (t.pages || t.urls).forEach((x) => {
  const src = new URL(typeof x === 'string' ? x : x.url).pathname;
  const dst = eds(src);
  if (dst === '/' || !live.has(dst)) return;
  add(src, dst);
  const noSlash = src.replace(/\/+$/, '');
  if (noSlash !== dst) add(noSlash, dst);
  fromCatalog += 1;
}));

let extra = 0;
fs.readFileSync(path.join(here, 'redirects-extra.txt'), 'utf8').split('\n')
  .map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  .forEach((l) => {
    const [from, to] = l.split(/\s+/);
    if (!live.has(to)) { log(`SKIPPED  ${from} -> ${to}: not published yet`); return; }
    const base = from.replace(/\/+$/, '');
    add(base, to);
    add(`${base}/`, to);
    extra += 1;
  });

const data = [...rows].map(([Source, Destination]) => ({ Source, Destination }));
const problems = data.flatMap((r) => [
  ...(live.has(r.Source) ? [`Source is a published page: ${r.Source}`] : []),
  ...(!live.has(r.Destination) ? [`Destination is not published: ${r.Destination}`] : []),
]);
if (problems.length) {
  problems.forEach((p) => log(`ERROR    ${p}`));
  process.exit(1);
}
if (!flag(process.argv.slice(2), '--dry-run')) {
  const sheet = {
    total: data.length, offset: 0, limit: data.length, data, ':type': 'sheet',
  };
  fs.writeFileSync(path.join(CONTENT_DIR, 'redirects.json'), `${JSON.stringify(sheet, null, 2)}\n`);
}
log(`redirects: ${data.length} (${fromCatalog} published catalog pages, ${extra} extra paths)${flag(process.argv.slice(2), '--dry-run') ? ' (dry run)' : ''}`);
