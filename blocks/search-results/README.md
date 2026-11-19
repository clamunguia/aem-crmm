# search-results

Custom **custom** block. Purpose: Filterable results with keyword, sort and category filters and result cards.

## Authoring (Document Authoring)

Model: `configuration`

Key/value rows (label in the first cell, value in the second): config rows (source | JSON index link, limit | n, filter-title | text); single-cell intro rows; result rows: image | title link + text | categories | date.

Site search (`/search`, made by `tools/importer/import-search.js`): `source | /query-index.json` plus category rules.
- **Category rules:** `category | <path prefix> | <label>`, checked in order, give each page a category by its path (`/product-catalog/ | Product catalog`, `/blog | Blog`…). `category-default | <label>` covers the rest.
- **Index:** read in full, even when it is paged. Pages with robots `noindex` are left out.
- **Keyword (`?q=`):** every word must appear in the title, description or path. The default sort, Relevance, ranks title matches first.
- **`?tab=<category>`:** preselects a category. The /blog "View more" link uses `?tab=Blog`.
- Each category shows its number of pages.

## Supported variations

| Variation | Option class |
| --- | --- |
| Alt | `alt` |
| Light | `light` |
| Alt 2 | `alt-2` |

## Universal Editor fields

N/A (Document Authoring project)
