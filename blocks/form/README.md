# form

Custom **custom** block. Purpose: Lead-capture and contact form.

## Authoring (Document Authoring)

Model: `configuration`

Two ways to define the fields:

- **Form definition sheet** (recommended, made by the forms importer): the block holds only a link to a `.json` sheet next to the page, for example `get-an-estimate-form.json`. Columns: `Name`, `Type`, `Label`, `Placeholder`, `Mandatory` (`true`), `Options` and `OptionNames` (comma lists of values and visible names), `Value` (default or hidden value), `Description`. A `plain-text` row shows its `Label` as text (`[label](url)` links, blank line between paragraphs). The `submit` row gives the button label, and in `Value` the endpoint the form POSTs `{ data }` JSON to.
- **Field rows** in the block: label | type | options (comma list, "required"); submit row: label | submit | endpoint link; confirmation row; single-cell rows are intro (before fields) or sidebar (after fields).

Without an endpoint the form validates but sends nothing, and says so ("This form is not connected yet"). It never shows a confirmation for a submission that went nowhere.

## Supported variations

| Variation | Option class |
| --- | --- |
| Links Sidebar | `links-sidebar` |
| Alt | `alt` |

## Universal Editor fields

N/A (Document Authoring project)
