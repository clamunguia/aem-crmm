/* eslint-disable */
/* global WebImporter */

import heroVideoParser from './parsers/hero-video.js';
import heroSplitParser from './parsers/hero-split.js';
import carouselHotspotParser from './parsers/carousel-hotspot.js';
import tabsUnderlineParser from './parsers/tabs-underline.js';
import carouselMediaParser from './parsers/carousel-media.js';
import embedVideoParser from './parsers/embed-video.js';
import columnsMediaParser from './parsers/columns-media.js';
import galleryMosaicParser from './parsers/gallery-mosaic.js';
import carouselCardsParser from './parsers/carousel-cards.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsVideoParser from './parsers/cards-video.js';
import columnsIntroParser from './parsers/columns-intro.js';
import cardsArticleParser from './parsers/cards-article.js';
import carouselTestimonialParser from './parsers/carousel-testimonial.js';
import productConfiguratorParser from './parsers/product-configurator.js';
import videoPosterParser from './parsers/video-poster.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import jameshardieCleanupTransformer from './transformers/jameshardie-cleanup.js';
import jameshardieSectionsTransformer from './transformers/jameshardie-sections.js';

const PAGE_TEMPLATE = {
  "name": "landing-photo-hero",
  "urls": [
    "https://www.jameshardie.com/",
    "https://www.jameshardie.com/all-about-james-hardie/james-hardie-brands/",
    "https://www.jameshardie.com/color-of-the-year-midnight-black/",
    "https://www.jameshardie.com/color-of-the-year/",
    "https://www.jameshardie.com/design-with-artisan/",
    "https://www.jameshardie.com/hardie-backer-pro-cement-board/",
    "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/",
    "https://www.jameshardie.com/resiliency/",
    "https://www.jameshardie.com/resiliency/fire/"
  ],
  "description": "Landing page that opens with headline text over a full-width photo hero, followed by stacked marketing sections",
  "blocks": [
    {
      "name": "hero-video",
      "instances": [
        "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/james-hardie-brands/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/color-of-the-year-midnight-black/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/color-of-the-year/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/design-with-artisan/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/resiliency/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ],
        "https://www.jameshardie.com/resiliency/fire/": [
          "#main-content > div.hero-video-overlay.max-w-screen-1440p.mx-auto.relative.w-full.h-\\[37\\.5rem\\].lg\\:h-\\[44\\.375rem\\]"
        ]
      }
    },
    {
      "name": "hero-split",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.slim.\\[\\&\\>div\\:first-of-type\\]\\:hidden > div.relative.py-10.lg\\:py-12 > div.inner-container.flex.flex-col.lg\\:flex-row.items-start.lg\\:items-stretch.pb-6.lg\\:pb-8"
        ],
        "https://www.jameshardie.com/resiliency/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div:nth-child(10)"
        ],
        "https://www.jameshardie.com/resiliency/fire/": [
          "#main-content > div:nth-child(4)",
          "#main-content > div:nth-child(10)"
        ]
      }
    },
    {
      "name": "carousel-hotspot",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#splide01"
        ],
        "https://www.jameshardie.com/color-of-the-year-midnight-black/": [
          "#splide01"
        ],
        "https://www.jameshardie.com/color-of-the-year/": [
          "#splide01"
        ]
      }
    },
    {
      "name": "tabs-underline",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#main-content > div.max-w-screen-1440p.mx-auto.my-10.lg\\:my-12 > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.mb-6.lg\\:mb-8.px-4.lg\\:px-20",
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div:nth-child(8) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.lg\\:pb-10",
          "#main-content > div:nth-child(9) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/color-of-the-year-midnight-black/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth"
        ],
        "https://www.jameshardie.com/color-of-the-year/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth"
        ],
        "https://www.jameshardie.com/design-with-artisan/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.relative.w-full.flex.overflow-x-scroll.justify-start.md\\:justify-center.px-9.md\\:px-0.py-6.no-scrollbar.snap-x.scroll-smooth",
          "#main-content > div:nth-child(10) > div > div.w-full.block.lg\\:flex.lg\\:items-center.lg\\:justify-between.pb-8.px-4.lg\\:px-20"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]",
          "#main-content > div.w-full.flex.flex-col.items-center.justify-center.py-10.lg\\:py-20.lg\\:px-20.bg-primary-color-high > div > div.w-full.mx-auto.flex.flex-col.lg\\:flex-row.justify-center.items-center.gap-6"
        ]
      }
    },
    {
      "name": "carousel-media",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#splide02"
        ],
        "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
          "#splide01"
        ]
      }
    },
    {
      "name": "embed-video",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#hover-website-embed-iframe"
        ],
        "https://www.jameshardie.com/color-of-the-year-midnight-black/": [
          "#hover-website-embed-iframe"
        ],
        "https://www.jameshardie.com/color-of-the-year/": [
          "#hover-website-embed-iframe"
        ]
      }
    },
    {
      "name": "columns-media",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col"
        ],
        "https://www.jameshardie.com/all-about-james-hardie/james-hardie-brands/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:px-20.pt-4.pb-4",
          "#main-content > div:nth-child(7)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(1)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(2)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(3)",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div:nth-child(4)"
        ],
        "https://www.jameshardie.com/color-of-the-year-midnight-black/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col"
        ],
        "https://www.jameshardie.com/color-of-the-year/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col"
        ],
        "https://www.jameshardie.com/design-with-artisan/": [
          "#main-content > div.w-full.max-w-screen-1440p.m-auto.flex.flex-col > div:nth-child(2) > div.flex.flex-col",
          "#main-content > div:nth-child(7)"
        ],
        "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between",
          "#main-content > div.inner-container.pt-10.pb-12.lg\\:pt-12.lg\\:pb-20 > div > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.lg\\:flex-row-reverse.justify-end"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > div.textImageItem.w-full.flex.flex-col.lg\\:flex-row.gap-6.items-center.justify-between.inner-container.my-10.sm\\:my-16"
        ],
        "https://www.jameshardie.com/resiliency/": [
          "#main-content > div:nth-child(6)",
          "#main-content > div:nth-child(7)",
          "#main-content > div:nth-child(8)",
          "#main-content > div:nth-child(9)"
        ],
        "https://www.jameshardie.com/resiliency/fire/": [
          "#main-content > div:nth-child(6)",
          "#main-content > div:nth-child(7)",
          "#main-content > div:nth-child(8)",
          "#main-content > div:nth-child(9)"
        ]
      }
    },
    {
      "name": "gallery-mosaic",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#sprinklr-embed-24392-ZW1iZWQ6NjYwYTg5MTU2NGZiMGI1NTEzMzI4OGEw > div.swe_posts_container"
        ]
      }
    },
    {
      "name": "carousel-cards",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/": [
          "#splide03"
        ]
      }
    },
    {
      "name": "cards-feature",
      "instances": [
        "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
      ],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/james-hardie-brands/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/color-of-the-year-midnight-black/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/color-of-the-year/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/design-with-artisan/": [
          "#main-content > section > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ],
        "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
          "#main-content > section.bg-secondary-color-low.mx-auto.px-4.pt-10.pb-12.lg\\:pt-16.lg\\:pb-20 > div > div.cards-container.w-full.max-w-\\[1280px\\].lg\\:px-8.flex.flex-col.justify-center.lg\\:flex-row.gap-8.\\[\\&\\>div\\]\\:flex.\\[\\&\\>div\\]\\:flex-1.\\[\\&\\>div\\]\\:lg\\:max-w-\\[560px\\]"
        ]
      }
    },
    {
      "name": "cards-video",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/all-about-james-hardie/james-hardie-brands/": [
          "#main-content > section.relative.w-full.bg-secondary-color-pure.pt-12.lg\\:pt-16.pb-16.lg\\:pb-20 > div > div"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > section.relative.w-full.bg-secondary-color-pure.pt-12.lg\\:pt-16.pb-16.lg\\:pb-20 > div > div"
        ]
      }
    },
    {
      "name": "columns-intro",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/color-of-the-year-midnight-black/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.slim.\\[\\&\\>div\\:first-of-type\\]\\:hidden > div.relative.py-10.lg\\:py-12 > div.inner-container.flex.flex-col.lg\\:flex-row.items-start.lg\\:items-stretch.pb-6.lg\\:pb-8"
        ],
        "https://www.jameshardie.com/color-of-the-year/": [
          "#main-content > div.mx-auto.relative.w-full.h-auto.max-w-screen-1440p.slim.\\[\\&\\>div\\:first-of-type\\]\\:hidden > div.relative.py-10.lg\\:py-12 > div.inner-container.flex.flex-col.lg\\:flex-row.items-start.lg\\:items-stretch.pb-6.lg\\:pb-8"
        ]
      }
    },
    {
      "name": "cards-article",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/design-with-artisan/": [
          "#main-content > div.w-full.flex.flex-col.items-center.justify-center.py-10.lg\\:py-20.lg\\:px-20.bg-primary-color-high > div > div.w-full.mx-auto.flex.flex-col.lg\\:flex-row.justify-center.items-center.gap-6",
          "#splide02",
          "#splide03"
        ],
        "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
          "#splide02"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#splide01",
          "#main-content > div:nth-child(13) > div > div.flex.flex-col.lg\\:flex-row.justify-between.w-full.h-full.gap-8.lg\\:gap-6"
        ]
      }
    },
    {
      "name": "carousel-testimonial",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/design-with-artisan/": [
          "#main-content > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ],
        "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:px-20.pt-10.pb-10 > div > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > div:nth-child(11) > div > div.relative.w-full.max-w-screen-1440p.m-auto.pt-10.pb-12.lg\\:pt-16.lg\\:pb-16"
        ]
      }
    },
    {
      "name": "product-configurator",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
          "#main-content > div:nth-child(7)"
        ],
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > div.relative.flex.flex-col"
        ]
      }
    },
    {
      "name": "video-poster",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > div.base-container-background.bg-secondary-color-low.lg\\:pb-20.lg\\:px-20.pt-10.pb-10 > div > div > div.flex.justify-center.items-center.lg\\:w-\\[1062px\\].lg\\:h-\\[597px\\].mx-auto.relative"
        ]
      }
    },
    {
      "name": "accordion-faq",
      "instances": [],
      "pageInstances": {
        "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
          "#main-content > div:nth-child(12) > div > div.grid.grid-cols-1.lg\\:grid-cols-12.gap-y-10.px-4.lg\\:px-20.gap-6"
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
    "https://www.jameshardie.com/": [
      "div.swe_card_container_outer",
      "#modal-base-stories-modal"
    ],
    "https://www.jameshardie.com/all-about-james-hardie/james-hardie-brands/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder"
    ],
    "https://www.jameshardie.com/design-with-artisan/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/hardie-backer-pro-cement-board/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/product-catalog/backer-board-products/hardie-backer-cement-board/": [
      "div.knotch_card_7348e2c4-54cc-4653-b8a0-1dc3f724d23d.knotch_ktag_placeholder",
      "div.onetrust-pc-dark-filter.ot-fade-in",
      "#onetrust-banner-sdk",
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://www.jameshardie.com/resiliency/fire/": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ]
  }
};

const parsers = {
  'hero-video': heroVideoParser,
  'hero-split': heroSplitParser,
  'carousel-hotspot': carouselHotspotParser,
  'tabs-underline': tabsUnderlineParser,
  'carousel-media': carouselMediaParser,
  'embed-video': embedVideoParser,
  'columns-media': columnsMediaParser,
  'gallery-mosaic': galleryMosaicParser,
  'carousel-cards': carouselCardsParser,
  'cards-feature': cardsFeatureParser,
  'cards-video': cardsVideoParser,
  'columns-intro': columnsIntroParser,
  'cards-article': cardsArticleParser,
  'carousel-testimonial': carouselTestimonialParser,
  'product-configurator': productConfiguratorParser,
  'video-poster': videoPosterParser,
  'accordion-faq': accordionFaqParser,
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

