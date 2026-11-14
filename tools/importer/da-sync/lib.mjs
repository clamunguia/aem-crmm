/*
 * Shared helpers for the DA sync tools (localize, push, pull).
 *
 * Local workspace layout (mirrors Document Authoring):
 *   content/<page>.plain.html                 page body (<main> inner HTML)
 *   content/media-da/<dir>/<page>/<file>      the page's images   <-> DA /<dir>/.<page>/<file>
 *   content/shared-media/<file>.mp4           videos              <-> DA /shared-media/<file>.mp4
 *
 * Settings (environment variables):
 *   DA_ORG, DA_SITE   default clamunguia / aem-crmm
 *   AEM_REF           branch used for preview, default main
 *   DA_TOKEN          optional IMS token, sent as "Authorization: Bearer". Never commit it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

export const ORG = process.env.DA_ORG || 'clamunguia';
export const SITE = process.env.DA_SITE || 'aem-crmm';
export const REF = process.env.AEM_REF || 'main';
export const CONTENT_DIR = path.resolve('content');
export const DA_CONTENT = `https://content.da.live/${ORG}/${SITE}`;
export const DA_SOURCE = `https://admin.da.live/source/${ORG}/${SITE}`;
export const ADMIN = 'https://admin.hlx.page';
export const PREVIEW_HOST = `https://${REF}--${SITE}--${ORG}.aem.page`;

/** Largest MP4 the preview accepts. */
export const MAX_VIDEO_BYTES = 36 * 1024 * 1024;

export function authHeaders(extra = {}) {
  const headers = { ...extra };
  if (process.env.DA_TOKEN) headers.Authorization = `Bearer ${process.env.DA_TOKEN}`;
  return headers;
}

/** "https://www.example.com/a/b/" -> "a/b"; "/" -> "index". Accepts page paths too. */
export function toPagePath(input) {
  let p = input.trim();
  if (/^https?:\/\//.test(p)) p = new URL(p).pathname;
  p = p.replace(/\.plain\.html$/, '').replace(/\.html?$/, '').replace(/^\/+|\/+$/g, '');
  if (p.startsWith('content/')) p = p.slice('content/'.length);
  return p || 'index';
}

/** Pages from arguments: page paths, URLs, or --urls <file> (one URL per line). */
export function pagesFromArgs(args) {
  const pages = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--urls') {
      i += 1;
      fs.readFileSync(args[i], 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)
        .forEach((u) => pages.push(toPagePath(u)));
    } else if (!args[i].startsWith('--')) {
      pages.push(toPagePath(args[i]));
    }
  }
  return [...new Set(pages)];
}

export const flag = (args, name) => args.includes(name);
export const pageFile = (page) => path.join(CONTENT_DIR, `${page}.plain.html`);

export function readMain(file) {
  const html = fs.readFileSync(file, 'utf8');
  const { document } = new JSDOM(html.includes('<main') ? html : `<main>${html}</main>`).window;
  return document.querySelector('main');
}

