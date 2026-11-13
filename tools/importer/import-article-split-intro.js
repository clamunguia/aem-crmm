/* eslint-disable */
/* global WebImporter */

import heroSplitParser from './parsers/hero-split.js';
import videoPosterParser from './parsers/video-poster.js';
import tabsUnderlineParser from './parsers/tabs-underline.js';
import columnsMediaParser from './parsers/columns-media.js';
import carouselCardsParser from './parsers/carousel-cards.js';
import cardsArticleParser from './parsers/cards-article.js';
import columnsCtaParser from './parsers/columns-cta.js';
import carouselTestimonialParser from './parsers/carousel-testimonial.js';
import heroBannerParser from './parsers/hero-banner.js';
import columnsStatsParser from './parsers/columns-stats.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import cardsVideoParser from './parsers/cards-video.js';
import imageLightboxParser from './parsers/image-lightbox.js';
import authorBioParser from './parsers/author-bio.js';
import embedVideoParser from './parsers/embed-video.js';
import quoteParser from './parsers/quote.js';
import tablePlainParser from './parsers/table-plain.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import galleryMosaicParser from './parsers/gallery-mosaic.js';
import colorSearchParser from './parsers/color-search.js';
import heroSearchParser from './parsers/hero-search.js';
import locationIndicatorParser from './parsers/location-indicator.js';
import carouselHotspotParser from './parsers/carousel-hotspot.js';
import jameshardieCleanupTransformer from './transformers/jameshardie-cleanup.js';
import jameshardieSectionsTransformer from './transformers/jameshardie-sections.js';

