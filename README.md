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
| `icons/*.svg` | 90 icons, mostly copied from `jameshardie.com/icons/` (names lowercased with hyphens). Authors insert them as `:name:`. The full list, with each icon's source URL, is in DA `library/inventory`, tab `icons`. `*-white` icons are meant for dark backgrounds. |
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
| `cards-article` | Article teaser cards (options: `icon`, `icon-2`, `icon-alt`, `featured`, `light`) |
| `article-list` | Lists a folder's published articles as cards, 15 per page, with pagination (`?page=2`). Reads the site index. Rows: `folder`, `per-page`, `exclude` |
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
| `product-configurator` | Product panel: image, name, intro, texture / colour pickers. The house and texture images are PNGs with transparent siding. The colours come from the `/colors` sheet (columns `Name`, `Color` as a hex value, `Param`, `Collection`, `Family`):
- Rows with an empty `Family` are the Statement Collection®. Each colour choice named there shows a chip.
- Rows with a `Family` (green, brown…) are the Dream Collection®, 686 colours. A group whose choices are family names becomes a family filter. It shows that family's colour dots (with the name on hover) and a "Find colors by name" search within the family, as on the source.
- Picking a colour paints the siding and sets `?color=<Param>` (and `?family=` for Dream), so the link opens with the same colour. To add or change a colour, edit the sheet; the product pages don't need republishing. The local copy is `content/colors.json`.

Texture choices link to their texture page (for example Hardie® Panel → `/…/hardie-panel-siding/stucco`). A click loads that page's configurator in place and updates the address, keeping `?color=`. That is how a Dream-only texture such as Stucco brings its own colours. On a texture page its own texture is marked as selected. |
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
| `form` | Lead-capture / contact form. Fields come from a form definition sheet (`<page>-form.json` next to the page, made with the forms importer) or from rows in the block; see `blocks/form/README.md`. First use: `/get-an-estimate` (`get-an-estimate-form.json`). **No endpoint is set yet**, so the form validates but sends nothing and says so. The source posts to Salesforce from its own page code; choose the destination (Salesforce Web-to-Lead, Marketo, or a forms service) and put its URL in the `submit` row's `Value`. |
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
- **Videos:** MP4 files go in `shared-media/`, and each file must be **previewed on its own** before a page can play it. The limit is **36 MB**. Compress larger files first (see *Known gaps → Resolved*), or use YouTube or Vimeo, which Adobe recommends for long videos.
- **Library:** the DA editor's tool panel offers:
  - **Blocks:** 17 real examples (`library/blocks/`)
  - **Templates:** Home, Blog article, Product catalog, Product page (`library/templates/`)
  - **Icons:** all 90, such as `:home:`, `:socialmedia-youtube-white:` or `:menu-mobile:` (`library/icons/`)
  - **Media Library:** every image and video, with where it is used
- **Inventory:** `library/inventory` is a sheet with tabs for templates, blocks, section styles, icons, images and videos. It lists where each one is used.
- **Site index:** `/query-index.json` lists every **published** page: path, title, image, description, robots and lastModified. It leaves out the nav, footer, `library/`, `fragments/` and `drafts/`. Pages enter it when they are published and leave it when they are unpublished, and previewed-only pages are never in it.
  - **Configuration:** it lives in the site configuration (Admin API `config/<org>/sites/<site>/content/query.yaml`), not in the repo. A copy is in `migration-work/config/query.yaml`.
  - **Used by:** the `article-list` block.
  - **Check a page's entry:** `https://admin.hlx.page/index/clamunguia/aem-crmm/main/<path>`.

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

The site catalog (`catalog/`, local only) groups the 294 source pages into templates. Import scripts exist for the three main templates, plus one for the main blog page:

