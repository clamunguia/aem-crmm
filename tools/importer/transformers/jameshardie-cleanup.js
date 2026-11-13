/* eslint-disable */
/* global WebImporter */

/**
 * James Hardie cleanup transformer.
 *
 * beforeTransform: only the catalog-captured removals (pageCleanup replay for
 * the current page, then catalog cleanup.rules[] outside main). Catalog
 * selectors were captured with the site chrome in place, so chrome stays
 * until afterTransform.
 *
 * afterTransform: chrome and non-authorable elements (header, footer, nav,
 * banners, chatbot, scripts/styles, iframes, tracking pixels).
 */

// catalog-template.json cleanup.rules[] (not available at import runtime, so inlined)
const CATALOG_RULES = [
  '[id*="onetrust"]',
  '[role="dialog"]',
  'body [class*="modal"]:not(nav *)',
];

function normalizeUrl(url) {
  if (!url) return '';
  let path = String(url).trim();
  try {
    const u = new URL(path, 'https://www.jameshardie.com');
    path = u.pathname;
  } catch (e) {
    path = path.replace(/^https?:\/\/[^/]+/i, '').split(/[?#]/)[0];
  }
  path = path.replace(/\/index\.html?$/i, '/').replace(/\.html?$/i, '');
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

function getPageUrl(document, payload) {
  const candidates = [
    payload && payload.params && payload.params.originalURL,
    payload && payload.url,
  ];
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) candidates.push(canonical.getAttribute('href'));
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) candidates.push(ogUrl.getAttribute('content'));
  return candidates.find((u) => typeof u === 'string' && u && !u.startsWith('about:')) || '';
}

function findPageCleanup(pageCleanup, pageUrl) {
  if (!pageCleanup || typeof pageCleanup !== 'object' || !pageUrl) return null;
  const target = normalizeUrl(pageUrl);
  const key = Object.keys(pageCleanup).find((k) => normalizeUrl(k) === target);
  return key ? pageCleanup[key] : null;
}

function safeQueryAll(root, selector) {
  try {
    return [...root.querySelectorAll(selector)];
  } catch (e) {
    return [];
  }
}

function removeAll(root, selectors) {
  selectors.forEach((sel) => safeQueryAll(root, sel).forEach((el) => el.remove()));
}

export default function transform(hookName, element, payload) {
  const document = (payload && payload.document) || element.ownerDocument || element;
  const template = (payload && payload.template) || {};

  if (hookName === 'beforeTransform') {
    // 1. Replay the page's catalog pageCleanup: remove only unique matches.
    const pageSelectors = findPageCleanup(template.pageCleanup, getPageUrl(document, payload));
    if (Array.isArray(pageSelectors)) {
      pageSelectors.forEach((sel) => {
        const matches = safeQueryAll(document, sel);
        if (matches.length === 1) matches[0].remove();
      });
    }

    // 2. Catalog cleanup rules, outside main only (e.g. late-loading consent popups).
    CATALOG_RULES.forEach((rule) => {
      safeQueryAll(document, rule)
        .filter((el) => !el.closest('main, #main-content'))
        .forEach((el) => el.remove());
    });
  }

  if (hookName === 'afterTransform') {
    // Site chrome
    removeAll(element, [
      'a[href="#main-content"]',
      '#announcementBanner',
      'header.globalHeader',
      'header',
      'nav.mainNav',
      'next-route-announcer',
      '#__next-route-announcer__',
      '#hb_chatbot-root',
      '#mktoStyleLoaded',
      '#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d',
      'div.knotch_ktag_placeholder',
      'div.swe_card_container_outer',
      // Sprinklr social wall chrome (loading text, empty state, load-more/new-post links)
      '.swe_loading',
      '.swe_no_content',
      '.swe_load_more',
      '[class*="swe_new_post"]',
      '.weglot-container',
      '.weglot_switcher',
      '[id^="weglot"]',
      '.language-option',
      '#hardiedesigner',
      '[id^="DfaVisibilityIdentifier"]',
      '[id^="batBeacon"]',
    ]);

    // Footer container (outside main) and off-canvas panels outside main
    safeQueryAll(element, 'div.bg-neutral-color-high, footer, div.fixed.h-full.w-full.right-0')
      .filter((el) => !el.closest('#main-content, main'))
      .forEach((el) => el.remove());

    // Non-authorable elements
    removeAll(element, ['script', 'style', 'noscript', 'iframe', 'link', 'object', 'embed']);

    // Links that go nowhere (widget controls such as the language switcher or "0 New Post(s)"),
    // and the paragraph they leave empty
    safeQueryAll(element, 'a[href=""], a[href="#"], a:not([href])')
      .filter((a) => !a.querySelector('img, picture, svg'))
      .forEach((a) => {
        const parent = a.parentElement;
        a.remove();
        if (parent && parent.tagName === 'P' && !parent.textContent.trim() && !parent.children.length) parent.remove();
      });

    // ZIP-code location readout ("Showing products for: 60601") from the dropped location service,
    // and loading placeholders left by client-side widgets
    safeQueryAll(element, 'h5, h6, p')
      .filter((el) => /^\s*(showing products for\s*:|loading\.{3}\s*$)/i.test(el.textContent))
      .forEach((el) => el.remove());

    // Empty wrappers left behind outside main (script/pixel containers)
    safeQueryAll(element, 'div')
      .filter((el) => !el.closest('#main-content, main') && !el.querySelector('main, #main-content')
        && !el.textContent.trim() && !el.querySelector('img, picture, video, svg'))
      .forEach((el) => el.remove());

    // Tracking pixels
    safeQueryAll(element, 'img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      const w = img.getAttribute('width');
      const h = img.getAttribute('height');
      const style = (img.getAttribute('style') || '').replace(/\s/g, '');
      if (
        /bat\.bing\.com|bidr\.io|abcsinsights\.com|doubleclick|facebook\.com\/tr|google-analytics|googletagmanager|px\.ads|pixel/i.test(src)
        || (w === '1' && h === '1')
        || (w === '0' && h === '0')
        || /width:0px;height:0px/.test(style)
      ) {
        img.remove();
      }
    });

    // Tracking / framework attributes
    safeQueryAll(element, '*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        const n = attr.name;
        if (
          n.startsWith('data-google-')
          || n.startsWith('data-jc')
          || n === 'data-creative-load-listener'
          || n === 'data-ueto'
          || n === 'data-nscript'
          || n === 'data-n-g'
          || n === 'data-n-p'
          || n === 'data-n-css'
          || n === 'onclick'
          || n === 'onload'
        ) {
          el.removeAttribute(n);
        }
      });
    });
  }
}