const PAGE_TEMPLATE = {
  "name": "article-split-intro",
  "urls": [
    "https://www.jameshardie.com/84-lumber/",
    "https://www.jameshardie.com/all-about-james-hardie/",
    "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/",
    "https://www.jameshardie.com/all-about-james-hardie/habitat-for-humanity/",
    "https://www.jameshardie.com/all-about-james-hardie/james-hardie-invitational/",
    "https://www.jameshardie.com/all-about-james-hardie/press-releases/",
    "https://www.jameshardie.com/all-about-james-hardie/sustainability-esg-initiatives/",
    "https://www.jameshardie.com/alliance/",
    "https://www.jameshardie.com/architect-design-resources/",
    "https://www.jameshardie.com/blog/explore-exterior-design/2025-color-of-the-year/",
    "https://www.jameshardie.com/blog/explore-exterior-design/7-exterior-home-renovations/",
    "https://www.jameshardie.com/blog/explore-exterior-design/a-guide-to-a-complete-exterior-by-james-hardie/",
    "https://www.jameshardie.com/blog/explore-exterior-design/bring-your-dream-home-to-life-instantly/",
    "https://www.jameshardie.com/blog/explore-exterior-design/color-of-the-year/",
    "https://www.jameshardie.com/blog/explore-exterior-design/creative-outdoor-spaces-with-hardie-siding/",
    "https://www.jameshardie.com/blog/explore-exterior-design/curb-appeal-landscaping/",
    "https://www.jameshardie.com/blog/explore-exterior-design/different-siding-styles-colors/",
    "https://www.jameshardie.com/blog/explore-exterior-design/dream-home-design/",
    "https://www.jameshardie.com/blog/explore-exterior-design/enhance-exterior-design-ideas/",
    "https://www.jameshardie.com/blog/explore-exterior-design/finishing-touches-selecting-siding-and-trim-for-a-whole-house-re-side/",
    "https://www.jameshardie.com/blog/explore-exterior-design/five-steps-to-transform-your-homes-exterior/",
    "https://www.jameshardie.com/blog/explore-exterior-design/guide-to-board-and-batten-siding/",
    "https://www.jameshardie.com/blog/explore-exterior-design/hardie-artisan-siding-provides-fresh-opportunity-for-elevated-exterior-design/",
    "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-elevates-the-exterior-design-of-the-2024-southern-living/",
    "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-using-the-new-to-save-the-old/",
    "https://www.jameshardie.com/blog/explore-exterior-design/hgtv-dream-house-sponsor/",
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-cape-cod/",
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-colonial/",
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-contemporary/",
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-craftsman/",
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial-midcentury-modern-style-ranch/",
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial/",
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-tudor/",
    "https://www.jameshardie.com/blog/explore-exterior-design/house-exterior-ideas/",
    "https://www.jameshardie.com/blog/explore-exterior-design/house-number-ideas/",
    "https://www.jameshardie.com/blog/explore-exterior-design/house-shutter-color-combinations-that-shine/",
    "https://www.jameshardie.com/blog/explore-exterior-design/house-siding-design-ideas/",
    "https://www.jameshardie.com/blog/explore-exterior-design/how-to-choose-house-and-roof-color-combination/",
    "https://www.jameshardie.com/blog/explore-exterior-design/how-to-pick-a-front-door-color-that-makes-a-statement/",
    "https://www.jameshardie.com/blog/explore-exterior-design/hybrid-home-styles/",
    "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-at-international-builders-show/",
    "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-exterior-design-week-winners-2025/",
    "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-is-a-proud-sponsor-of-hgtv-dream-home-2025/",
    "https://www.jameshardie.com/blog/explore-exterior-design/kim-wolfe-offers-homeowners-guidance-for-modern-home-design/",
    "https://www.jameshardie.com/blog/explore-exterior-design/lake-minnetonka-neighborhood-gets-a-makeover-featuring-a-complete-exterior/",
    "https://www.jameshardie.com/blog/explore-exterior-design/making-a-southern-home/",
    "https://www.jameshardie.com/blog/explore-exterior-design/mixing-siding-styles-best-combinations-for-a-beautiful-exterior/",
    "https://www.jameshardie.com/blog/explore-exterior-design/modern-farmhouse-style/",
    "https://www.jameshardie.com/blog/explore-exterior-design/most-popular-house-colors/",
    "https://www.jameshardie.com/blog/explore-exterior-design/practical-tips-to-choose-the-perfect-home-exterior/",
    "https://www.jameshardie.com/blog/explore-exterior-design/preserving-historical-aesthetics-with-james-hardie/",
    "https://www.jameshardie.com/blog/explore-exterior-design/preserving-history-with-modern-materials/",
    "https://www.jameshardie.com/blog/explore-exterior-design/siding-and-trim-color-combinations/",
    "https://www.jameshardie.com/blog/explore-exterior-design/siding-combinations-for-brick-and-stone-houses/",
    "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-idea-house-2026/",
    "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-nashville-idea-house/",
    "https://www.jameshardie.com/blog/explore-exterior-design/the-hardie-architectural-collection-your-home-your-style/",
    "https://www.jameshardie.com/blog/explore-exterior-design/the-perch-premium-siding-for-a-one-of-a-kind-treehouse-stay/",
    "https://www.jameshardie.com/blog/explore-exterior-design/the-perfect-match-merging-original-brick-with-modern-siding/",
    "https://www.jameshardie.com/blog/explore-exterior-design/timeless-appeal-for-southern-living-2025-idea-house/",
    "https://www.jameshardie.com/blog/exterior-design/affordable-housing-project-uses-hardie-products-to-achieve-high-exterior-design/",
    "https://www.jameshardie.com/blog/exterior-design/how-james-hardie-is-defining-whats-next-in-homebuilding/",
    "https://www.jameshardie.com/blog/for-siding-pros/10-fundamentals-for-siding-installation-efficiency/",
    "https://www.jameshardie.com/blog/for-siding-pros/a-colorfully-modern-twist-on-tradition/",
    "https://www.jameshardie.com/blog/for-siding-pros/best-practices-for-home-construction-that-resists-moisture-damage/",
    "https://www.jameshardie.com/blog/for-siding-pros/blending-traditional-exteriors-with-modern-trends/",
    "https://www.jameshardie.com/blog/for-siding-pros/business-tips-for-the-off-season/",
    "https://www.jameshardie.com/blog/for-siding-pros/contractor-certified-why-pros-choose-hardie/",
    "https://www.jameshardie.com/blog/for-siding-pros/contractor-switching-from-vinyl-to-james-hardie/",
    "https://www.jameshardie.com/blog/for-siding-pros/elements-of-a-successful-streetscape/",
    "https://www.jameshardie.com/blog/for-siding-pros/exterior-design-week-recognizing-excellence/",
    "https://www.jameshardie.com/blog/for-siding-pros/grow-your-contractor-business-with-the-contractor-alliance-program/",
    "https://www.jameshardie.com/blog/for-siding-pros/grow-your-siding-contractor-business-with-in-home-selling-solutions/",
    "https://www.jameshardie.com/blog/for-siding-pros/hardie-products-with-colorplus-technology-finishes-helping-builders/",
    "https://www.jameshardie.com/blog/for-siding-pros/hardie-trim-over-method/",
    "https://www.jameshardie.com/blog/for-siding-pros/home-built-on-trust-and-quality-david-weekley-homes-james-hardie/",
    "https://www.jameshardie.com/blog/for-siding-pros/home-built-to-withstand-a-hurricane/",
    "https://www.jameshardie.com/blog/for-siding-pros/house-before-and-after/",
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardie-architectural-panels/",
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-floors/",
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-walls/",
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-staggered-edge-hardieshingle/",
    "https://www.jameshardie.com/blog/for-siding-pros/james-hardie-2026-international-builders-show/",
    "https://www.jameshardie.com/blog/for-siding-pros/jb-west-roofing-trim-over-method/",
    "https://www.jameshardie.com/blog/for-siding-pros/multi-family-bold-design-equitable-housing/",
    "https://www.jameshardie.com/blog/for-siding-pros/myth-busting-separating-myth-from-fact-about-wood-frame-construction/",
    "https://www.jameshardie.com/blog/for-siding-pros/navigating-the-new-colorado-wildfire-resiliency-code/",
    "https://www.jameshardie.com/blog/for-siding-pros/number-one-siding-install-mistake/",
    "https://www.jameshardie.com/blog/for-siding-pros/stronger-rooflines-stronger-margins-all-american-renovations/",
    "https://www.jameshardie.com/blog/for-siding-pros/summer-jobsite-safety-tips/",
    "https://www.jameshardie.com/blog/for-siding-pros/the-risinger-build-austin-featuring-hardie-artisan-siding/",
    "https://www.jameshardie.com/blog/for-siding-pros/tips-for-installing-james-hardie-lap-siding/",
    "https://www.jameshardie.com/blog/for-siding-pros/tools-to-install-hardie-products/",
    "https://www.jameshardie.com/blog/for-siding-pros/why-wood-frame-construction-is-the-resilient-choice-for-florida-homes/",
    "https://www.jameshardie.com/blog/for-siding-pros/working-the-neighborhood-radius-marketing-nets-results/",
    "https://www.jameshardie.com/blog/home-siding-care/christmas-lights-siding/",
    "https://www.jameshardie.com/blog/siding-durability/2024-green-builder-sustainable-products-of-the-year-hardie-artisan-lap/",
    "https://www.jameshardie.com/blog/siding-durability/2025-green-builder-sustainable-products-of-the-year-hardie-artisan-trim/",
    "https://www.jameshardie.com/blog/siding-durability/6-cabins-3-days-james-hardie-helps-camp-rainbow-gold-expand/",
    "https://www.jameshardie.com/blog/siding-durability/any-look-any-style/",
    "https://www.jameshardie.com/blog/siding-durability/best-siding-for-cold-winter-climates/",
    "https://www.jameshardie.com/blog/siding-durability/building-a-culture-of-sustainability/",
    "https://www.jameshardie.com/blog/siding-durability/building-for-texas-durability-meets-design-with-hardie-siding/",
    "https://www.jameshardie.com/blog/siding-durability/building-for-the-future-queen-of-zero-demonstrates-whats-possible/",
    "https://www.jameshardie.com/blog/siding-durability/building-homes-that-endure-how-top-alabama-builders-elevate-communities-with-james-hardie/",
    "https://www.jameshardie.com/blog/siding-durability/building-resilience-and-engineered-for-climate/",
    "https://www.jameshardie.com/blog/siding-durability/climate-engineered-siding/",
    "https://www.jameshardie.com/blog/siding-durability/durability-and-beauty-together/",
    "https://www.jameshardie.com/blog/siding-durability/durability-is-sustainability-vision-house-Sussex/",
    "https://www.jameshardie.com/blog/siding-durability/eco-friendly-home-sustainable-materials/",
    "https://www.jameshardie.com/blog/siding-durability/fire-demonstration/",
    "https://www.jameshardie.com/blog/siding-durability/fire-resistant-siding-helped-protect-this-home-from-extreme-weather/",
    "https://www.jameshardie.com/blog/siding-durability/home-exterior-hurricane-prep/",
    "https://www.jameshardie.com/blog/siding-durability/hot-climate-siding/",
    "https://www.jameshardie.com/blog/siding-durability/james-hardie-recognized-as-2024-eco-leader-by-green-builder/",
    "https://www.jameshardie.com/blog/siding-durability/mariposa-meadows-relies-on-durable-siding/",
    "https://www.jameshardie.com/blog/siding-durability/matt-risinger-talks-durability-with-james-hardie/",
    "https://www.jameshardie.com/blog/siding-durability/prepare-your-home-for-winter-essential-exterior-maintenance-tips/",
    "https://www.jameshardie.com/blog/siding-durability/prevent-damage-with-siding-that-doesnt-appeal-to-pests/",
    "https://www.jameshardie.com/blog/siding-durability/standing-strong-in-the-west-complete-exterior-by-james-hardie-protects/",
    "https://www.jameshardie.com/blog/siding-durability/the-role-of-siding-in-resiliency-planning-ask-the-expert/",
    "https://www.jameshardie.com/blog/siding-durability/three-homes-three-climates-three-sustainable-solutions/",
    "https://www.jameshardie.com/blog/siding-durability/tips-for-cleaning-your-siding/",
    "https://www.jameshardie.com/blog/siding-durability/vision-house-austin-built-for-resilience/",
    "https://www.jameshardie.com/blog/siding-durability/weather-resistant-siding/",
    "https://www.jameshardie.com/blog/siding-project-planning/10-top-tips-how-to-get-ready-for-an-exterior-siding-project/",
    "https://www.jameshardie.com/blog/siding-project-planning/guiding-first-time-home-buyers-dr-horton-james-hardie/",
    "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-firefighter-first-responder-rebate/",
    "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-military-product-rebate-program/",
    "https://www.jameshardie.com/blog/siding-project-planning/how-much-does-siding-replacement-cost/",
    "https://www.jameshardie.com/blog/siding-project-planning/how-to-choose-a-siding-contractor/",
    "https://www.jameshardie.com/blog/siding-project-planning/how-to-get-the-best-return-on-investment-for-a-major-exterior-remodel/",
    "https://www.jameshardie.com/blog/siding-project-planning/how-to-prepare-for-your-first-contractor-meeting/",
    "https://www.jameshardie.com/blog/siding-project-planning/plan-a-siding-project/",
    "https://www.jameshardie.com/blog/siding-project-planning/siding-home-value/",
    "https://www.jameshardie.com/blog/siding-project-planning/siding-terminology-101/",
    "https://www.jameshardie.com/blog/siding-project-planning/tips-for-choosing-a-contractor/",
    "https://www.jameshardie.com/blog/siding-project-planning/which-backer-board-is-right-for-my-project/",
    "https://www.jameshardie.com/blog/siding-replacement/best-time-of-year-siding-replacement/",
    "https://www.jameshardie.com/blog/siding-replacement/considering-material-values/",
    "https://www.jameshardie.com/blog/siding-replacement/decide-to-re-side/",
    "https://www.jameshardie.com/blog/siding-replacement/from-stucco-to-hardie-fiber-cement-re-side/",
    "https://www.jameshardie.com/blog/siding-replacement/not-all-fiber-cement-siding-is-hardie-siding/",
    "https://www.jameshardie.com/blog/siding-replacement/what-to-expect-during-your-siding-project/",
    "https://www.jameshardie.com/blog/siding-types/colorplus-technology-finishes-by-james-hardie-the-facts-behind-the-finish/",
    "https://www.jameshardie.com/blog/siding-types/different-types-of-siding/",
    "https://www.jameshardie.com/blog/siding-types/essential-siding-styles/",
    "https://www.jameshardie.com/blog/siding-types/fiber-cement-siding-as-a-masonry-alternative/",
    "https://www.jameshardie.com/blog/siding-types/what-is-fiber-cement-siding/",
    "https://www.jameshardie.com/build-with-hardie/training-and-support/",
    "https://www.jameshardie.com/color-design-guidance/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/",
    "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/",
    "https://www.jameshardie.com/contractor-kit-confirmation/",
    "https://www.jameshardie.com/dream-collection-colors/",
    "https://www.jameshardie.com/find-a-contractor/",
    "https://www.jameshardie.com/florida-realtor-guide/",
    "https://www.jameshardie.com/form-confirmation/",
    "https://www.jameshardie.com/get-an-estimate/",
    "https://www.jameshardie.com/hardie-honors-rebate-program/",
    "https://www.jameshardie.com/hardie-zone-system/",
    "https://www.jameshardie.com/hardiebacker-support/",
    "https://www.jameshardie.com/pros-hub/",
    "https://www.jameshardie.com/re-side-process/",
    "https://www.jameshardie.com/request-for-inspiration/",
    "https://www.jameshardie.com/request-james-hardie-catalog/",
    "https://www.jameshardie.com/request-quote-confirmation/",
    "https://www.jameshardie.com/request-re-side-guide/",
    "https://www.jameshardie.com/request-siding-samples/",
    "https://www.jameshardie.com/request-timberhue-collection-catalog/",
    "https://www.jameshardie.com/request-trim-over-toolkit/",
    "https://www.jameshardie.com/start-your-siding-project/",
    "https://www.jameshardie.com/statement-collection-colors/",
    "https://www.jameshardie.com/sustainability-rating-request/",
    "https://www.jameshardie.com/timberhue-collection-colors/",
    "https://www.jameshardie.com/trim-over-form-confirmation/",
    "https://www.jameshardie.com/why-james-hardie/",
    "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/"
  ],
  "description": "Content page that opens with a side-by-side image and text intro, followed by long-form body sections; used by blog articles and editorial pages",
  "blocks": [
    {
      "name": "hero-split",
      "instances": [
        "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/84-lumber/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/habitat-for-humanity/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/james-hardie-invitational/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/sustainability-esg-initiatives/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/alliance/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/architect-design-resources/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/2025-color-of-the-year/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/7-exterior-home-renovations/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/a-guide-to-a-complete-exterior-by-james-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/bring-your-dream-home-to-life-instantly/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/color-of-the-year/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/creative-outdoor-spaces-with-hardie-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/curb-appeal-landscaping/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/different-siding-styles-colors/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/dream-home-design/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/enhance-exterior-design-ideas/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/finishing-touches-selecting-siding-and-trim-for-a-whole-house-re-side/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/five-steps-to-transform-your-homes-exterior/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/guide-to-board-and-batten-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-artisan-siding-provides-fresh-opportunity-for-elevated-exterior-design/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-elevates-the-exterior-design-of-the-2024-southern-living/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-using-the-new-to-save-the-old/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hgtv-dream-house-sponsor/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-cape-cod/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-colonial/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-contemporary/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-craftsman/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial-midcentury-modern-style-ranch/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-tudor/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-exterior-ideas/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-number-ideas/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-shutter-color-combinations-that-shine/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-siding-design-ideas/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/how-to-choose-house-and-roof-color-combination/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/how-to-pick-a-front-door-color-that-makes-a-statement/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hybrid-home-styles/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-at-international-builders-show/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-exterior-design-week-winners-2025/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-is-a-proud-sponsor-of-hgtv-dream-home-2025/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/kim-wolfe-offers-homeowners-guidance-for-modern-home-design/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/lake-minnetonka-neighborhood-gets-a-makeover-featuring-a-complete-exterior/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/making-a-southern-home/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/mixing-siding-styles-best-combinations-for-a-beautiful-exterior/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/modern-farmhouse-style/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/most-popular-house-colors/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/practical-tips-to-choose-the-perfect-home-exterior/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/preserving-historical-aesthetics-with-james-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/preserving-history-with-modern-materials/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/siding-and-trim-color-combinations/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/siding-combinations-for-brick-and-stone-houses/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-nashville-idea-house/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-hardie-architectural-collection-your-home-your-style/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-perch-premium-siding-for-a-one-of-a-kind-treehouse-stay/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-perfect-match-merging-original-brick-with-modern-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/timeless-appeal-for-southern-living-2025-idea-house/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/exterior-design/affordable-housing-project-uses-hardie-products-to-achieve-high-exterior-design/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/exterior-design/how-james-hardie-is-defining-whats-next-in-homebuilding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/10-fundamentals-for-siding-installation-efficiency/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/a-colorfully-modern-twist-on-tradition/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/best-practices-for-home-construction-that-resists-moisture-damage/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/blending-traditional-exteriors-with-modern-trends/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/business-tips-for-the-off-season/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/contractor-certified-why-pros-choose-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/contractor-switching-from-vinyl-to-james-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/elements-of-a-successful-streetscape/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/exterior-design-week-recognizing-excellence/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/grow-your-contractor-business-with-the-contractor-alliance-program/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/grow-your-siding-contractor-business-with-in-home-selling-solutions/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/hardie-products-with-colorplus-technology-finishes-helping-builders/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/home-built-on-trust-and-quality-david-weekley-homes-james-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/home-built-to-withstand-a-hurricane/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/house-before-and-after/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardie-architectural-panels/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-floors/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-walls/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-staggered-edge-hardieshingle/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/james-hardie-2026-international-builders-show/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/multi-family-bold-design-equitable-housing/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/myth-busting-separating-myth-from-fact-about-wood-frame-construction/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/navigating-the-new-colorado-wildfire-resiliency-code/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/number-one-siding-install-mistake/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/stronger-rooflines-stronger-margins-all-american-renovations/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/summer-jobsite-safety-tips/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/the-risinger-build-austin-featuring-hardie-artisan-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/tips-for-installing-james-hardie-lap-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/tools-to-install-hardie-products/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/why-wood-frame-construction-is-the-resilient-choice-for-florida-homes/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/working-the-neighborhood-radius-marketing-nets-results/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/home-siding-care/christmas-lights-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/2024-green-builder-sustainable-products-of-the-year-hardie-artisan-lap/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/2025-green-builder-sustainable-products-of-the-year-hardie-artisan-trim/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/6-cabins-3-days-james-hardie-helps-camp-rainbow-gold-expand/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/any-look-any-style/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/best-siding-for-cold-winter-climates/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-a-culture-of-sustainability/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-for-the-future-queen-of-zero-demonstrates-whats-possible/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-homes-that-endure-how-top-alabama-builders-elevate-communities-with-james-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-resilience-and-engineered-for-climate/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/durability-and-beauty-together/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/durability-is-sustainability-vision-house-Sussex/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/eco-friendly-home-sustainable-materials/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/fire-demonstration/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/fire-resistant-siding-helped-protect-this-home-from-extreme-weather/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/home-exterior-hurricane-prep/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/hot-climate-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/james-hardie-recognized-as-2024-eco-leader-by-green-builder/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/mariposa-meadows-relies-on-durable-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/matt-risinger-talks-durability-with-james-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/prepare-your-home-for-winter-essential-exterior-maintenance-tips/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/prevent-damage-with-siding-that-doesnt-appeal-to-pests/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/standing-strong-in-the-west-complete-exterior-by-james-hardie-protects/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/the-role-of-siding-in-resiliency-planning-ask-the-expert/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/three-homes-three-climates-three-sustainable-solutions/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/tips-for-cleaning-your-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/vision-house-austin-built-for-resilience/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/weather-resistant-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/10-top-tips-how-to-get-ready-for-an-exterior-siding-project/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/guiding-first-time-home-buyers-dr-horton-james-hardie/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-firefighter-first-responder-rebate/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-military-product-rebate-program/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-much-does-siding-replacement-cost/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-choose-a-siding-contractor/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-get-the-best-return-on-investment-for-a-major-exterior-remodel/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-prepare-for-your-first-contractor-meeting/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/plan-a-siding-project/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/siding-home-value/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/siding-terminology-101/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/tips-for-choosing-a-contractor/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/which-backer-board-is-right-for-my-project/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/best-time-of-year-siding-replacement/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/considering-material-values/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/decide-to-re-side/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/from-stucco-to-hardie-fiber-cement-re-side/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/not-all-fiber-cement-siding-is-hardie-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/what-to-expect-during-your-siding-project/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-types/colorplus-technology-finishes-by-james-hardie-the-facts-behind-the-finish/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-types/different-types-of-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-types/essential-siding-styles/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-types/fiber-cement-siding-as-a-masonry-alternative/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-types/what-is-fiber-cement-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/color-design-guidance/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/dream-collection-colors/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/florida-realtor-guide/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/re-side-process/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/request-siding-samples/": [
          "#main-content > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#main-content > div:nth-child(1)",
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.slim.\\[\\&\\>div\\:first-of-type\\]\\:hidden > div.relative.py-10.lg\\:py-12 > div.inner-container.flex.flex-col.lg\\:flex-row.items-start.lg\\:items-stretch.pb-6.lg\\:pb-8"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/why-james-hardie/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/": [
          "#main-content > div:nth-child(1)",
          "#main-content > div:nth-child(4)",
          "#main-content > div:nth-child(8)"
        ]
      }
    },
    {
      "name": "video-poster",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/84-lumber/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/habitat-for-humanity/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/james-hardie-invitational/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ],
        "https://www.jameshardie.com/alliance/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-8.pt-10.pb-4.px-4 > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/": [
          "#main-content > div:nth-child(2) > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ]
      }
    },
    {
      "name": "tabs-underline",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/": [
          "#main-content > div.bg-secondary-color-low.max-w-screen-1440p.mx-auto.md\\:px-20 > ol",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/": [
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/habitat-for-humanity/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/press-releases/": [
          "#main-content > div.flex.flex-col.m-auto.gap-5.lg\\:gap-4.mt-16.mb-12.max-w-\\[1440px\\] > ul",
          "#main-content > div:nth-child(3) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8",
          "#main-content > div:nth-child(4) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20",
          "#main-content > div:nth-child(7) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/alliance/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col",
          "#main-content > div:nth-child(11) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/hardie-trim-over-method/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/jb-west-roofing-trim-over-method/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/color-design-guidance/": [
          "#main-content > div:nth-child(7) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(5) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(5) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.w-full.lg\\:px-20.flex.flex-col.lg\\:flex-row.lg\\:justify-between.gap-6",
          "#main-content > div:nth-child(5) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/contractor-kit-confirmation/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/dream-collection-colors/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.max-w-screen-1440p.mt-\\[-0\\.5rem\\].md\\:mt-0.pt-0.md\\:pt-10.mb-\\[-1rem\\].md\\:mb-0.px-4.md\\:px-20",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div:nth-child(2) > div.hidden.md\\:flex.flex-row.flex-wrap.gap-4.mb-12",
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/find-a-contractor/": [
          "#main-content > div:nth-child(6) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8"
        ],
        "https://www.jameshardie.com/form-confirmation/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/hardie-honors-rebate-program/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col"
        ],
        "https://www.jameshardie.com/hardie-zone-system/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:px-20.px-20 > div > div > ol",
          "#main-content > div:nth-child(5) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/pros-hub/": [
          "#main-content > div:nth-child(5) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8"
        ],
        "https://www.jameshardie.com/re-side-process/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth"
        ],
        "https://www.jameshardie.com/request-for-inspiration/": [
          "#main-content > div.bg-transparent.max-w-screen-1440p.mx-auto.md\\:px-20 > ol"
        ],
        "https://www.jameshardie.com/request-james-hardie-catalog/": [
          "#main-content > div.bg-transparent.max-w-screen-1440p.mx-auto.md\\:px-20 > ol"
        ],
        "https://www.jameshardie.com/request-quote-confirmation/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/request-re-side-guide/": [
          "#main-content > div.bg-transparent.max-w-screen-1440p.mx-auto.md\\:px-20 > ol"
        ],
        "https://www.jameshardie.com/request-siding-samples/": [
          "#main-content > div:nth-child(11) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#main-content > div:nth-child(12) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20",
          "#main-content > div:nth-child(13) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#main-content > div:nth-child(8) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#main-content > div:nth-child(9) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/trim-over-form-confirmation/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-8.lg\\:px-28.pt-4.pb-10.px-4 > div > div > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth"
        ]
      }
    },
    {
      "name": "columns-media",
      "instances": [
        "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16",
        "#main-content > div.w-full.h-full.bg-secondary-color-low",
        "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between",
        "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(2)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(4)"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/habitat-for-humanity/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(2)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(4)"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/james-hardie-invitational/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/sustainability-esg-initiatives/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:px-28.px-4 > div > div:nth-child(2)",
          "#main-content > div.base-container-background.bg-transparent.lg\\:px-28.px-4 > div > div:nth-child(3)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(2)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(4)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(5)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(6)"
        ],
        "https://www.jameshardie.com/alliance/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(2)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(4)"
        ],
        "https://www.jameshardie.com/architect-design-resources/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between",
          "#main-content > div:nth-child(9)"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-idea-house-2026/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-for-texas-durability-meets-design-with-hardie-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/blog/siding-durability/climate-engineered-siding/": [
          "#main-content > div.max-w-\\[1440px\\].mb-\\[2\\.5rem\\].lg\\:mb-\\[3rem\\].mx-auto.lg\\:bg-secondary-color-low.flex.flex-col.lg\\:flex-row.lg\\:items-center.overflow-hidden.lg\\:h-\\[664px\\]"
        ],
        "https://www.jameshardie.com/build-with-hardie/training-and-support/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between"
        ],
        "https://www.jameshardie.com/color-design-guidance/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-16"
        ],
        "https://www.jameshardie.com/dream-collection-colors/": [
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/find-a-contractor/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-10.sm\\:my-16"
        ],
        "https://www.jameshardie.com/florida-realtor-guide/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between"
        ],
        "https://www.jameshardie.com/get-an-estimate/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/hardie-zone-system/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between"
        ],
        "https://www.jameshardie.com/hardiebacker-support/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/pros-hub/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(2)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(4)"
        ],
        "https://www.jameshardie.com/request-for-inspiration/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/request-james-hardie-catalog/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/request-re-side-guide/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/request-timberhue-collection-catalog/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/request-trim-over-toolkit/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#main-content > div:nth-child(5)"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#main-content > div:nth-child(6)"
        ],
        "https://www.jameshardie.com/sustainability-rating-request/": [
          "#main-content > div.w-full.h-full.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#main-content > div:nth-child(6)"
        ],
        "https://www.jameshardie.com/why-james-hardie/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(2)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(4)"
        ]
      }
    },
    {
      "name": "carousel-cards",
      "instances": [
        "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low",
        "#main-content > section"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/press-releases/": [
          "#splide01",
          "#splide02 > div.w-full.flex.justify-between.items-center.mt-6.lg\\:h-10",
          "#splide03",
          "#splide04"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/sustainability-esg-initiatives/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/form-confirmation/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/hardie-honors-rebate-program/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/hardie-zone-system/": [
          "#splide01"
        ],
        "https://www.jameshardie.com/pros-hub/": [
          "#splide01 > div.w-full.flex.justify-between.items-center.mt-6.lg\\:h-10"
        ],
        "https://www.jameshardie.com/request-for-inspiration/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/request-james-hardie-catalog/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/request-quote-confirmation/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/request-re-side-guide/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/request-siding-samples/": [
          "#main-content > section:nth-child(7)",
          "#main-content > section:nth-child(8)"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#main-content > section.pt-10.pb-12.lg\\:py-16.bg-secondary-color-low"
        ],
        "https://www.jameshardie.com/why-james-hardie/": [
          "#main-content > section"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/": [
          "#main-content > section"
        ]
      }
    },
    {
      "name": "cards-article",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/": [
          "#main-content > div:nth-child(6) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/": [
          "#splide02"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/habitat-for-humanity/": [
          "#splide02"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/press-releases/": [
          "#main-content > div:nth-child(3) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ],
        "https://www.jameshardie.com/alliance/": [
          "#main-content > div:nth-child(11) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ],
        "https://www.jameshardie.com/architect-design-resources/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div > div",
          "#splide01"
        ],
        "https://www.jameshardie.com/color-design-guidance/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10",
          "#splide01",
          "#main-content > div:nth-child(7) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ],
        "https://www.jameshardie.com/dream-collection-colors/": [
          "#main-content > div:nth-child(6) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/find-a-contractor/": [
          "#main-content > div.base-container-background.bg-secondary-color-pure.lg\\:pt-20.lg\\:pb-20.pt-10.pb-10 > div > div > div",
          "#main-content > div:nth-child(6) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ],
        "https://www.jameshardie.com/pros-hub/": [
          "#main-content > div:nth-child(2) > div > div > div",
          "#splide01-track",
          "#main-content > div:nth-child(5) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ],
        "https://www.jameshardie.com/request-siding-samples/": [
          "#main-content > div:nth-child(11) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#splide02",
          "#main-content > div:nth-child(12) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#splide01",
          "#main-content > div:nth-child(8) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#main-content > div:nth-child(9) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/why-james-hardie/": [
          "#splide01"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/": [
          "#main-content > div:nth-child(6) > div > div.w-full.flex.flex-col.md\\:flex-row.gap-y-4.gap-x-6.px-4.lg\\:px-20"
        ]
      }
    },
    {
      "name": "columns-cta",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:px-20"
        ]
      }
    },
    {
      "name": "carousel-testimonial",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/": [
          "#main-content > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/habitat-for-humanity/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10 > div > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ]
      }
    },
    {
      "name": "hero-banner",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/press-releases/": [
          "#main-content > div.base-container-background.bg-neutral-color-high.lg\\:pt-8.lg\\:pb-8.lg\\:px-20.pt-10.pb-10"
        ],
        "https://www.jameshardie.com/build-with-hardie/training-and-support/": [
          "#main-content > div.base-container-background.bg-neutral-color-high.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10"
        ],
        "https://www.jameshardie.com/hardie-honors-rebate-program/": [
          "#main-content > div.base-container-background.bg-neutral-color-high.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10"
        ],
        "https://www.jameshardie.com/pros-hub/": [
          "#main-content > div.base-container-background.bg-neutral-color-high.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10"
        ]
      }
    },
    {
      "name": "columns-stats",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/sustainability-esg-initiatives/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:px-28.px-4 > div > div:nth-child(1) > ol"
        ]
      }
    },
    {
      "name": "accordion-faq",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/sustainability-esg-initiatives/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10.px-4 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6"
        ],
        "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/": [
          "#main-content > div.base-container-background.bg-transparent.lg\\:pt-20.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6"
        ]
      }
    },
    {
      "name": "cards-video",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/alliance/": [
          "#main-content > section > div > div"
        ],
        "https://www.jameshardie.com/build-with-hardie/training-and-support/": [
          "#main-content > section > div > div"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#main-content > section > div > div"
        ]
      }
    },
    {
      "name": "image-lightbox",
      "instances": [
        "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/blog/explore-exterior-design/2025-color-of-the-year/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/7-exterior-home-renovations/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/a-guide-to-a-complete-exterior-by-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/bring-your-dream-home-to-life-instantly/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(25) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/color-of-the-year/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/creative-outdoor-spaces-with-hardie-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/curb-appeal-landscaping/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(26) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/different-siding-styles-colors/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/dream-home-design/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/enhance-exterior-design-ideas/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(29) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(33) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/finishing-touches-selecting-siding-and-trim-for-a-whole-house-re-side/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/five-steps-to-transform-your-homes-exterior/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(29) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(39) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(52) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/guide-to-board-and-batten-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-artisan-siding-provides-fresh-opportunity-for-elevated-exterior-design/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(36) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-elevates-the-exterior-design-of-the-2024-southern-living/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(26) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-using-the-new-to-save-the-old/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(24) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(33) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(38) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(44) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hgtv-dream-house-sponsor/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-cape-cod/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(24) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-colonial/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-contemporary/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-craftsman/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(20) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(26) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial-midcentury-modern-style-ranch/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(25) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-tudor/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(20) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-exterior-ideas/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-number-ideas/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-shutter-color-combinations-that-shine/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-siding-design-ideas/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/how-to-choose-house-and-roof-color-combination/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/how-to-pick-a-front-door-color-that-makes-a-statement/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hybrid-home-styles/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-at-international-builders-show/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-exterior-design-week-winners-2025/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(24) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(28) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(31) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(35) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(40) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(43) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(45) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(48) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(52) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(55) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-is-a-proud-sponsor-of-hgtv-dream-home-2025/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/kim-wolfe-offers-homeowners-guidance-for-modern-home-design/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.rtf-image.overflow-hidden.direction-full-width.md\\:w-screen.h-auto.flex.flex-col.items-center.mt-6.lg\\:mt-8.mb-6.\\[\\&\\&\\:has\\(\\+p\\)\\+\\*\\]\\:mt-0 > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.rtf-image.overflow-hidden.direction-center.md\\:w-screen.h-auto.flex.flex-col.items-center.mt-6.lg\\:mt-8.mb-6.px-4.md\\:px-0.gap-6.\\[\\&\\&\\:has\\(\\+p\\)\\+\\*\\]\\:mt-0 > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/making-a-southern-home/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/mixing-siding-styles-best-combinations-for-a-beautiful-exterior/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(35) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(40) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(45) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(47) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(51) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(56) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(61) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/modern-farmhouse-style/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(20) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/most-popular-house-colors/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(20) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(25) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(38) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(41) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(49) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(55) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(58) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(61) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/practical-tips-to-choose-the-perfect-home-exterior/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/preserving-history-with-modern-materials/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/siding-and-trim-color-combinations/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(20) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(26) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(34) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/siding-combinations-for-brick-and-stone-houses/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-idea-house-2026/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(38) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-nashville-idea-house/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-hardie-architectural-collection-your-home-your-style/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(33) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(37) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(41) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-perch-premium-siding-for-a-one-of-a-kind-treehouse-stay/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.rtf-image.overflow-hidden.direction-full-width.md\\:w-screen.h-auto.flex.flex-col.items-center.mt-6.lg\\:mt-8.mb-6.\\[\\&\\&\\:has\\(\\+p\\)\\+\\*\\]\\:mt-0 > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-perfect-match-merging-original-brick-with-modern-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/timeless-appeal-for-southern-living-2025-idea-house/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(32) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/a-colorfully-modern-twist-on-tradition/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/blending-traditional-exteriors-with-modern-trends/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/business-tips-for-the-off-season/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/elements-of-a-successful-streetscape/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/exterior-design-week-recognizing-excellence/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/grow-your-contractor-business-with-the-contractor-alliance-program/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.rtf-image.overflow-hidden.direction-center.md\\:w-screen.h-auto.flex.flex-col.items-center.mt-6.lg\\:mt-8.mb-6.px-4.md\\:px-0.gap-6.\\[\\&\\&\\:has\\(\\+p\\)\\+\\*\\]\\:mt-0 > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/grow-your-siding-contractor-business-with-in-home-selling-solutions/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/hardie-products-with-colorplus-technology-finishes-helping-builders/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/house-before-and-after/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardie-architectural-panels/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(20) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(24) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/multi-family-bold-design-equitable-housing/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/tools-to-install-hardie-products/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/home-siding-care/christmas-lights-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/2025-green-builder-sustainable-products-of-the-year-hardie-artisan-trim/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/any-look-any-style/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/best-siding-for-cold-winter-climates/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-for-texas-durability-meets-design-with-hardie-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(29) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(33) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-for-the-future-queen-of-zero-demonstrates-whats-possible/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-resilience-and-engineered-for-climate/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/climate-engineered-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(26) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/durability-and-beauty-together/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/durability-is-sustainability-vision-house-Sussex/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/eco-friendly-home-sustainable-materials/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/fire-resistant-siding-helped-protect-this-home-from-extreme-weather/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/hot-climate-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/james-hardie-recognized-as-2024-eco-leader-by-green-builder/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/mariposa-meadows-relies-on-durable-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/prepare-your-home-for-winter-essential-exterior-maintenance-tips/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(25) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(28) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(31) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(34) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(37) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(40) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/three-homes-three-climates-three-sustainable-solutions/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/tips-for-cleaning-your-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(25) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(34) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/vision-house-austin-built-for-resilience/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.rtf-image.overflow-hidden.direction-full-width.md\\:w-screen.h-auto.flex.flex-col.items-center.mt-6.lg\\:mt-8.mb-6.\\[\\&\\&\\:has\\(\\+p\\)\\+\\*\\]\\:mt-0 > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.rtf-image.overflow-hidden.direction-center.md\\:w-screen.h-auto.flex.flex-col.items-center.mt-6.lg\\:mt-8.mb-6.px-4.md\\:px-0.gap-6.\\[\\&\\&\\:has\\(\\+p\\)\\+\\*\\]\\:mt-0 > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/weather-resistant-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/10-top-tips-how-to-get-ready-for-an-exterior-siding-project/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/guiding-first-time-home-buyers-dr-horton-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-choose-a-siding-contractor/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(33) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-prepare-for-your-first-contractor-meeting/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/plan-a-siding-project/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(29) > figure:nth-child(1) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(29) > figure:nth-child(2) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(36) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/siding-home-value/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/siding-terminology-101/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.rtf-image.overflow-hidden.direction-side-by-side.md\\:w-screen.h-auto.flex.justify-center.gap-4.md\\:gap-6.mt-6.lg\\:mt-8.mb-6.\\[\\&\\&\\:has\\(\\+p\\)\\+\\*\\]\\:mt-0 > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(20) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(24) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(29) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(33) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(37) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(42) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(46) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(52) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/tips-for-choosing-a-contractor/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/which-backer-board-is-right-for-my-project/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(43) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(51) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(59) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(67) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/best-time-of-year-siding-replacement/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(21) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/considering-material-values/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/decide-to-re-side/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(26) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/from-stucco-to-hardie-fiber-cement-re-side/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(23) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(27) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/not-all-fiber-cement-siding-is-hardie-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(33) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/what-to-expect-during-your-siding-project/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(12) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(17) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/colorplus-technology-finishes-by-james-hardie-the-facts-behind-the-finish/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(15) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(18) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/different-types-of-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/essential-siding-styles/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/what-is-fiber-cement-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > figure > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9) > figure > div"
        ],
        "https://www.jameshardie.com/re-side-process/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5)",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(38)"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.md\\:w-fit.\\!min-h-0.grid.grid-rows-3.md\\:grid-rows-none.md\\:auto-rows-fr.grid-flow-col.auto-cols-\\[140px\\].md\\:grid-flow-row.md\\:grid-cols-\\[repeat\\(4\\,minmax\\(0\\,max-content\\)\\)\\].gap-2.overflow-x-auto.md\\:overflow-hidden.px-4.md\\:px-20.pb-6.md\\:pb-0"
        ]
      }
    },
    {
      "name": "author-bio",
      "instances": [
        "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/blog/explore-exterior-design/2025-color-of-the-year/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/7-exterior-home-renovations/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/a-guide-to-a-complete-exterior-by-james-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/bring-your-dream-home-to-life-instantly/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/color-of-the-year/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/creative-outdoor-spaces-with-hardie-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/curb-appeal-landscaping/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/different-siding-styles-colors/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/dream-home-design/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/enhance-exterior-design-ideas/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/finishing-touches-selecting-siding-and-trim-for-a-whole-house-re-side/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/five-steps-to-transform-your-homes-exterior/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/guide-to-board-and-batten-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-artisan-siding-provides-fresh-opportunity-for-elevated-exterior-design/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-elevates-the-exterior-design-of-the-2024-southern-living/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-using-the-new-to-save-the-old/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hgtv-dream-house-sponsor/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-cape-cod/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-colonial/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-contemporary/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-craftsman/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial-midcentury-modern-style-ranch/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-tudor/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-exterior-ideas/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-number-ideas/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-shutter-color-combinations-that-shine/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/house-siding-design-ideas/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/how-to-choose-house-and-roof-color-combination/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/how-to-pick-a-front-door-color-that-makes-a-statement/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hybrid-home-styles/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-at-international-builders-show/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-exterior-design-week-winners-2025/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-is-a-proud-sponsor-of-hgtv-dream-home-2025/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/kim-wolfe-offers-homeowners-guidance-for-modern-home-design/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/lake-minnetonka-neighborhood-gets-a-makeover-featuring-a-complete-exterior/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/making-a-southern-home/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/mixing-siding-styles-best-combinations-for-a-beautiful-exterior/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/modern-farmhouse-style/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/most-popular-house-colors/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/practical-tips-to-choose-the-perfect-home-exterior/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/preserving-historical-aesthetics-with-james-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/preserving-history-with-modern-materials/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/siding-and-trim-color-combinations/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/siding-combinations-for-brick-and-stone-houses/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-idea-house-2026/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-nashville-idea-house/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-hardie-architectural-collection-your-home-your-style/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-perch-premium-siding-for-a-one-of-a-kind-treehouse-stay/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/the-perfect-match-merging-original-brick-with-modern-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/timeless-appeal-for-southern-living-2025-idea-house/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/exterior-design/affordable-housing-project-uses-hardie-products-to-achieve-high-exterior-design/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/exterior-design/how-james-hardie-is-defining-whats-next-in-homebuilding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/10-fundamentals-for-siding-installation-efficiency/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/a-colorfully-modern-twist-on-tradition/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/best-practices-for-home-construction-that-resists-moisture-damage/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/blending-traditional-exteriors-with-modern-trends/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/business-tips-for-the-off-season/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/contractor-certified-why-pros-choose-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/contractor-switching-from-vinyl-to-james-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/elements-of-a-successful-streetscape/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/exterior-design-week-recognizing-excellence/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/grow-your-contractor-business-with-the-contractor-alliance-program/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/grow-your-siding-contractor-business-with-in-home-selling-solutions/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/hardie-products-with-colorplus-technology-finishes-helping-builders/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/hardie-trim-over-method/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/home-built-on-trust-and-quality-david-weekley-homes-james-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/home-built-to-withstand-a-hurricane/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/house-before-and-after/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardie-architectural-panels/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-floors/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-walls/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-staggered-edge-hardieshingle/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/james-hardie-2026-international-builders-show/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/jb-west-roofing-trim-over-method/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/multi-family-bold-design-equitable-housing/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/myth-busting-separating-myth-from-fact-about-wood-frame-construction/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/navigating-the-new-colorado-wildfire-resiliency-code/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/number-one-siding-install-mistake/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/stronger-rooflines-stronger-margins-all-american-renovations/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/summer-jobsite-safety-tips/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/the-risinger-build-austin-featuring-hardie-artisan-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/tips-for-installing-james-hardie-lap-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/tools-to-install-hardie-products/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/why-wood-frame-construction-is-the-resilient-choice-for-florida-homes/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/working-the-neighborhood-radius-marketing-nets-results/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/home-siding-care/christmas-lights-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/2024-green-builder-sustainable-products-of-the-year-hardie-artisan-lap/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/2025-green-builder-sustainable-products-of-the-year-hardie-artisan-trim/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/6-cabins-3-days-james-hardie-helps-camp-rainbow-gold-expand/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/any-look-any-style/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/best-siding-for-cold-winter-climates/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-a-culture-of-sustainability/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-for-texas-durability-meets-design-with-hardie-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-for-the-future-queen-of-zero-demonstrates-whats-possible/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-homes-that-endure-how-top-alabama-builders-elevate-communities-with-james-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-resilience-and-engineered-for-climate/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/climate-engineered-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/durability-and-beauty-together/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/durability-is-sustainability-vision-house-Sussex/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/eco-friendly-home-sustainable-materials/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/fire-demonstration/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/fire-resistant-siding-helped-protect-this-home-from-extreme-weather/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/home-exterior-hurricane-prep/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/hot-climate-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/james-hardie-recognized-as-2024-eco-leader-by-green-builder/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/mariposa-meadows-relies-on-durable-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/matt-risinger-talks-durability-with-james-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/prepare-your-home-for-winter-essential-exterior-maintenance-tips/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/prevent-damage-with-siding-that-doesnt-appeal-to-pests/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/standing-strong-in-the-west-complete-exterior-by-james-hardie-protects/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/the-role-of-siding-in-resiliency-planning-ask-the-expert/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/three-homes-three-climates-three-sustainable-solutions/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/tips-for-cleaning-your-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/vision-house-austin-built-for-resilience/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/weather-resistant-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/10-top-tips-how-to-get-ready-for-an-exterior-siding-project/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/guiding-first-time-home-buyers-dr-horton-james-hardie/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-firefighter-first-responder-rebate/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-military-product-rebate-program/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-much-does-siding-replacement-cost/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-choose-a-siding-contractor/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-get-the-best-return-on-investment-for-a-major-exterior-remodel/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/how-to-prepare-for-your-first-contractor-meeting/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/plan-a-siding-project/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/siding-home-value/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/siding-terminology-101/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/tips-for-choosing-a-contractor/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/which-backer-board-is-right-for-my-project/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/best-time-of-year-siding-replacement/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/considering-material-values/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/decide-to-re-side/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/from-stucco-to-hardie-fiber-cement-re-side/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/not-all-fiber-cement-siding-is-hardie-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/what-to-expect-during-your-siding-project/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/colorplus-technology-finishes-by-james-hardie-the-facts-behind-the-finish/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/different-types-of-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/essential-siding-styles/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/fiber-cement-siding-as-a-masonry-alternative/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/what-is-fiber-cement-siding/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.flex.justify-center.mt-10.lg\\:mt-12.mb-10.lg\\:mb-20.px-4 > div > div"
        ]
      }
    },
    {
      "name": "embed-video",
      "instances": [
        "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div",
        "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/blog/explore-exterior-design/creative-outdoor-spaces-with-hardie-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-elevates-the-exterior-design-of-the-2024-southern-living/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/lake-minnetonka-neighborhood-gets-a-makeover-featuring-a-complete-exterior/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/preserving-historical-aesthetics-with-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/siding-combinations-for-brick-and-stone-houses/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-idea-house-2026/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-nashville-idea-house/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/timeless-appeal-for-southern-living-2025-idea-house/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/exterior-design/affordable-housing-project-uses-hardie-products-to-achieve-high-exterior-design/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/exterior-design/how-james-hardie-is-defining-whats-next-in-homebuilding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/best-practices-for-home-construction-that-resists-moisture-damage/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(10) > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/grow-your-contractor-business-with-the-contractor-alliance-program/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/hardie-trim-over-method/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/home-built-on-trust-and-quality-david-weekley-homes-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardie-architectural-panels/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-floors/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(31) > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-walls/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(32) > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-staggered-edge-hardieshingle/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/james-hardie-2026-international-builders-show/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/jb-west-roofing-trim-over-method/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/multi-family-bold-design-equitable-housing/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/myth-busting-separating-myth-from-fact-about-wood-frame-construction/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/number-one-siding-install-mistake/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(2) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(8) > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/stronger-rooflines-stronger-margins-all-american-renovations/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/the-risinger-build-austin-featuring-hardie-artisan-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/tips-for-installing-james-hardie-lap-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/why-wood-frame-construction-is-the-resilient-choice-for-florida-homes/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/6-cabins-3-days-james-hardie-helps-camp-rainbow-gold-expand/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(28) > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-for-the-future-queen-of-zero-demonstrates-whats-possible/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-homes-that-endure-how-top-alabama-builders-elevate-communities-with-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-resilience-and-engineered-for-climate/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(3) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/climate-engineered-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(13) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(39) > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/fire-demonstration/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/matt-risinger-talks-durability-with-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/prevent-damage-with-siding-that-doesnt-appeal-to-pests/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(4) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(16) > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/standing-strong-in-the-west-complete-exterior-by-james-hardie-protects/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-durability/the-role-of-siding-in-resiliency-planning-ask-the-expert/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div > div"
        ],
        "https://www.jameshardie.com/blog/siding-project-planning/guiding-first-time-home-buyers-dr-horton-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/from-stucco-to-hardie-fiber-cement-re-side/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/siding-replacement/not-all-fiber-cement-siding-is-hardie-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/different-types-of-siding/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/blog/siding-types/fiber-cement-siding-as-a-masonry-alternative/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(5) > div",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(19) > div"
        ],
        "https://www.jameshardie.com/re-side-process/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.video-embed.mx-auto.relative.w-full.h-auto.aspect-video.mt-10.lg\\:mt-6.mb-8.lg\\:px-0.flex.flex-col > div"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#hover-website-embed-iframe"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#hover-website-embed-iframe"
        ]
      }
    },
    {
      "name": "quote",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-cape-cod/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.flex.flex-col.justify-start.gap-y-4.lg\\:gap-y-6.pr-2.md\\:px-\\[3\\.4375rem\\].py-10"
        ],
        "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-nashville-idea-house/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(6)",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(14)"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/hardie-products-with-colorplus-technology-finishes-helping-builders/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(7)",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(9)",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11)"
        ],
        "https://www.jameshardie.com/blog/for-siding-pros/stronger-rooflines-stronger-margins-all-american-renovations/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11)",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(22)",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(30)"
        ],
        "https://www.jameshardie.com/blog/siding-durability/building-homes-that-endure-how-top-alabama-builders-elevate-communities-with-james-hardie/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(11)",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(24)",
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div:nth-child(34)"
        ],
        "https://www.jameshardie.com/re-side-process/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > div.flex.flex-col.justify-start.gap-y-4.lg\\:gap-y-6.pr-2.md\\:px-\\[3\\.4375rem\\].py-10"
        ]
      }
    },
    {
      "name": "table-plain",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/blog/siding-project-planning/which-backer-board-is-right-for-my-project/": [
          "#main-content > div.article-detail.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.items-center.mt-10.lg\\:mt-12.overflow-x-hidden.lg\\:px-0.mb-10.lg\\:mb-12.\\[\\&_\\>_\\*\\:first-child\\]\\:mt-0 > div > table"
        ]
      }
    },
    {
      "name": "cards-feature",
      "instances": [
        "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col.mt-10.lg\\:mt-16.gap-10.lg\\:gap-16 > div:nth-child(2) > div.flex.flex-col > div.flex.flex-1.flex-col.justify-between.\\[\\&\\>div\\]\\:mt-0"
        ],
        "https://www.jameshardie.com/dream-collection-colors/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/find-a-contractor/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/hardie-honors-rebate-program/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/request-siding-samples/": [
          "#main-content > section.bg-transparent.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ]
      }
    },
    {
      "name": "gallery-mosaic",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/dream-collection-colors/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.px-4.md\\:px-20.grid.grid-rows-3.auto-cols-\\[140px\\].lg\\:auto-cols-\\[176px\\].\\!min-h-0.grid-flow-col.md\\:flex.md\\:flex-wrap.md\\:content-start.gap-2.overflow-x-auto.md\\:overflow-hidden.pb-6.md\\:pb-0"
        ],
        "https://www.jameshardie.com/request-siding-samples/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.px-4.md\\:px-20.grid.grid-rows-3.auto-cols-\\[140px\\].lg\\:auto-cols-\\[176px\\].\\!min-h-0.grid-flow-col.md\\:flex.md\\:flex-wrap.md\\:content-start.gap-2.overflow-x-auto.md\\:overflow-hidden.pb-6.md\\:pb-0"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.px-4.md\\:px-20.grid.grid-rows-3.auto-cols-\\[140px\\].lg\\:auto-cols-\\[176px\\].\\!min-h-0.grid-flow-col.md\\:flex.md\\:flex-wrap.md\\:content-start.gap-2.overflow-x-auto.md\\:overflow-hidden.pb-6.md\\:pb-0"
        ]
      }
    },
    {
      "name": "color-search",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/dream-collection-colors/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div:nth-child(2) > div.hidden.md\\:flex.w-full.mb-\\[40px\\] > div > label > div"
        ]
      }
    },
    {
      "name": "hero-search",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/find-a-contractor/": [
          "#main-content > div:nth-child(1)"
        ],
        "https://www.jameshardie.com/hardie-zone-system/": [
          "#main-content > div:nth-child(1)"
        ]
      }
    },
    {
      "name": "location-indicator",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/request-siding-samples/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.max-w-screen-1440p.mt-\\[-0\\.5rem\\].md\\:mt-0.pt-0.md\\:pt-10.mb-\\[-1rem\\].md\\:mb-0.px-4.md\\:px-20 > div > div > h5"
        ],
        "https://www.jameshardie.com/statement-collection-colors/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.max-w-screen-1440p.mt-\\[-0\\.5rem\\].md\\:mt-0.pt-0.md\\:pt-10.mb-\\[-1rem\\].md\\:mb-0.px-4.md\\:px-20 > div > div > h5"
        ],
        "https://www.jameshardie.com/timberhue-collection-colors/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.pb-12.md\\:pb-20.flex.flex-col.items-center.justify-center.bg-white > div.w-full.max-w-screen-1440p.mt-\\[-0\\.5rem\\].md\\:mt-0.pt-0.md\\:pt-10.mb-\\[-1rem\\].md\\:mb-0.px-4.md\\:px-20 > div > div > h5"
        ]
      }
    },
    {
      "name": "carousel-hotspot",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/request-siding-samples/": [
          "#splide01"
        ],
        "https://www.jameshardie.com/start-your-siding-project/": [
          "#splide01"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "intro-split",
      "name": "Split intro",
      "selector": [
        "#main-content > div.lg\\:bg-secondary-color-low.lg\\:flex-row",
        "#main-content > section.horizontal-hero"
      ],
      "style": "light",
      "blocks": [
        "hero-split",
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "share-bar",
      "name": "Share bar",
      "selector": [
        "#main-content > div.flex.justify-center.mt-7.mb-8"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "article-body",
      "name": "Article body",
      "selector": [
        "#main-content > div.article-detail"
      ],
      "style": "article",
      "blocks": [
        "image-lightbox",
        "embed-video",
        "quote"
      ],
      "defaultContent": []
    },
    {
      "id": "author",
      "name": "Author",
      "selector": [
        "#main-content > div.flex.justify-center.mt-10.mb-10"
      ],
      "style": "article",
      "blocks": [
        "author-bio"
      ],
      "defaultContent": []
    },
    {
      "id": "dark-1",
      "name": "Dark section",
      "selector": [
        "#main-content > .bg-neutral-color-high"
      ],
      "style": "dark",
      "blocks": [
        "hero-banner"
      ],
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
        "tabs-underline",
        "columns-cta",
        "carousel-testimonial",
        "carousel-cards",
        "cards-article"
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
        "carousel-cards"
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
      "blocks": [],
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
      "blocks": [
        "cards-video"
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
        "cards-article"
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
        "cards-article",
        "columns-media"
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
        "columns-media",
        "tabs-underline"
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
      "blocks": [],
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
        "video-poster",
        "columns-media",
        "columns-stats",
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
        "carousel-testimonial",
        "tabs-underline"
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
      "blocks": [],
      "defaultContent": []
    }
  ],
  "pageCleanup": {
    "https://www.jameshardie.com/84-lumber/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/all-about-james-hardie/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/all-about-james-hardie/careers-james-hardie/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/all-about-james-hardie/sustainability-esg-initiatives/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/alliance/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/architect-design-resources/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/2025-color-of-the-year/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/7-exterior-home-renovations/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/a-guide-to-a-complete-exterior-by-james-hardie/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/bring-your-dream-home-to-life-instantly/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/color-of-the-year/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/creative-outdoor-spaces-with-hardie-siding/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/curb-appeal-landscaping/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/different-siding-styles-colors/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/dream-home-design/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/enhance-exterior-design-ideas/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/finishing-touches-selecting-siding-and-trim-for-a-whole-house-re-side/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/five-steps-to-transform-your-homes-exterior/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/guide-to-board-and-batten-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/hardie-artisan-siding-provides-fresh-opportunity-for-elevated-exterior-design/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-elevates-the-exterior-design-of-the-2024-southern-living/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/hardie-siding-using-the-new-to-save-the-old/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/hgtv-dream-house-sponsor/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-cape-cod/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-colonial/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-contemporary/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-craftsman/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial-midcentury-modern-style-ranch/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-dutch-colonial/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/home-style-guide-tudor/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/house-exterior-ideas/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/house-number-ideas/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/house-shutter-color-combinations-that-shine/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/house-siding-design-ideas/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/how-to-choose-house-and-roof-color-combination/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/how-to-pick-a-front-door-color-that-makes-a-statement/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/hybrid-home-styles/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-at-international-builders-show/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-exterior-design-week-winners-2025/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/james-hardie-is-a-proud-sponsor-of-hgtv-dream-home-2025/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/kim-wolfe-offers-homeowners-guidance-for-modern-home-design/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/lake-minnetonka-neighborhood-gets-a-makeover-featuring-a-complete-exterior/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/making-a-southern-home/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/mixing-siding-styles-best-combinations-for-a-beautiful-exterior/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/modern-farmhouse-style/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/most-popular-house-colors/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/practical-tips-to-choose-the-perfect-home-exterior/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/preserving-historical-aesthetics-with-james-hardie/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/preserving-history-with-modern-materials/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/siding-and-trim-color-combinations/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/siding-combinations-for-brick-and-stone-houses/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-idea-house-2026/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/southern-living-nashville-idea-house/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/the-hardie-architectural-collection-your-home-your-style/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/the-perch-premium-siding-for-a-one-of-a-kind-treehouse-stay/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/the-perfect-match-merging-original-brick-with-modern-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/explore-exterior-design/timeless-appeal-for-southern-living-2025-idea-house/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/exterior-design/how-james-hardie-is-defining-whats-next-in-homebuilding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/10-fundamentals-for-siding-installation-efficiency/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/a-colorfully-modern-twist-on-tradition/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/best-practices-for-home-construction-that-resists-moisture-damage/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/blending-traditional-exteriors-with-modern-trends/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/business-tips-for-the-off-season/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/contractor-certified-why-pros-choose-hardie/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/contractor-switching-from-vinyl-to-james-hardie/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/elements-of-a-successful-streetscape/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/exterior-design-week-recognizing-excellence/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/grow-your-contractor-business-with-the-contractor-alliance-program/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/grow-your-siding-contractor-business-with-in-home-selling-solutions/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/hardie-products-with-colorplus-technology-finishes-helping-builders/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/hardie-trim-over-method/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/home-built-to-withstand-a-hurricane/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/house-before-and-after/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardie-architectural-panels/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-floors/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-hardiebacker-cement-board-on-walls/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/how-to-install-staggered-edge-hardieshingle/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/james-hardie-2026-international-builders-show/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/jb-west-roofing-trim-over-method/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/multi-family-bold-design-equitable-housing/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/myth-busting-separating-myth-from-fact-about-wood-frame-construction/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/navigating-the-new-colorado-wildfire-resiliency-code/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/stronger-rooflines-stronger-margins-all-american-renovations/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/summer-jobsite-safety-tips/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/the-risinger-build-austin-featuring-hardie-artisan-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/tips-for-installing-james-hardie-lap-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/tools-to-install-hardie-products/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/why-wood-frame-construction-is-the-resilient-choice-for-florida-homes/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/for-siding-pros/working-the-neighborhood-radius-marketing-nets-results/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/home-siding-care/christmas-lights-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/2024-green-builder-sustainable-products-of-the-year-hardie-artisan-lap/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/2025-green-builder-sustainable-products-of-the-year-hardie-artisan-trim/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/6-cabins-3-days-james-hardie-helps-camp-rainbow-gold-expand/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/any-look-any-style/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/best-siding-for-cold-winter-climates/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/building-a-culture-of-sustainability/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/siding-durability/building-for-texas-durability-meets-design-with-hardie-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/siding-durability/building-for-the-future-queen-of-zero-demonstrates-whats-possible/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/building-homes-that-endure-how-top-alabama-builders-elevate-communities-with-james-hardie/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/siding-durability/building-resilience-and-engineered-for-climate/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/climate-engineered-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/durability-and-beauty-together/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/siding-durability/durability-is-sustainability-vision-house-Sussex/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/fire-demonstration/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/fire-resistant-siding-helped-protect-this-home-from-extreme-weather/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/home-exterior-hurricane-prep/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/hot-climate-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/james-hardie-recognized-as-2024-eco-leader-by-green-builder/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/siding-durability/mariposa-meadows-relies-on-durable-siding/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/matt-risinger-talks-durability-with-james-hardie/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/prepare-your-home-for-winter-essential-exterior-maintenance-tips/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/standing-strong-in-the-west-complete-exterior-by-james-hardie-protects/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-durability/the-role-of-siding-in-resiliency-planning-ask-the-expert/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/three-homes-three-climates-three-sustainable-solutions/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/tips-for-cleaning-your-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/vision-house-austin-built-for-resilience/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-durability/weather-resistant-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/10-top-tips-how-to-get-ready-for-an-exterior-siding-project/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/guiding-first-time-home-buyers-dr-horton-james-hardie/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-firefighter-first-responder-rebate/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/hardie-honors-military-product-rebate-program/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/how-much-does-siding-replacement-cost/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/how-to-choose-a-siding-contractor/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/how-to-prepare-for-your-first-contractor-meeting/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/plan-a-siding-project/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/siding-home-value/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/siding-terminology-101/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/tips-for-choosing-a-contractor/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-project-planning/which-backer-board-is-right-for-my-project/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-replacement/best-time-of-year-siding-replacement/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/blog/siding-replacement/considering-material-values/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-replacement/decide-to-re-side/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-replacement/from-stucco-to-hardie-fiber-cement-re-side/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/siding-replacement/not-all-fiber-cement-siding-is-hardie-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-replacement/what-to-expect-during-your-siding-project/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-types/colorplus-technology-finishes-by-james-hardie-the-facts-behind-the-finish/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/blog/siding-types/different-types-of-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/siding-types/essential-siding-styles/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/blog/siding-types/fiber-cement-siding-as-a-masonry-alternative/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/blog/siding-types/what-is-fiber-cement-siding/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/build-with-hardie/training-and-support/": [
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/color-design-guidance/": [
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-cape-cod/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-colonial/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-contemporary/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-craftsman-bungalow/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-dutch-colonial/": [
      "div.swe_card_container_outer",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)",
      "#kn_card_app_7348e2c4-54cc-4653-b8a0-1dc3f724d23d"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-ranch/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-mcm-split-level/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-modern-farmhouse/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/color-design-guidance/architectural-style-tudor/": [
      "div.swe_card_container_outer",
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)",
      "#main-content > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
    ],
    "https://www.jameshardie.com/contractor-kit-confirmation/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/dream-collection-colors/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/hardie-honors-rebate-program/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/hardie-zone-system/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/hardiebacker-support/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/re-side-process/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/request-quote-confirmation/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/request-re-side-guide/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/request-siding-samples/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/request-timberhue-collection-catalog/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/start-your-siding-project/": [
      "div.swe_card_container_outer",
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "#hb_chatbot-root"
    ],
    "https://www.jameshardie.com/statement-collection-colors/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/sustainability-rating-request/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/timberhue-collection-colors/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/why-james-hardie/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/why-james-hardie/siding-performance-durability/fire-resistance/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ]
  }
};

const parsers = {
  'hero-split': heroSplitParser,
  'video-poster': videoPosterParser,
  'tabs-underline': tabsUnderlineParser,
  'columns-media': columnsMediaParser,
  'carousel-cards': carouselCardsParser,
  'cards-article': cardsArticleParser,
  'columns-cta': columnsCtaParser,
  'carousel-testimonial': carouselTestimonialParser,
  'hero-banner': heroBannerParser,
  'columns-stats': columnsStatsParser,
  'accordion-faq': accordionFaqParser,
  'cards-video': cardsVideoParser,
  'image-lightbox': imageLightboxParser,
  'author-bio': authorBioParser,
  'embed-video': embedVideoParser,
  'quote': quoteParser,
  'table-plain': tablePlainParser,
  'cards-feature': cardsFeatureParser,
  'gallery-mosaic': galleryMosaicParser,
  'color-search': colorSearchParser,
  'hero-search': heroSearchParser,
  'location-indicator': locationIndicatorParser,
  'carousel-hotspot': carouselHotspotParser,
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