| Template | Import script | Pages | Migrated |
|---|---|---|---|
| `landing-photo-hero` | `tools/importer/import-landing-photo-hero.js` | 9 | 9 |
| `article-split-intro` | `tools/importer/import-article-split-intro.js` | 185 | 177 (blog articles and the article-style pages without forms) |
| `product-catalog` | `tools/importer/import-product-catalog.js` | 75 | 71 (product pages and the blog section index pages) |
| `blog-home` | `tools/importer/import-blog-home.js` | 1 | 1 (`/blog`) |
| `small-pages` | `tools/importer/import-small-pages.js` | 18 | 18 (the small templates' pages without forms) |
| Pages with forms (Marketo, search, dealer locator) | not created yet | ~15 | 1 (`/get-an-estimate`, see the `form` block) |

`small-pages` covers the 18 pages without forms of the ten small catalog templates (legal pages, sitemap, FAQ, safety resources, Why James Hardie sub-pages and some landings). They have no import script of their own. This one uses each page's catalog block selectors (`pageInstances`) for blocks with a parser, plus the generic section rules of `landing-photo-hero`. Three rules from the other templates fix the catalog's labels: text cards in a `.cards-container` are `cards-feature`, an `<ol>` of figures is `columns-stats`, and a `hero-split` with no heading is a `quote`. Consecutive `accordion-faq` blocks are joined, so the FAQ has one accordion per category. The notes at the top of the script explain how its `PAGE_TEMPLATE` was built from the catalog; to add a page, build its entries the same way rather than writing selectors by hand.

`blog-home` covers `/blog` only. The catalog puts that page in `form-left-heading` with five form pages, but it has no form: it is built from existing blocks (`hero-split`, `tabs-underline`, `cards-article`, `columns-media`, `carousel-media`), so it has its own small import script with the page's catalog selectors.

Work in **batches** (for example 10–20 pages of one template). For each batch:

1. **Import** the URLs with the template's import script. It writes `content/<path>.plain.html`.
2. **Clean up** what the importer leaves behind: links with no address, such as the source's "English / Français (Canada)" language switcher, and links split around a ™/® superscript ("Trim-Over", "™", "Installation Method" as three links become one).
   ```sh
   npm run da:clean -- --urls batch.txt
   ```
3. **Self-host the media.** The importer leaves images and videos on jameshardie.com. Images over 20 MB and videos over 36 MB are reported, so resize or compress them before uploading. The tool checks sizes before and during each download: it never downloads an image over 20 MB or a video over 300 MB (one source video is 5 GB). Those keep their source URL and are reported. Site-relative image paths on a source page (`/images/textures/…`) resolve against jameshardie.com.
   ```sh
   npm run da:localize -- --urls batch.txt
   ```
4. **Point links at migrated pages.** Links to jameshardie.com pages that already exist on our site become internal links (`https://www.jameshardie.com/product-catalog/` → `/product-catalog`). Site-relative links copied from the source, such as the category link `/blog/siding-durability/`, lose the trailing slash, because EDS answers 404 for a page path that ends in `/`. Links to pages not migrated yet are left as they are, so a relative one gives a 404 until that page is migrated.
   ```sh
   npm run da:relink -- --urls batch.txt   # the new pages
   npm run da:relink -- --all              # older pages that link to the new ones
   ```
   **Safe for live pages:** a page that is already published only gets links to pages that are published too. Its other links are listed as `WAITING` and get converted on a later run, after their target is published. Run `da:relink -- --all` again after each publish. `CHECK` flags a link to a `#section` the target page doesn't have, because the importer renames section ids from their headings. Point it at the right id by hand.
5. **Check** the pages locally against the source: blocks load, no empty blocks, no broken images.
6. **Upload** to DA and preview. This previews the videos first, then the pages:
   ```sh
   npm run da:push -- --urls batch.txt --preview
   ```
   Pages that `--all` relinked were already in DA, so `da:push` skips them. Check them, then push them with `--force`.
   After the preview, make sure no image came out as `about:error` (the preview could not fetch it). If one did, preview that page again before publishing.
7. **Update the inventory** and upload it to DA (`content/library/inventory.json` → `library/inventory`):
   ```sh
   npm run da:inventory
   ```
8. **Review** the preview, then publish from DA or the Sidekick, **in this order**:
   1. **The new pages first.** Until they are live, any link to them 404s on the live site.
   2. **Then the older pages that link to them** (the ones `--all` relinked). Run `npm run da:relink -- --all` once more first: links that were `WAITING` for these new pages are converted now. Push those pages with `--force --preview`, then publish them.
   3. **Section index pages** (`article-list`) need no republish. Their list reads the site index, which updates by itself when an article is published or unpublished.

   To check a page is live before linking to it: `https://admin.hlx.page/status/clamunguia/aem-crmm/main/<path>` (`live.status` 200).
9. **Update the redirects** once the batch is live, then upload `content/redirects.json` to DA as `/redirects` and publish it:
   ```sh
   npm run da:redirects
   ```

### Redirects

Every source URL ends in `/` (`/faq/`), and EDS answers 404 for a page path with a trailing slash. Before the jameshardie.com domain points at EDS, the old URLs must redirect (301) to the new ones. Otherwise links from search engines, emails and other sites break, and pages lose their search ranking.

- `da:redirects` builds `content/redirects.json` (the EDS redirects sheet, columns `Source` and `Destination`):
  - Every catalog URL whose page is published maps to its EDS path, without the trailing slash and in lowercase (`/blog/…/vision-house-Sussex/` → `…-sussex`).
  - It adds the lines of `tools/importer/da-sync/redirects-extra.txt` whose new path is published, in both slash forms. These are old paths the source site already redirects (`/prosHub`, `/term-conditions/`…) and blog category paths that do not exist.
  - The run stops if a `Source` is itself a published page, or if a `Destination` is not published.
- The sheet only covers paths it lists. A rule at the CDN in front of the domain that drops the trailing slash from any path covers the rest, including pages outside the catalog. Use both.

Batch lists live in `migration-work/batches/` (local only). For example, `articles-batch-1.txt` holds the first 20 "Explore Exterior Design" articles.

`da:push` will not overwrite a page that someone changed in DA. Run `npm run da:pull -- <page>` first to bring DA's version into your workspace. It also refuses pages that still load media from another site, unless you pass `--allow-external`.

**Credentials:** set `DA_TOKEN` (your IMS token) in your own shell. Never commit it or paste it anywhere.

> Upload pages with `da:push`, not the app's upload button. The app re-uploads videos under new names without previewing them, which breaks them.

---

## 7. Known gaps

- **Not published yet:** the 35 migrated pages, the nav and the footer are on preview only. Live still serves the old portfolio home page, nav and footer until they are published.
- **Remaining pages:** 260 source pages are not migrated yet: 162 articles, 72 catalog and product pages, and the 26 pages of the 12 smaller templates. Those templates need block mapping and import scripts before they can be imported.
- **Integrations:** search, dealer locator, lead forms, chatbot and ZIP location are not migrated (see *Integrations* above). The "Do Not Sell My Personal Information" consent link is not in the footer either. The `announcement-bar` block exists but is not wired into the header.
- **Links and documents:** links to pages that are not migrated yet still point to jameshardie.com. So do 2 PDFs linked from the footer's bottom bar: the California Supply Chain Transparency Act and the Canadian Forced Labour Report.

### Resolved

- **Large videos (2026-11-17):** the 12 videos over 36 MB were compressed to 14–31 MB and now play from `shared-media/`. The tool was ffmpeg, two-pass H.264 aiming at about 32 MB, with `+faststart`. Videos up to about 90 s keep 1080p, and longer ones go to 720p. Muted background loops (`hero-video`) drop their audio track. Before/after sizes are in the `videos` tab of `library/inventory`. Use the same approach for any new video over 36 MB. On 2026-11-19, 10 more videos (44–184 MB, on the article-style pages) were compressed the same way to 31–32 MB. Three are too large to download and still play from the source: the Habitat for Humanity documentary (5.4 GB), the Alliance hype video (386 MB) and the Florida realtor guide video (336 MB).

---

## Further reading

- [Developer tutorial](https://www.aem.live/developer/tutorial)
- [Anatomy of a project](https://www.aem.live/developer/anatomy-of-a-project)
- [Markup, sections, blocks and auto blocking](https://www.aem.live/developer/markup-sections-blocks)
- [Keeping it 100 (performance)](https://www.aem.live/developer/keeping-it-100)
- [Media assets and limits](https://www.aem.live/docs/media)
- [Setting up the DA library](https://www.aem.live/docs/ew/administering/set-up-library)
