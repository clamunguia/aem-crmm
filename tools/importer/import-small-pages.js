/* eslint-disable */
/* global WebImporter */

import accordionFaqParser from './parsers/accordion-faq.js';
import cardsArticleParser from './parsers/cards-article.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsVideoParser from './parsers/cards-video.js';
import carouselCardsParser from './parsers/carousel-cards.js';
import carouselMediaParser from './parsers/carousel-media.js';
import carouselTestimonialParser from './parsers/carousel-testimonial.js';
import columnsMediaParser from './parsers/columns-media.js';
import columnsStatsParser from './parsers/columns-stats.js';
import heroBannerParser from './parsers/hero-banner.js';
import heroSplitParser from './parsers/hero-split.js';
import locationIndicatorParser from './parsers/location-indicator.js';
import quoteParser from './parsers/quote.js';
import tablePlainParser from './parsers/table-plain.js';
import tabsUnderlineParser from './parsers/tabs-underline.js';
import videoPosterParser from './parsers/video-poster.js';
import jameshardieCleanupTransformer from './transformers/jameshardie-cleanup.js';
import jameshardieSectionsTransformer from './transformers/jameshardie-sections.js';

const PAGE_TEMPLATE = {
  "name": "small-pages",
  "description": "Pages of the small catalog templates without forms (legal, sitemap, FAQ, safety resources, Why James Hardie sub-pages, landings). Page-specific catalog selectors only.",
  "urls": [
    "https://www.jameshardie.com/terms-conditions-purchase/",
    "https://www.jameshardie.com/alliance-brochure-download/",
    "https://www.jameshardie.com/status/maintenance/",
    "https://www.jameshardie.com/build-with-hardie/",
    "https://www.jameshardie.com/hardie-trim-over-installation-method/",
    "https://www.jameshardie.com/intuitive-edge-solutions/",
    "https://www.jameshardie.com/build-with-hardie/safety-resources/",
    "https://www.jameshardie.com/build-with-hardie/safety-resources/silica-safety-resources/",
    "https://www.jameshardie.com/faq/",
    "https://www.jameshardie.com/hardie-designer-sweepstakes/",
    "https://www.jameshardie.com/privacy-policy/",
    "https://www.jameshardie.com/impeckablehouse/",
    "https://www.jameshardie.com/installation-instructions-technical-docs/",
    "https://www.jameshardie.com/why-james-hardie/innovations-siding-products/",
    "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/",
    "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/",
    "https://www.jameshardie.com/sitemap/",
    "https://www.jameshardie.com/terms-conditions/"
  ],
  "blocks": [
    {
      "name": "accordion-faq",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6"
        ],
        "https://www.jameshardie.com/build-with-hardie/safety-resources/silica-safety-resources/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(7)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(3) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(3) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(7)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(8)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(9)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(10)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(11)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(12)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div"
        ],
        "https://www.jameshardie.com/faq/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(7)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(8)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(9)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(10)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(11)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(12)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(13)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(14)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(15)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(16)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(17)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(18)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(19)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(1) > div:nth-child(20)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(7)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(8)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(9)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(2) > div:nth-child(10)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(3) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(3) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(3) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(3) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(3) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(7)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(8)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(9)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(4) > div:nth-child(10)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(7)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(8)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(9)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(10)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(11)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(12)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(13)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(14)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(15)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(16)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(17)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(18)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(19)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(20)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(5) > div:nth-child(21)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(6) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(6) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(6) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(6) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(7) > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(7) > div:nth-child(3)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(7) > div:nth-child(4)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(7) > div:nth-child(5)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(7) > div:nth-child(6)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(7) > div:nth-child(7)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-4.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div:nth-child(7) > div:nth-child(8)"
        ],
        "https://www.jameshardie.com/installation-instructions-technical-docs/": [
          "#main-content > div.max-w-screen-1440p.mx-auto > div > section > div:nth-child(4) > div > ul:nth-child(3)"
        ]
      }
    },
    {
      "name": "cards-article",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/": [
          "#splide02-track"
        ],
        "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
          "#main-content > div:nth-child(9) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ],
        "https://www.jameshardie.com/intuitive-edge-solutions/": [
          "#main-content > div:nth-child(7) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ],
        "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/": [
          "#main-content > div:nth-child(6) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#splide03",
          "#splide04"
        ]
      }
    },
    {
      "name": "cards-feature",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/intuitive-edge-solutions/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/build-with-hardie/safety-resources/": [
          "#main-content > section.bg-neutral-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ]
      }
    },
    {
      "name": "cards-video",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/": [
          "#splide01"
        ],
        "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
          "#main-content > section > div > div"
        ]
      }
    },
    {
      "name": "carousel-cards",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/": [
          "#splide02 > div.w-full.flex.justify-between.items-center.mt-6.lg\\:h-10"
        ],
        "https://www.jameshardie.com/why-james-hardie/innovations-siding-products/": [
          "#main-content > div.w-full.pt-10.pb-12.lg\\:py-16"
        ],
        "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#main-content > div.w-full.pt-10.pb-12.lg\\:py-16"
        ]
      }
    },
    {
      "name": "carousel-media",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/impeckablehouse/": [
          "#splide01"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#splide01"
        ]
      }
    },
    {
      "name": "carousel-testimonial",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/impeckablehouse/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-8.lg\\:px-20.pt-10.pb-4 > div > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ],
        "https://www.jameshardie.com/why-james-hardie/innovations-siding-products/": [
          "#main-content > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#main-content > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ]
      }
    },
    {
      "name": "columns-media",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end.inner-container.my-16"
        ],
        "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)"
        ],
        "https://www.jameshardie.com/intuitive-edge-solutions/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)"
        ],
        "https://www.jameshardie.com/build-with-hardie/safety-resources/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between",
          "#main-content > section.flex.flex-col.lg\\:flex-row.justify-center"
        ],
        "https://www.jameshardie.com/impeckablehouse/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col",
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-8.lg\\:pb-8.lg\\:px-20.pt-4.pb-4",
          "#main-content > div:nth-child(7)",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end.inner-container.my-16"
        ],
        "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-10.sm\\:my-16",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end.inner-container.my-16"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end.inner-container.my-16",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-10.sm\\:my-16",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end.inner-container.my-10.sm\\:my-16"
        ]
      }
    },
    {
      "name": "columns-stats",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:px-20.pt-10.px-4 > div > div > ol"
        ],
        "https://www.jameshardie.com/why-james-hardie/innovations-siding-products/": [
          "#main-content > div.bg-neutral-color-low.max-w-screen-1440p.mx-auto.md\\:px-20 > ol"
        ]
      }
    },
    {
      "name": "hero-banner",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/intuitive-edge-solutions/": [
          "#main-content > div.base-container-background.bg-neutral-color-high.lg\\:pt-20.lg\\:px-20.pt-10.pb-10"
        ],
        "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/": [
          "#main-content > div.base-container-background.bg-neutral-color-high.lg\\:pt-20.lg\\:pb-8.lg\\:px-20.pt-10.pb-4"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#main-content > div.base-container-background.bg-neutral-color-high.lg\\:pt-20.lg\\:pb-8.lg\\:px-20.pt-10.pb-4"
        ]
      }
    },
    {
      "name": "hero-split",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/safety-resources/silica-safety-resources/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10"
        ],
        "https://www.jameshardie.com/faq/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10"
        ],
        "https://www.jameshardie.com/installation-instructions-technical-docs/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10"
        ],
        "https://www.jameshardie.com/sitemap/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10"
        ]
      }
    },
    {
      "name": "location-indicator",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/installation-instructions-technical-docs/": [
          "#main-content > div.max-w-screen-1440p.mx-auto > div > section > div:nth-child(14)"
        ]
      }
    },
    {
      "name": "quote",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/": [
          "#main-content > div.flex.flex-col.flex-col-reverse.lg\\:flex-row.justify-center.items-center.lg\\:gap-x-132p.py-12.px-9.lg\\:p-20.gap-y-6.lg\\:gap-y-unset"
        ],
        "https://www.jameshardie.com/why-james-hardie/innovations-siding-products/": [
          "#main-content > div.flex.flex-col.flex-col-reverse.lg\\:flex-row.justify-center.items-center.lg\\:gap-x-132p.py-12.px-9.lg\\:p-20.gap-y-6.lg\\:gap-y-unset"
        ]
      }
    },
    {
      "name": "table-plain",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/privacy-policy/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div > table:nth-child(43)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6 > div.lg\\:col-span-9 > div > table:nth-child(45)"
        ]
      }
    },
    {
      "name": "tabs-underline",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/build-with-hardie/": [
          "#main-content > div.max-w-screen-1440p.mx-auto.my-10.lg\\:my-12 > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.mb-6.lg\\:mb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
          "#main-content > div:nth-child(9) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8"
        ],
        "https://www.jameshardie.com/intuitive-edge-solutions/": [
          "#main-content > div:nth-child(7) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8"
        ],
        "https://www.jameshardie.com/impeckablehouse/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth"
        ],
        "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/": [
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
          "#main-content > div.max-w-screen-1440p.mx-auto.my-10.lg\\:my-12 > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.mb-6.lg\\:mb-8.px-4.lg\\:px-20",
          "#main-content > div:nth-child(8) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ]
      }
    },
    {
      "name": "video-poster",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
          "#main-content > div:nth-child(6) > div > div:nth-child(2)"
        ],
        "https://www.jameshardie.com/intuitive-edge-solutions/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-8.lg\\:pb-8.lg\\:px-20.pt-4.pb-10 > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ],
        "https://www.jameshardie.com/impeckablehouse/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:px-20.pb-10",
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-8.md\\:pb-28.lg\\:px-20.pt-4.pb-10 > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "hero-video",
      "name": "Video hero",
      "selector": [
        "#main-content > div.hero-video-overlay"
      ],
      "style": null,
      "blocks": [
        "hero-video"
      ],
      "defaultContent": []
    },
    {
      "id": "intro-split",
      "name": "Split intro",
      "selector": [
        "#main-content > div.lg\\:bg-secondary-color-low.lg\\:flex-row",
        "#main-content > section.horizontal-hero"
      ],
      "style": "light",
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "dark-1",
      "name": "Dark section",
      "selector": [
        "#main-content > .bg-neutral-color-high"
      ],
      "style": "dark",
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "dark-2",
      "name": "Dark section 2",
      "selector": [
        "#main-content > .bg-neutral-color-high ~ .bg-neutral-color-high"
      ],
      "style": "dark",
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "light-1",
      "name": "Light section",
      "selector": [
        "#main-content > .bg-secondary-color-low"
      ],
      "style": "light",
      "blocks": [
        "cards-feature",
        "cards-article",
        "tabs-underline"
      ],
      "defaultContent": []
    },
    {
      "id": "light-2",
      "name": "Light section 2",
      "selector": [
        "#main-content > .bg-secondary-color-low ~ .bg-secondary-color-low"
      ],
      "style": "light",
      "blocks": [
        "columns-media",
        "carousel-testimonial",
        "video-poster"
      ],
      "defaultContent": []
    },
    {
      "id": "light-3",
      "name": "Light section 3",
      "selector": [
        "#main-content > .bg-secondary-color-low ~ .bg-secondary-color-low ~ .bg-secondary-color-low"
      ],
      "style": "light",
      "blocks": [
        "carousel-testimonial"
      ],
      "defaultContent": []
    },
    {
      "id": "green-1",
      "name": "Brand green section",
      "selector": [
        "#main-content > .bg-primary-color-high"
      ],
      "style": "brand-green",
      "blocks": [
        "cards-article",
        "tabs-underline"
      ],
      "defaultContent": []
    },
    {
      "id": "green-2",
      "name": "Brand green section 2",
      "selector": [
        "#main-content > .bg-primary-color-high ~ .bg-primary-color-high"
      ],
      "style": "brand-green",
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "stone-1",
      "name": "Stone section",
      "selector": [
        "#main-content > .bg-secondary-color-pure"
      ],
      "style": "stone",
      "blocks": [
        "cards-video",
        "carousel-media"
      ],
      "defaultContent": []
    },
    {
      "id": "dark-inline-1",
      "name": "Dark inline section 1",
      "selector": [
        "#main-content > div.w-full[style*=\"#333333\" i]"
      ],
      "style": "dark",
      "blocks": [
        "columns-media",
        "hero-split"
      ],
      "defaultContent": []
    },
    {
      "id": "dark-inline-2",
      "name": "Dark inline section 2",
      "selector": [
        "#main-content > div.w-full[style*=\"#333333\" i] ~ div.w-full[style*=\"#333333\" i]"
      ],
      "style": "dark",
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "dark-inline-3",
      "name": "Dark inline section 3",
      "selector": [
        "#main-content > div.w-full[style*=\"#333333\" i] ~ div.w-full[style*=\"#333333\" i] ~ div.w-full[style*=\"#333333\" i]"
      ],
      "style": "dark",
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "stone-inline-1",
      "name": "Stone inline section 1",
      "selector": [
        "#main-content > div.w-full[style*=\"#D4CCC4\" i]"
      ],
      "style": "stone",
      "blocks": [
        "tabs-underline",
        "carousel-cards"
      ],
      "defaultContent": []
    },
    {
      "id": "stone-inline-2",
      "name": "Stone inline section 2",
      "selector": [
        "#main-content > div.w-full[style*=\"#D4CCC4\" i] ~ div.w-full[style*=\"#D4CCC4\" i]"
      ],
      "style": "stone",
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "light-inline-1",
      "name": "Light inline section 1",
      "selector": [
        "#main-content > div.w-full[style*=\"#F6F5F3\" i]"
      ],
      "style": "light",
      "blocks": [
        "tabs-underline",
        "gallery-mosaic",
        "columns-media",
        "hero-split"
      ],
      "defaultContent": []
    },
    {
      "id": "light-inline-2",
      "name": "Light inline section 2",
      "selector": [
        "#main-content > div.w-full[style*=\"#F6F5F3\" i] ~ div.w-full[style*=\"#F6F5F3\" i]"
      ],
      "style": "light",
      "blocks": [
        "tabs-underline",
        "cards-article"
      ],
      "defaultContent": []
    },
    {
      "id": "inner-1",
      "name": "Content section",
      "selector": [
        "#main-content > div.inner-container"
      ],
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "inner-2",
      "name": "Content section 2",
      "selector": [
        "#main-content > div.inner-container ~ div.inner-container"
      ],
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "text-image-1",
      "name": "Text and image",
      "selector": [
        "#main-content > div.textImageItem"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "text-image-2",
      "name": "Text and image 2",
      "selector": [
        "#main-content > div.textImageItem ~ div.textImageItem"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "transparent-1",
      "name": "Plain section",
      "selector": [
        "#main-content > div.base-container-background.bg-transparent",
        "#main-content > div.bg-transparent"
      ],
      "style": null,
      "blocks": [
        "embed-video",
        "cards-article"
      ],
      "defaultContent": []
    },
    {
      "id": "transparent-2",
      "name": "Plain section 2",
      "selector": [
        "#main-content > div.base-container-background.bg-transparent ~ div.base-container-background.bg-transparent"
      ],
      "style": null,
      "blocks": [
        "product-configurator",
        "accordion-faq"
      ],
      "defaultContent": []
    },
    {
      "id": "neutral-low",
      "name": "White section",
      "selector": [
        "#main-content > .bg-neutral-color-low",
        "#main-content > div.bg-white"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "wide-1",
      "name": "Wide section",
      "selector": [
        "#main-content > div.w-full.max-w-screen-1440p.m-auto"
      ],
      "style": null,
      "blocks": [
        "tabs-underline",
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "padded-1",
      "name": "Padded section",
      "selector": [
        "#main-content > div.w-full.pt-10"
      ],
      "style": null,
      "blocks": [
        "carousel-testimonial"
      ],
      "defaultContent": []
    },
    {
      "id": "slim",
      "name": "Slim content",
      "selector": [
        "#main-content > div.max-w-screen-1440p.slim"
      ],
      "style": null,
      "blocks": [
        "hero-split",
        "carousel-hotspot",
        "columns-intro"
      ],
      "defaultContent": []
    },
    {
      "id": "contained-1",
      "name": "Contained section",
      "selector": [
        "#main-content > div.max-w-screen-1440p.mx-auto.my-10"
      ],
      "style": null,
      "blocks": [
        "tabs-underline",
        "carousel-media"
      ],
      "defaultContent": []
    },
    {
      "id": "flex-plain",
      "name": "Plain flex section",
      "selector": [
        "#main-content > div.w-full.flex.flex-col.items-center.bg-transparent"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    }
  ],
  "pageCleanup": {
    "https://www.jameshardie.com/terms-conditions-purchase/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/alliance-brochure-download/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/status/maintenance/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/build-with-hardie/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#modal-base-stories-modal",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/hardie-trim-over-installation-method/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/intuitive-edge-solutions/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/build-with-hardie/safety-resources/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/build-with-hardie/safety-resources/silica-safety-resources/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/faq/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/hardie-designer-sweepstakes/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_aa6b0919-9720-4a14-8b04-4116776c7429"
    ],
    "https://www.jameshardie.com/privacy-policy/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/impeckablehouse/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/installation-instructions-technical-docs/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/why-james-hardie/innovations-siding-products/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/why-james-hardie/lifetime-value-siding-products/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/": [
      "#modal-base-stories-modal",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/sitemap/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/terms-conditions/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ]
  }
};

const parsers = {
  'accordion-faq': accordionFaqParser,
  'cards-article': cardsArticleParser,
  'cards-feature': cardsFeatureParser,
  'cards-video': cardsVideoParser,
  'carousel-cards': carouselCardsParser,
  'carousel-media': carouselMediaParser,
  'carousel-testimonial': carouselTestimonialParser,
  'columns-media': columnsMediaParser,
  'columns-stats': columnsStatsParser,
  'hero-banner': heroBannerParser,
  'hero-split': heroSplitParser,
  'location-indicator': locationIndicatorParser,
  'quote': quoteParser,
  'table-plain': tablePlainParser,
  'tabs-underline': tabsUnderlineParser,
  'video-poster': videoPosterParser,
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

// The catalog captured each FAQ question as its own accordion block: join consecutive tables of
// the same block (only whitespace between them) into one, keeping the first table's header row.
const MERGE_BLOCKS = ['accordion faq'];
function mergeAdjacentBlocks(root) {
  const header = (t) => (t.querySelector('tr')?.textContent || '').trim().toLowerCase().replace(/-/g, ' ');
  [...root.querySelectorAll('table')].forEach((table) => {
    if (!table.isConnected || !MERGE_BLOCKS.some((n) => header(table).startsWith(n))) return;
    let next = table.nextSibling;
    while (next) {
      if (next.nodeType === 3 && !next.textContent.trim()) { next = next.nextSibling; continue; }
      if (next.nodeType !== 1 || next.tagName !== 'TABLE' || header(next) !== header(table)) break;
      const body = table.querySelector('tbody') || table;
      [...next.querySelectorAll('tr')].slice(1).forEach((tr) => body.append(tr));
      const drop = next;
      next = next.nextSibling;
      drop.remove();
    }
  });
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

    mergeAdjacentBlocks(main);
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

