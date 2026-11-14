# James Hardie on AEM Edge Delivery Services

Migration of [jameshardie.com](https://www.jameshardie.com/) to AEM Edge Delivery Services (EDS), with content authored in Document Authoring (DA).

| | |
|---|---|
| Code | this repository (`main` ships to the site) |
| Content | DA: `https://da.live/#/clamunguia/aem-crmm` |
| Preview | https://main--aem-crmm--clamunguia.aem.page/ |
| Live | https://main--aem-crmm--clamunguia.aem.live/ |
| Branch preview | `https://<branch>--aem-crmm--clamunguia.aem.page/<path>` |

Code and content have separate lifecycles. Merging to `main` ships code. Content is previewed and published from DA (or the Sidekick), page by page.

---

## 1. Getting started

```sh
npm ci                      # dev dependencies only: there is no build step
npx -y @adobe/aem-cli up    # local server on http://localhost:3000, your code + previewed content
npm run lint                # ESLint + Stylelint (also run by the PR checks)
npm run lint:fix
```

Before changing a block, read its JS, and look at the markup it receives:

```sh
curl http://localhost:3000/<path>.plain.html
```

---

## 2. Repository layout

| Path | What it holds |
|---|---|
| `blocks/<name>/<name>.js` / `.css` | One folder per block. `decorate(block)` gets the authored table as nested `div`s. CSS is scoped to `.<name>`. |
| `scripts/aem.js` | EDS core library. **Vendored: never edit.** |
| `scripts/scripts.js` | Page decoration: auto-blocking, section metadata (`decorateSectionMetadata`), `/widgets/` links → `widget` block. |
| `scripts/block-utils.js` | Shared helpers for blocks (slider, video, image optimisation). |
| `styles/brand.css` | Design tokens: colors, fonts, sizes, layout widths. |
| `styles/styles.css` | Global styles: typography, pill buttons, section styles. |
| `styles/fonts.css` | Web fonts (currently system Helvetica Neue / Arial stack). |
| `icons/*.svg` | Icons, inserted by authors as `:name:` |
| `head.html` | Tags added to every page `<head>`. |
| `tools/importer/` | Migration tooling (not served, see `.hlxignore`). |
| `.hlxignore` | Files that are committed but **not** served. Every other committed file is public. |

Rules of thumb:

- `blocks/fragment/fragment.js` is the only cross-block import. Shared code goes in `scripts/`.
- Authors add and omit cells, so decorate defensively.
- `-wrapper` and `-container` classes belong to sections, not blocks.
- `fstab.yaml`, `helix-query.yaml` and `paths.json` are retired. Site configuration lives at tools.aem.live.

---

## 3. Blocks

Every block's JS starts with a comment describing its authoring structure and options. The DA library (`library/blocks/` in DA) has a real example of each block in use.

### In use on migrated pages

| Block | Purpose |
|---|---|
| `hero-video` | Full-bleed hero with a background video (or photo), headline, text and CTA |
| `hero-split` | Opening banner: text panel beside a full-height photo or video |
| `columns-media` | Text beside a large photo or video |
| `columns-intro` | Heading on the left, copy and CTA on the right |
| `columns` | Plain columns (used by the footer) |
| `cards-feature` | Row of features: icon + heading + text |
| `cards-article` | Article teaser cards (options: `icon`, `icon-2`, `icon-alt`) |
| `cards-video` | Video cards with title and description |
| `carousel-cards` | Heading and intro beside a slider of link cards |
| `carousel-hotspot` | Photo slider with product hotspots |
| `carousel-media` | Slider of photos or video posters with captions |
| `carousel-testimonial` | One quote at a time, with name and portrait |
| `tabs-underline` | Tabs (a panel can load a `/fragments/` page); a single row renders a section heading with a button. Options: `alt`, `alt-2`, `alt-3` |
| `gallery-mosaic` | Edge-to-edge mosaic of project photos |
| `image-lightbox` | Image with a zoom button that opens it full size |
| `video-poster` | Standalone video with a poster and play button |
| `embed-video` | YouTube or Vimeo player |
| `quote` | Pull quote with attribution (option: `alt`) |
| `author-bio` | Blog author name and bio |
| `table-plain` | Plain data table |
| `accordion-faq` | Expandable question / answer rows |
| `product-configurator` | Product panel: image, name, intro, texture / colour pickers |
| `product-specs` | Spec accordion beside an install-resources sidebar |

### Built for pages not migrated yet

| Block | Purpose |
|---|---|
| `cards-product` | Product cards, optionally with a wide promo card |
| `columns-cta` | Side-by-side headings, each with a CTA |
| `columns-stats` | Stat callouts (figure + label) |
| `hero-banner` | Text-only page intro banner |
| `announcement-bar` | Dismissible promo strip (on 279 source pages; not wired into the header yet) |

### Integrations: need a backend service before they work

These render the source site's UI, but the services behind them (search, dealer locator, lead forms, ZIP location) were **not migrated**.

| Block | Purpose |
|---|---|
| `form` | Lead-capture / contact form |
| `dealer-locator` | ZIP + radius dealer search |
| `search-results` | Filterable search results |
| `hero-search` | Contractor-finder hero |
| `color-search` | Colour-name search field |
| `location-indicator` | Visitor's ZIP with a "change location" action |
| `docs-browse-toggle` | Toggle between ways of browsing technical docs |

### Infrastructure

`header` and `footer` load the `nav` and `footer` pages as fragments. `fragment` embeds another page. `widget` is built from `/widgets/` links.

### Section styles

Authors add a **Section Metadata** table with `style | <name>`:

| Style | Look | Defined in |
|---|---|---|
| `light` | Light beige background | `styles/styles.css` |
| `stone` | Stone background | `styles/styles.css` |
| `dark` | Dark background, white text | `styles/styles.css` |
| `brand-green` | Brand green background | `styles/styles.css` |
| `article` | 628 px reading column | `styles/styles.css` |
| `footnotes` | Small italic legal notes (footer only) | `blocks/footer/footer.css` |

---

## 4. Content in DA

```
aem-crmm/
├── index, nav, footer
├── product-catalog, product-catalog/…      catalog and product pages
├── blog/…                                  articles
├── library/                                the team library (see below)
└── shared-media/                           MP4 videos
```

- **Images:** each page keeps its images in a hidden folder next to it (`.index`, `blog/x/.my-article`). Never delete these folders, because the pages point at them. Browse them with the **Media Library**.
- **Videos:** MP4 files go in `shared-media/`, and each file must be **previewed on its own** before a page can play it. The limit is **36 MB**. For longer videos, Adobe recommends YouTube or Vimeo.
- **Library:** the DA editor's tool panel offers:
  - **Blocks:** 17 real examples (`library/blocks/`)
  - **Templates:** Home, Blog article, Product catalog, Product page (`library/templates/`)
  - **Icons:** `:home:`, `:durable:` and the rest (`library/icons/`)
  - **Media Library:** every image and video, with where it is used
- **Inventory:** `library/inventory` is a sheet with tabs for templates, blocks, section styles, icons, images and videos. It lists where each one is used.

---

## 5. Working on code

1. Branch from `main`: `feat/<thing>`, `fix/<thing>` or `chore/<thing>`.
2. Keep each PR to one change. Run `npm run lint` before pushing.
3. Open a PR against `main`, **with test links** in this exact form (PRs without them are rejected):
   ```
   Test URLs:
   - Before: https://main--aem-crmm--clamunguia.aem.page/<path>
   - After: https://<branch>--aem-crmm--clamunguia.aem.page/<path>
   ```
   Use HTML pages only. The PageSpeed check runs on every `aem.page` link in the description, and a JSON link fails it.
4. Checks: `build` (lint) and `aem-psi-check` (Lighthouse on the test URLs). Preview pages always score about 69 on SEO, because previews are `noindex`. That is expected.
5. After a PR is merged, run `git pull` on `main`. Your clone does not update itself.

---

## 6. Migrating more pages

The site catalog (`catalog/`, local only) groups the 294 source pages into templates. Import scripts exist for the three main templates:

| Template | Import script | Pages | Migrated |
|---|---|---|---|
| `landing-photo-hero` | `tools/importer/import-landing-photo-hero.js` | 9 | 9 (8 imported on 2026-11-14, pending upload) |
| `article-split-intro` | `tools/importer/import-article-split-intro.js` | 185 | 3 |
| `product-catalog` | `tools/importer/import-product-catalog.js` | 75 | 3 |
| 12 smaller templates (forms, legal, sitemap…) | not created yet | 26 | 0 |

Work in **batches** (for example 10–20 pages of one template). For each batch:

1. **Import** the URLs with the template's import script. It writes `content/<path>.plain.html`.
2. **Self-host the media.** The importer leaves images and videos on jameshardie.com:
   ```sh
   npm run da:localize -- --urls batch.txt
   ```
3. **Check** the pages locally against the source: blocks load, no empty blocks, no broken images.
4. **Upload** to DA and preview. This previews the videos first, then the pages:
   ```sh
   npm run da:push -- --urls batch.txt --preview
   ```
5. **Review** the preview, then publish from DA or the Sidekick.

`da:push` will not overwrite a page that someone changed in DA. Run `npm run da:pull -- <page>` first to bring DA's version into your workspace. It also refuses pages that still load media from another site, unless you pass `--allow-external`.

**Credentials:** set `DA_TOKEN` (your IMS token) in your own shell. Never commit it or paste it anywhere.

> Upload pages with `da:push`, not the app's upload button. The app re-uploads videos under new names without previewing them, which breaks them.

---

## 7. Known gaps

- **Large videos:** 12 videos over 36 MB still play from jameshardie.com:
  - `/all-about-james-hardie/james-hardie-brands`
  - `/hardie-backer-pro-cement-board`
  - `/product-catalog/backer-board-products/hardie-backer-cement-board`

  They are pending a move to YouTube or Vimeo, or compression.
- **Integrations:** search, dealer locator, lead forms, chatbot and ZIP location are not migrated (see *Integrations* above).
- **Links:** links to pages that are not migrated yet still point to jameshardie.com.
- **Smaller templates:** the 12 smaller templates need block mapping and import scripts before they can be imported.

---

## Further reading

- [Developer tutorial](https://www.aem.live/developer/tutorial)
- [Anatomy of a project](https://www.aem.live/developer/anatomy-of-a-project)
- [Markup, sections, blocks and auto blocking](https://www.aem.live/developer/markup-sections-blocks)
- [Keeping it 100 (performance)](https://www.aem.live/developer/keeping-it-100)
- [Media assets and limits](https://www.aem.live/docs/media)
- [Setting up the DA library](https://www.aem.live/docs/ew/administering/set-up-library)
