/* eslint-disable */
/* global WebImporter */

import heroSplitParser from './parsers/hero-split.js';
import tabsUnderlineParser from './parsers/tabs-underline.js';
import cardsArticleParser from './parsers/cards-article.js';
import columnsMediaParser from './parsers/columns-media.js';
import carouselMediaParser from './parsers/carousel-media.js';
import jameshardieCleanupTransformer from './transformers/jameshardie-cleanup.js';
import jameshardieSectionsTransformer from './transformers/jameshardie-sections.js';

const PAGE_TEMPLATE = {
  "name": "blog-home",
  "description": "Main blog page (/blog): intro, featured split hero, topic navigation, latest article cards, text-image rows, Southern Living feature with photo carousel, closing call to action.",
  "urls": [
    "https://www.jameshardie.com/blog/"
  ],
  "blocks": [
    {
      "name": "hero-split",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/": [
          "#main-content > div:nth-child(2)",
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p > div.relative.pt-10.pb-12.lg\\:pt-12.lg\\:pb-16 > div.inner-container.flex.flex-col.lg\\:flex-row.items-start.lg\\:items-stretch.pb-8.lg\\:pb-4"
        ]
      }
    },
    {
      "name": "tabs-underline",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/": [
          "#main-content > div.flex.flex-col.m-auto.gap-5.lg\\:gap-4.mt-16.mb-12.max-w-\\[1440px\\] > ul",
          "#main-content > div:nth-child(4) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ]
      }
    },
    {
      "name": "cards-article",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/": [
          "#main-content > div:nth-child(4) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ]
      }
    },
    {
      "name": "columns-media",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between"
        ]
      }
    },
    {
      "name": "carousel-media",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/": [
          "#splide01"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "intro",
      "name": "Intro heading",
      "selector": [
        "#main-content > div.inner-container.pt-16"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "discover",
      "name": "Discover ideas",
      "selector": [
        "#main-content > div:nth-child(2)"
      ],
      "style": null,
      "blocks": [
        "hero-split"
      ],
      "defaultContent": []
    },
    {
      "id": "topics",
      "name": "Browse by topic",
      "selector": [
        "#main-content > div.flex.flex-col.m-auto"
      ],
      "style": null,
      "blocks": [
        "tabs-underline"
      ],
      "defaultContent": []
    },
    {
      "id": "latest",
      "name": "Latest articles",
      "selector": [
        "#main-content > div:nth-child(4)"
      ],
      "style": null,
      "blocks": [
        "tabs-underline",
        "cards-article"
      ],
      "defaultContent": []
    },
    {
      "id": "dream-home",
      "name": "Bring your dream home to life",
      "selector": [
        "#main-content > div.inner-container.pt-10"
      ],
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "southern-living",
      "name": "Southern Living feature",
      "selector": [
        "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p"
      ],
      "style": "stone",
      "blocks": [
        "hero-split",
        "carousel-media"
      ],
      "defaultContent": []
    },
    {
      "id": "first-step",
      "name": "Take the first step",
      "selector": [
        "#main-content > div.w-full.pt-10"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    }
  ],
  "pageCleanup": {
    "https://www.jameshardie.com/blog/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ]
  }
};

const parsers = {
  'hero-split': heroSplitParser,
  'tabs-underline': tabsUnderlineParser,
  'cards-article': cardsArticleParser,
  'columns-media': columnsMediaParser,
  'carousel-media': carouselMediaParser,
};
// Late transformers change the DOM (section <hr> markers, shared fragments), so their beforeTransform
// runs after block discovery.
const sectionTransformers = [jameshardieSectionsTransformer];
const fragmentTransformers = [];
const lateTransformers = [...sectionTransformers, ...fragmentTransformers];
const transformers = [jameshardieCleanupTransformer, jameshardieSectionsTransformer];
const earlyTransformers = transformers.filter((fn) => !lateTransformers.includes(fn));
// Catalog selectors (pageInstances, pageCleanup) count the <script> and <hr> elements the importer
// removes before transform, so a catalog template finds its targets in preprocess.
const CATALOG = Boolean(PAGE_TEMPLATE.pageCleanup || PAGE_TEMPLATE.blocks.some((b) => b.pageInstances));

function executeTransformers(hookName, element, payload, list = transformers) {
  const enhancedPayload = { ...payload, template: payload.params?.targets?.template || PAGE_TEMPLATE };
  list.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template, url) {
  const pageBlocks = [];
  const pageKey = (u) => {
    try { const { origin, pathname } = new URL(u); return `${origin}${pathname.replace(/\/$/, '')}`; }
    catch { return u; }
  };
  const key = pageKey(url);
  const claim = (blockDef, selector) => {
    let matches = [];
    try { matches = document.querySelectorAll(selector); } catch { return; }
    matches.forEach((element) => {
      if (pageBlocks.some((b) => b.element === element || b.element.contains(element) || element.contains(b.element))) return;
      pageBlocks.push({ name: blockDef.name, selector, element });
    });
  };
  template.blocks.forEach((blockDef) => {
    const entry = Object.entries(blockDef.pageInstances || {}).find(([u]) => pageKey(u) === key);
    (entry ? entry[1] : []).forEach((selector) => claim(blockDef, selector));
  });
  template.blocks.forEach((blockDef) => (blockDef.instances || []).forEach((selector) => claim(blockDef, selector)));
  return pageBlocks;
}

// Runs the early transformers, then marks each block and section target with an attribute: the
// importer re-creates the body before transform, so only attributes survive, not element references.
function markPageTargets(payload) {
  const { document, params } = payload;
  executeTransformers('beforeTransform', document.body, payload, earlyTransformers);
  const blocks = findBlocksOnPage(document, PAGE_TEMPLATE, params.originalURL).map(({ name, selector, element }, i) => {
    element.setAttribute('data-excat-block', String(i));
    return { name, selector };
  });
  const sections = (PAGE_TEMPLATE.sections || []).map((section, i) => {
    const target = (section.selector || []).map((s) => { try { return document.querySelector(s); } catch { return null; } }).find(Boolean);
    if (!target) return section;
    target.setAttribute('data-excat-section', String(i));
    return { ...section, selector: [`[data-excat-section="${i}"]`] };
  });
  params.targets = { blocks, template: { ...PAGE_TEMPLATE, sections } };
}

export default {
  preprocess: (payload) => {
    if (CATALOG) markPageTargets(payload);
  },
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;
    params.fragments = [];

    if (!params.targets) markPageTargets(payload);
    const pageBlocks = params.targets.blocks
      .map((block, i) => ({ ...block, element: document.querySelector(`[data-excat-block="${i}"]`) }))
      .filter((block) => block.element);
    executeTransformers('beforeTransform', main, { ...payload, pageBlocks }, lateTransformers);

    pageBlocks.forEach((block) => {
      if (!main.contains(block.element)) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // A fragment's nodes left `main` before afterTransform: finalize it the same way, without the
    // page-only section breaks and metadata.
    params.fragments.forEach(({ element }) => {
      executeTransformers('afterTransform', element, payload, earlyTransformers);
      WebImporter.rules.transformBackgroundImages(element, document);
      WebImporter.rules.adjustImageUrls(element, url, params.originalURL);
    });

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }, ...params.fragments];
  },
};

