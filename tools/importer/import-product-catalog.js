/* eslint-disable */
/* global WebImporter */

import cardsArticleParser from './parsers/cards-article.js';
import carouselCardsParser from './parsers/carousel-cards.js';
import tabsUnderlineParser from './parsers/tabs-underline.js';
import columnsMediaParser from './parsers/columns-media.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import cardsProductParser from './parsers/cards-product.js';
import productConfiguratorParser from './parsers/product-configurator.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import productSpecsParser from './parsers/product-specs.js';
import jameshardieCleanupTransformer from './transformers/jameshardie-cleanup.js';
import jameshardieSectionsTransformer from './transformers/jameshardie-sections.js';

const PAGE_TEMPLATE = {
  "name": "product-catalog",
  "urls": [
    "https://www.jameshardie.com/all-about-james-hardie/media-resources/",
    "https://www.jameshardie.com/blog/explore-exterior-design/",
    "https://www.jameshardie.com/blog/for-siding-pros/",
    "https://www.jameshardie.com/blog/siding-durability/",
    "https://www.jameshardie.com/blog/siding-project-planning/",
    "https://www.jameshardie.com/blog/siding-replacement/",
    "https://www.jameshardie.com/blog/siding-types/",
    "https://www.jameshardie.com/find-dealer-near-you/",
    "https://www.jameshardie.com/media-inquiry/",
    "https://www.jameshardie.com/product-catalog/",
    "https://www.jameshardie.com/product-catalog/accessories-siding-products/",
    "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/",
    "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/touch-up-kit/",
    "https://www.jameshardie.com/product-catalog/all-products/",
    "https://www.jameshardie.com/product-catalog/backer-board-products/",
    "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/1-4-cement-board/",
    "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/42-cement-board/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/fine-sand/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/mounded-sand/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/sea-grass/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/lap/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/shiplap/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/square-channel/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/v-groove/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/select-cedarmill/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/sierra-8/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/smooth/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/stucco/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-select-cedarmill/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-smooth/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-roughsawn/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-smooth/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/select-cedarmill/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/smooth/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/staggered-edge-panel/",
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/straight-edge-panel/",
    "https://www.jameshardie.com/product-catalog/moisture-management-products/",
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/",
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/flex-flashing/",
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/house-wrap/",
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/pro-flashing/",
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/seam-tape/",
    "https://www.jameshardie.com/product-catalog/soffit-products/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/select-cedarmill/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/smooth/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-cedarmill/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-smooth/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-select-cedarmill/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-smooth/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-select-cedarmill/",
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-smooth/",
    "https://www.jameshardie.com/product-catalog/trim-products/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/base-trims/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/corner-trims/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/joint-and-end-trims/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/transition-trims/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/smooth/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/rustic-grain/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/smooth-grain/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/roughsawn/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/rustic-grain/",
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/smooth/",
    "https://www.jameshardie.com/terms-conditions-purchase/"
  ],
  "description": "Product listing and detail page that opens with a centered dark heading, followed by product tiles, configurator, specs and related content",
  "blocks": [
    {
      "name": "cards-article",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/media-resources/": [
          "#splide01-track"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/": [
          "#main-content > div:nth-child(2) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6",
          "#hits-container > div > ol.flex.flex-row.gap-6.flex-wrap.justify-center"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/": [
          "#main-content > div:nth-child(2) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6",
          "#hits-container > div > ol.flex.flex-row.gap-6.flex-wrap.justify-center"
        ],
        "https://www.jameshardie.com/blog/siding-durability/": [
          "#main-content > div:nth-child(2) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6",
          "#hits-container > div > ol.flex.flex-row.gap-6.flex-wrap.justify-center"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/": [
          "#main-content > div:nth-child(2) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6",
          "#hits-container > div > ol.flex.flex-row.gap-6.flex-wrap.justify-center"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/": [
          "#main-content > div:nth-child(2) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6",
          "#hits-container > div > ol.flex.flex-row.gap-6.flex-wrap.justify-center"
        ],
        "https://www.jameshardie.com/blog/siding-types/": [
          "#hits-container > div > ol.flex.flex-row.gap-6.flex-wrap.justify-center"
        ]
      }
    },
    {
      "name": "carousel-cards",
      "instances": [
        "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/media-resources/": [
          "#splide01 > div.w-full.flex.justify-between.items-center.mt-6.lg\\:h-10"
        ],
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/touch-up-kit/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/1-4-cement-board/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/42-cement-board/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/fine-sand/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/mounded-sand/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/sea-grass/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/lap/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/shiplap/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/square-channel/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/v-groove/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/select-cedarmill/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/sierra-8/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/stucco/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-select-cedarmill/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-roughsawn/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/select-cedarmill/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/staggered-edge-panel/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/straight-edge-panel/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/flex-flashing/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/house-wrap/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/pro-flashing/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/seam-tape/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/select-cedarmill/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-cedarmill/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-select-cedarmill/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-select-cedarmill/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/base-trims/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/corner-trims/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/joint-and-end-trims/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/transition-trims/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/rustic-grain/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/smooth-grain/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/roughsawn/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/rustic-grain/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/smooth/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ]
      }
    },
    {
      "name": "tabs-underline",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/explore-exterior-design/": [
          "#hits-container > div > ol.flex.flex-row.flex-wrap.gap-2.mt-12.mb-4.justify-center.items-center"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/": [
          "#hits-container > div > ol.flex.flex-row.flex-wrap.gap-2.mt-12.mb-4.justify-center.items-center"
        ],
        "https://www.jameshardie.com/blog/siding-durability/": [
          "#hits-container > div > ol.flex.flex-row.flex-wrap.gap-2.mt-12.mb-4.justify-center.items-center"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/": [
          "#hits-container > div > ol.flex.flex-row.flex-wrap.gap-2.mt-12.mb-4.justify-center.items-center"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/": [
          "#hits-container > div > ol.flex.flex-row.flex-wrap.gap-2.mt-12.mb-4.justify-center.items-center"
        ],
        "https://www.jameshardie.com/blog/siding-types/": [
          "#hits-container > div > ol.flex.flex-row.flex-wrap.gap-2.mt-12.mb-4.justify-center.items-center"
        ],
        "https://www.jameshardie.com/product-catalog/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ],
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ],
        "https://www.jameshardie.com/product-catalog/all-products/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/": [
          "#main-content > div:nth-child(2) > div.w-full.md\\:max-w-\\[90rem\\].m-auto.pt-0.md\\:pb-0.flex.flex-col.items-center.justify-center.gap-14.md\\:gap-20"
        ]
      }
    },
    {
      "name": "columns-media",
      "instances": [
        "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure > div > div > div"
        ],
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/touch-up-kit/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/all-products/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure > div > div > div"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/1-4-cement-board/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/42-cement-board/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure > div > div > div"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/fine-sand/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/mounded-sand/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/sea-grass/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/lap/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/shiplap/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/square-channel/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/v-groove/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/select-cedarmill/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/sierra-8/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/stucco/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-select-cedarmill/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-roughsawn/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/select-cedarmill/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/staggered-edge-panel/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/straight-edge-panel/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/flex-flashing/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/house-wrap/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/pro-flashing/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/seam-tape/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/select-cedarmill/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/smooth/": [
          "#main-content > div:nth-child(3)",
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-cedarmill/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-select-cedarmill/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-select-cedarmill/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure > div > div > div"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/base-trims/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/corner-trims/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/joint-and-end-trims/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/transition-trims/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/rustic-grain/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/smooth-grain/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/roughsawn/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/rustic-grain/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/smooth/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20"
        ]
      }
    },
    {
      "name": "accordion-faq",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure > div > button"
        ],
        "https://www.jameshardie.com/product-catalog/all-products/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure > div > button"
        ]
      }
    },
    {
      "name": "cards-product",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/": [
          "#main-content > div:nth-child(2) > div.w-full.px-2.lg\\:px-20.pt-4.lg\\:pt-10.pb-10.lg\\:pb-12.md\\:py-10.bg-neutral-color-semi-pure"
        ]
      }
    },
    {
      "name": "product-configurator",
      "instances": [
        "#main-content > div.relative.flex.flex-col"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/touch-up-kit/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/1-4-cement-board/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/42-cement-board/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/fine-sand/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/mounded-sand/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/sea-grass/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/lap/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/shiplap/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/square-channel/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/v-groove/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/select-cedarmill/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/sierra-8/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/stucco/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-select-cedarmill/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-roughsawn/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/select-cedarmill/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/staggered-edge-panel/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/straight-edge-panel/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/flex-flashing/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/house-wrap/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/pro-flashing/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/seam-tape/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/select-cedarmill/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-cedarmill/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-select-cedarmill/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-select-cedarmill/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/base-trims/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/corner-trims/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/joint-and-end-trims/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/transition-trims/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/rustic-grain/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/smooth-grain/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/roughsawn/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/rustic-grain/": [
          "#main-content > div.relative.flex.flex-col"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/smooth/": [
          "#main-content > div.relative.flex.flex-col"
        ]
      }
    },
    {
      "name": "cards-feature",
      "instances": [
        "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/": [
          "#main-content > section.bg-neutral-color-pure.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/touch-up-kit/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/1-4-cement-board/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/42-cement-board/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/fine-sand/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/mounded-sand/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/sea-grass/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/lap/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/shiplap/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/square-channel/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/v-groove/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/select-cedarmill/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/sierra-8/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/stucco/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-select-cedarmill/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-roughsawn/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/select-cedarmill/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/staggered-edge-panel/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/straight-edge-panel/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/": [
          "#main-content > section.bg-neutral-color-pure.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/flex-flashing/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/house-wrap/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/pro-flashing/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/seam-tape/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/select-cedarmill/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-cedarmill/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-select-cedarmill/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-select-cedarmill/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/": [
          "#main-content > section.bg-neutral-color-pure.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/base-trims/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/corner-trims/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/joint-and-end-trims/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/transition-trims/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/rustic-grain/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/smooth-grain/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/roughsawn/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/rustic-grain/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/smooth/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ]
      }
    },
    {
      "name": "product-specs",
      "instances": [
        "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/touch-up-kit/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/1-4-cement-board/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/42-cement-board/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/fine-sand/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/mounded-sand/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/sea-grass/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/lap/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/shiplap/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/square-channel/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/v-groove/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/select-cedarmill/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/sierra-8/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/stucco/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-select-cedarmill/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-roughsawn/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/select-cedarmill/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/staggered-edge-panel/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/straight-edge-panel/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/flex-flashing/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/house-wrap/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/pro-flashing/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/seam-tape/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/select-cedarmill/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-cedarmill/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-select-cedarmill/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-select-cedarmill/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/ventedplus-smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/base-trims/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/corner-trims/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/joint-and-end-trims/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/transition-trims/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/rustic-grain/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/smooth-grain/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/roughsawn/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/rustic-grain/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ],
        "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/smooth/": [
          "#main-content > div.flex.flex-col.px-4.lg\\:px-0 > div > div > div.flex.flex-col.lg\\:flex-row.items-start.lg\\:px-20.gap-6.lg\\:gap-\\[135px\\]"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "product-intro",
      "name": "Product intro",
      "selector": [
        "#main-content > div.relative.flex.flex-col"
      ],
      "style": null,
      "blocks": [
        "product-configurator"
      ],
      "defaultContent": []
    },
    {
      "id": "product-details",
      "name": "Product details",
      "selector": [
        "#main-content > div.flex.flex-col.px-4"
      ],
      "style": null,
      "blocks": [
        "product-specs"
      ],
      "defaultContent": []
    },
    {
      "id": "hero-video",
      "name": "Video hero",
      "selector": [
        "#main-content > div.hero-video-overlay"
      ],
      "style": null,
      "blocks": [],
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
      "blocks": [],
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
        "carousel-cards",
        "cards-feature"
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
        "carousel-cards"
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
      "blocks": [],
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
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "dark-inline-1",
      "name": "Dark inline section 1",
      "selector": [
        "#main-content > div.w-full[style*=\"#333333\" i]"
      ],
      "style": "dark",
      "blocks": [],
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
      "blocks": [],
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
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "light-inline-2",
      "name": "Light inline section 2",
      "selector": [
        "#main-content > div.w-full[style*=\"#F6F5F3\" i] ~ div.w-full[style*=\"#F6F5F3\" i]"
      ],
      "style": "light",
      "blocks": [],
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
        "cards-article",
        "carousel-cards"
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
      "blocks": [],
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
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "padded-1",
      "name": "Padded section",
      "selector": [
        "#main-content > div.w-full.pt-10"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "slim",
      "name": "Slim content",
      "selector": [
        "#main-content > div.max-w-screen-1440p.slim"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "contained-1",
      "name": "Contained section",
      "selector": [
        "#main-content > div.max-w-screen-1440p.mx-auto.my-10"
      ],
      "style": null,
      "blocks": [],
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
    },
    {
      "id": "white-1",
      "name": "White section",
      "selector": [
        "#main-content > div.w-full.bg-white"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "white-2",
      "name": "White section 2",
      "selector": [
        "#main-content > div.w-full.bg-white ~ div.w-full.bg-white"
      ],
      "style": null,
      "blocks": [
        "tabs-underline",
        "columns-media",
        "accordion-faq",
        "cards-product"
      ],
      "defaultContent": []
    }
  ],
  "pageCleanup": {
    "https://www.jameshardie.com/blog/explore-exterior-design/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-replacement/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-types/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/find-dealer-near-you/": [
      "div.gm-style > div:nth-child(3)"
    ],
    "https://www.jameshardie.com/product-catalog/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/accessories-siding-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/accessories-siding-products/hardie-colorplus-touch-up-kits/touch-up-kit/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/all-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/backer-board-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/1-4-cement-board/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/42-cement-board/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/fine-sand/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/mounded-sand/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-architectural-panel-siding/sea-grass/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/lap/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/shiplap/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/square-channel/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-artisan-siding/v-groove/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/select-cedarmill/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/sierra-8/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/smooth/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-panel-siding/stucco/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-select-cedarmill/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/beaded-smooth/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-roughsawn/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/custom-colonial-smooth/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/select-cedarmill/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-plank-lap-siding/smooth/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/staggered-edge-panel/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/exterior-siding-products/hardie-shingle-siding/straight-edge-panel/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/moisture-management-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/flex-flashing/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/house-wrap/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/pro-flashing/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/moisture-management-products/weather-barrier-products/seam-tape/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/soffit-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/select-cedarmill/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-and-panel/smooth/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/non-vented-smooth/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/soffit-products/hardie-soffit-panels/vented-smooth/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/base-trims/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/corner-trims/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/joint-and-end-trims/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-architectural-trim/transition-trims/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-artisan-trim/smooth/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/rustic-grain/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-batten-boards/smooth-grain/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/roughsawn/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/rustic-grain/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/trim-products/hardie-trim-boards/smooth/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/terms-conditions-purchase/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ]
  }
};

const parsers = {
  'cards-article': cardsArticleParser,
  'carousel-cards': carouselCardsParser,
  'tabs-underline': tabsUnderlineParser,
  'columns-media': columnsMediaParser,
  'accordion-faq': accordionFaqParser,
  'cards-product': cardsProductParser,
  'product-configurator': productConfiguratorParser,
  'cards-feature': cardsFeatureParser,
  'product-specs': productSpecsParser,
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