export function writeMain(file, main) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${main.innerHTML.trim()}\n`);
}

/** /media-da/<dir>/<page>/<file>  ->  https://content.da.live/<org>/<site>/<dir>/.<page>/<file> */
export function localToDa(url) {
  if (!url.startsWith('/media-da/')) return url;
  const parts = url.slice('/media-da/'.length).split('/');
  const file = parts.pop();
  const page = parts.pop();
  return `${DA_CONTENT}/${parts.length ? `${parts.join('/')}/` : ''}.${page}/${file}`;
}

/** The reverse of localToDa; other URLs are returned unchanged. */
export function daToLocal(url) {
  if (!url.startsWith(`${DA_CONTENT}/`)) return url;
  const parts = url.slice(DA_CONTENT.length + 1).split('/');
  const file = parts.pop();
  const folder = parts.pop();
  if (!folder || !folder.startsWith('.')) return url;
  return `/media-da/${parts.length ? `${parts.join('/')}/` : ''}${folder.slice(1)}/${file}`;
}

/** DA source path of a local media URL: /media-da/a/b/f.jpg -> a/.b/f.jpg */
export function daSourcePathOfMedia(url) {
  return localToDa(url).slice(DA_CONTENT.length + 1);
}

const URL_ATTRS = [['img', 'src'], ['source', 'srcset'], ['a', 'href']];

/** Apply fn to every image/link URL in main (srcset candidates one by one). */
export function mapUrls(main, fn) {
  URL_ATTRS.forEach(([sel, attr]) => main.querySelectorAll(`${sel}[${attr}]`).forEach((el) => {
    const value = el.getAttribute(attr);
    const next = attr === 'srcset'
      ? value.split(',').map((c) => {
        const [u, ...rest] = c.trim().split(/\s+/);
        return [fn(u, el), ...rest].join(' ');
      }).join(', ')
      : fn(value, el);
    if (next === value) return;
    el.setAttribute(attr, next);
    // a link that shows its own URL keeps text and href in step
    if (el.tagName === 'A' && el.textContent.trim() === value) el.textContent = next;
  }));
  return main;
}

/** Every image URL (img src + srcset candidates) and every .mp4 link in main. */
export function mediaRefs(main) {
  const images = new Set();
  main.querySelectorAll('img[src]').forEach((i) => images.add(i.getAttribute('src')));
  main.querySelectorAll('source[srcset]').forEach((s) => s.getAttribute('srcset').split(',')
    .forEach((c) => images.add(c.trim().split(/\s+/)[0])));
  const videos = new Set();
  main.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (/\.mp4(\?|$)/i.test(href)) videos.add(href);
  });
  return { images: [...images], videos: [...videos] };
}

/** True when a URL is served by this site or its DA content (not another site). */
export function isOwn(url) {
  if (!/^https?:\/\//.test(url)) return true;
  const { host } = new URL(url);
  return host === 'content.da.live' || host.endsWith(`--${SITE}--${ORG}.aem.page`) || host.endsWith(`--${SITE}--${ORG}.aem.live`);
}

/** DA document body for a page: local media URLs mapped to DA. */
export function daDocument(main) {
  const clone = main.cloneNode(true);
  mapUrls(clone, (u) => localToDa(u));
  return `<body><header></header><main>${clone.innerHTML.trim()}</main><footer></footer></body>\n`;
}

/** <main> inner HTML of a DA document, or null when the page does not exist. */
export async function fetchDaMain(page) {
  const res = await fetch(`${DA_SOURCE}/${page}.html`, { headers: authHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`DA read ${page}: HTTP ${res.status}`);
  const { document } = new JSDOM(await res.text()).window;
  return document.querySelector('main');
}

export const contentType = (file) => ({
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.webp': 'image/webp', '.mp4': 'video/mp4', '.html': 'text/html', '.json': 'application/json',
}[path.extname(file).toLowerCase()] || 'application/octet-stream');

/** Upload a file (Buffer or string) to a DA source path. */
export async function daPut(daPath, body, type) {
  const form = new FormData();
  form.append('data', new Blob([body], { type }), path.basename(daPath));
  const res = await fetch(`${DA_SOURCE}/${daPath}`, { method: 'POST', body: form, headers: authHeaders() });
  if (!res.ok) throw new Error(`DA upload ${daPath}: HTTP ${res.status}`);
}

export async function daExists(daPath) {
  const res = await fetch(`${DA_SOURCE}/${daPath}`, { method: 'HEAD', headers: authHeaders() });
  return res.ok;
}

/** Preview a resource on Edge Delivery ("" is the home page). */
export async function preview(webPath) {
  const res = await fetch(`${ADMIN}/preview/${ORG}/${SITE}/${REF}/${webPath}`, { method: 'POST', headers: authHeaders() });
  if (!res.ok) throw new Error(`preview /${webPath}: HTTP ${res.status} ${res.headers.get('x-error') || ''}`.trim());
}

export function log(...args) {
  console.log(...args);
}
