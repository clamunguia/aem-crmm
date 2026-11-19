/* eslint-disable */
/* global WebImporter */
/*
 * Import script for the site search page (/search). The source page renders its results from a
 * search service (601 results in six categories); on EDS the page holds a search-results block that
 * reads the site index (/query-index.json) instead, so only the heading and the configuration are
 * built here. The category rules give each indexed page the source's categories by its path.
 *
 *   node run-bulk-import.js --import-script tools/importer/import-search.bundle.js --urls <file with https://www.jameshardie.com/search/>
 */

const CATEGORY_RULES = [
  ['/product-catalog/', 'Product catalog'],
  ['/statement-collection-colors', 'Color collections'],
  ['/dream-collection-colors', 'Color collections'],
  ['/timberhue-collection-colors', 'Color collections'],
  ['/color-of-the-year', 'Color collections'],
  ['/installation-instructions-technical-docs', 'Tech docs'],
  ['/all-about-james-hardie/press-releases', 'News'],
  ['/blog', 'Blog'],
];

export default {
  transform: ({ document, params }) => {
    const main = document.createElement('div');

    const h1 = document.createElement('h1');
    h1.textContent = 'Search';
    main.append(h1);

    const cells = [
      ['source', '/query-index.json'],
      ['limit', '12'],
      ['filter-title', 'Categories'],
      ...CATEGORY_RULES.map(([prefix, label]) => ['category', prefix, label]),
      ['category-default', 'Additional info'],
    ];
    main.append(WebImporter.Blocks.createBlock(document, { name: 'search-results', cells }));

    const meta = WebImporter.Blocks.createBlock(document, {
      name: 'Metadata',
      cells: [
        ['Title', 'Search | James Hardie'],
        ['Description', 'Search James Hardie products, color collections, technical documentation, blog articles and news.'],
        ['Robots', 'noindex'],
      ],
    });
    main.append(meta);

    return [{ element: main, path: '/search', report: { template: 'search' } }];
  },
};
