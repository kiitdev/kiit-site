# Kiit Site Conventions

This documents the conventions established while building out the Docusaurus-based
kiit.dev redesign, starting with the `kiit-codes` docs page. Follow these when adding
new doc pages (starting with `kiit-result`) or extending existing ones.

## 1. Terminology

### Page content

Listed in top-to-bottom order as they appear on the page:

1. **Page Title** — the H1, with the module's logo beside it (the
   `PageTitle` component).
2. **Page Tagline** — the styled one-line description directly under the
   Page Title (rendered via the `.kiit-tagline` class), summarizing what the
   module is in a single sentence.
3. **Page Description** — a plain, unstyled 1-2 line paragraph directly under
   the Page Tagline, giving a bit more detail than the Tagline without
   turning into full `Overview` prose. Not a special component — just a
   regular paragraph, so it reads as secondary to the styled Tagline above
   it.
4. **Header Diagram** — the large image directly under the Page Description,
   before `Overview` starts. Distinct from a diagram embedded within a
   specific Topic further down the page (e.g. the taxonomy diagram inside
   `Taxonomy`).
5. **Section** — an H2 heading on a doc page (`Overview`, `Setup`, `Explanation`,
   `Tutorial`, `Guide`, `Reference`, `Design`). Matches the docs template's own vocabulary.
6. **Topic** — an H3 heading nested under a Section (e.g. `Goals`, `Install`,
   `Terms`, `Tiers`). Always belongs to exactly one Section.
7. **Heading Anchor** — the "#" link that appears next to a Section heading
   in the page body, linking to that Section's own URL fragment.

### Site chrome (Docusaurus's own terms, used consistently rather than
### reinvented)

8. **Sidebar** — the left-hand doc navigation column.
9. **TOC** (Table of Contents) — the right-hand navigation column, listing
   the current page's Sections and Topics.
10. **Breadcrumbs** — the page-location trail above the Page Title (e.g.
    `Foundations / kiit-codes`).
11. **Navbar** — the site-wide top bar (`Kiit` / `Docs` / `Blog` / `GitHub`).

### Sidebar & TOC internals

12. **Sidebar Group** — a category label in the left Sidebar (e.g.
    `Foundations`), grouping one or more doc pages together. Deliberately
    *not* called "Section" — that term is reserved for an H2 within a page's
    body, and reusing it here would be genuinely ambiguous: a Sidebar Group
    organizes doc *pages*, a Section is a heading *within* one page.
13. **Sidebar Item** — an individual doc-page link inside the Sidebar (e.g.
    `kiit-codes`), whether or not it sits inside a Sidebar Group.
14. **TOC Entry** — a single link within the TOC, at either the Section or
    Topic level.
15. **Section Icon** — the small emoji glyph prefixed to a Section's TOC
    Entry (applied via CSS keyed to the Section's anchor, see Section 8.2 below). Distinct
    from the general-purpose `Icon` component, which wraps Tabler icons for
    use in page body content, not the TOC.

## 2. Docs Page Structure

1. **Fixed Section order** — every module docs page follows the same skeleton:
   `Overview → Setup → Explanation → Tutorial → Guide → Reference → Design`, then
   `FAQ`.
   Don't reorder or skip a Section. The order reads as: what it is, get it
   running, the vocabulary, a first walkthrough, tasks you'll do, and only
   then why it's built this way. `Design` comes after `Guide` because a
   first-time reader needs its rationale least, and it overlaps `Overview`'s
   Goals. Status: `kiit-codes` follows this order. `kiit-result` and
   `_templates/docs-template.md` still have `Design` before `Tutorial`, no
   `Reference`, and call the Section `Concepts`. They move when updated.
2. **Diátaxis discipline per Section** — `Explanation` explains what each thing
   is, briefly (no member lists, no rationale). `Reference` is lookup tables
   only: the full code catalog, fields, mappings (no narrative). `Design` is
   rationale/explanation only (no step-by-step instructions). `Tutorial` is the one guided, hands-on first win,
   requiring no prior Explanation/Design knowledge. `Guide` is how-to, assuming
   existing competence.
3. **Guide is depth of usage, task-first** — each Topic names the task it helps
   with, explains it thoroughly with an example (options, edge cases,
   alternatives), and links to `Design` for the why. Rationale that isn't
   needed to finish the task belongs in `Design`, not here.
4. **Explanation and Design are the explanation Sections** — what things
   are (`Explanation`) and why (`Design`), in prose. Illustrative code is allowed, kept small. It never tells the reader
   to follow steps, since that makes it a how-to (`Guide`) or a walkthrough
   (`Tutorial`).
5. **Code mostly lives in Setup, Tutorial and Guide** — a guideline, not a
   hard rule. `Explanation` is short prose, diagrams and tables, `Reference` is
   tables, and `Design` is prose and diagrams, so they usually don't need
   code. Add a short block there when it explains the point better than a
   table would (for example the fields every Status carries). Prefer a table
   for an API shape, and keep any block in those Sections small.
6. **Setup Topics** — `Install` (the code, plus a table of the published
   artifacts by language), `Imports`, `Source`, `Example`.
7. **Code examples come from the sample apps** — a code block in the page is
   an `<Example section="..." topic="..." />` (see Section 4 and `SETUP.md`),
   not code typed into the page, so the docs can't drift from the library. A
   block that is still hand-written is being converted, one Topic at a time.
8. **Versioned URL path** — the intended final URL shape is `/docs/v1/{module}`
   once the two-instance versioned docs plugin setup lands (Step 4 of the
   redesign plan). Until then, pages live under the default single docs
   instance with an explicit `slug` frontmatter field pinning the URL (see
   Section 3.1).

## 3. File & Frontmatter Conventions

1. **`slug` frontmatter to pin URLs** — when a doc file moves into a category
   subfolder (e.g. `docs/foundations/kiit-codes.md`), add
   `slug: /kiit-codes` to the frontmatter so the public URL doesn't change,
   even though the file's on-disk path did.
2. **`_category_.json` for Section groups in the left sidebar** — e.g.
   `docs/foundations/_category_.json` with `{"label": "Foundations",
   "collapsible": false}`. Non-collapsible, since it's meant to read as a
   static group label, not an interactive dropdown.
3. **`_archive/` holds retired content, trimmed to what's still useful** — the
   old Hugo/Jekyll site's generated HTML output, unused themes (`perfo`), and
   legacy Jekyll source were deleted outright rather than archived. Only
   genuinely reusable source material (e.g. old blog post drafts, old
   architecture doc source) is worth keeping there.
4. **`hide_title: true` whenever the Page Title is a component, not markdown**
   — Docusaurus auto-injects an `<h1>` from the frontmatter `title` field
   whenever it doesn't detect a literal `# Heading` at the start of the
   content. Once the Page Title is rendered via the `PageTitle` component
   instead of `# kiit-codes`, that detection no longer fires, so without
   `hide_title: true` the page ends up with two H1s.

## 4. React Components

All components live under `src/components/<Name>/` (an `index.tsx` +
`styles.module.css` pair) and are imported explicitly per-doc-page via MDX,
never registered globally.

1. **`GroupBadge`** — solid colored pill for a Passed/Failed group name (e.g.
   `Succeeded`, `Restricted`), colors matched exactly to the taxonomy
   diagram's group-header pills (`src/theme/groupColors.ts`). White text
   always, matching the diagram, even where that's not the most
   accessible choice for smaller text — deliberately prioritizing visual
   match to the diagram here.
2. **`CodeBadge`** — a single neutral gray pill (not colored per group) for an
   individual code name (e.g. `SUCCESS`, `DENIED`). Fixed width so a column
   of them lines up. Shape borrowed from the active-breadcrumb pill style,
   softened (muted gray instead of bold primary blue, since bold+blue read
   as too strong repeated down a whole table column).
3. **`ConceptTermLink`** — bold, monospace link to a term's exact source
   location on GitHub (file, and a `#L<N>` line anchor for a specific
   field/class where one exists). No border/background box — Infima's
   default inline `<code>` styling includes both, which reads as too busy
   across an entire table column.
4. **`MoreLink`** — small pill-button link to a term's dedicated in-page
   section, visually matching `BackToTop`. Only rendered when a genuine
   matching section actually exists on the page — never a dangling link to
   a hoped-for future section. Takes an optional `label` (defaults to
   "More") and `variant` (`"accent"` default pill, or `"green"` — the same
   pastel-bg/dark-text pairing as the Passed status pill, not a solid fill).
   Used with `label="Docs"` `variant="green"` on the homepage module cards
   to link into that module's docs page, and only rendered there when a
   `docsUrl` actually exists. kiit-result has no docs page yet, so its
   `docsUrl` is a placeholder pointing at the generic `/docs/intro` landing
   page — fix once kiit-result's real docs page is built.
5. **`BackToTop`** — pill button, scrolls to the top of the page. Placed once
   after every Section's content, including the last Section on the page
   (for consistency), not just Sections that happen to have a following
   Section.
6. **`Spacer`** — pure vertical whitespace (`2rem`), no visible line. Placed
   before every Topic except the first one under each Section (that one
   doesn't need it — the Section heading above it already provides
   separation). Deliberately *not* used between Sections, since `BackToTop`
   already provides a break there; using both would be redundant spacing.
7. **`Icon`** — generic wrapper around Tabler Icons, resolved via a canonical
   name registry (`src/theme/icons.ts`), never imported directly from
   `@tabler/icons-react` at a call site. Swapping the underlying icon
   library later only means editing that one registry file.
8. **`PageTitle`** — renders the Page Title: the H1 with the module's logo
   beside it (`title`/`logo` props). Replaces the plain `# Module Name`
   markdown heading, so the doc's frontmatter needs `hide_title: true` (see
   Section 3.4) wherever it's used. Safe to do — Docusaurus's own `Heading`
   component is a no-op for H1 (no id/anchor generation happens for it
   either way), so this produces identical H1 behavior to the markdown
   syntax it replaces.

9. **`Example`** — shows a code example in one tab per language (Kotlin, Java,
   TypeScript, Swift), looked up by `section` and `topic`. The code comes
   from the kiit-codes sample apps through `npm run examples`, see
   `SETUP.md`. An unknown `section`/`topic` throws, so a typo fails the build.
   A code block title only shows when a language has several blocks.
10. **`TocCollapse`** — the state and the "Expand all / Collapse all" buttons
    for the right-hand TOC. Used by the swizzled `TOC` and `TOCItems/Tree`
    (Section 11), not imported by a doc page.

## 5. Theming & Color

1. **Group colors match the taxonomy diagram exactly** — `groupColors` in
   `src/theme/groupColors.ts` is the single source of truth, keyed by group
   name (`Succeeded`, `Pending`, `Excluded`, `Information`, `Restricted`,
   `Invalid`, `Rejected`, `Unserved`).
2. **Code chips are intentionally not color-coded per group** — one neutral
   gray style for every code, so the Group column (colored) carries the
   visual weight and the Code column stays calm, secondary detail.
3. **Primary blue is accessibility-calibrated, not the raw brand hex** — the
   literal brand color `#5e72e4` only clears ~4.2:1 contrast against white,
   short of the 4.5:1 needed for body text. Light mode uses a slightly
   darkened value, dark mode a slightly lightened one; the true undiluted
   hex stays available as `--kiit-color-brand` for decorative,
   non-text use (logos, hero art).
4. **Named color tokens, not raw hex or bare Infima variables, at each call
   site** — every recurring color has one semantic name in
   `src/css/custom.css`, so a CSS rule reads as "this is the heading accent"
   rather than "this happens to be the same value as the primary color":
   - `--kiit-color-brand` (`#5e72e4`) — the undiluted brand hex, decorative
     use only (logos, hero art), not accessibility-calibrated for text.
   - `--kiit-color-heading-accent` (aliases `--ifm-color-primary`) — the blue
     used for the H2 "#" heading anchor, Sidebar Group titles (e.g.
     "Foundations"), and Topic (H3) headings. Named separately from
     `--ifm-color-primary` even though it's the same value, since those three
     usages are a deliberate shared design choice, not incidental reuse.
   - `--kiit-color-accent` (`#f53da8`, fuchsia) — used as the solid fill
     for the `MoreLink`/`BackToTop` pill buttons, giving them a distinct
     identity from primary-blue links and headings. `-dark`/`-darker`
     variants (`#cc0c7b`/`#99085d`) are the AA-calibrated shades actually
     used for the button fill and its hover state; the raw `--kiit-color-accent`
     only clears ~3:1 contrast against white text, short of the 4.5:1 small
     text needs, same reasoning as item 3 above for the primary blue.
   - `--kiit-color-accent-orange` (`#f8a13e`) — carried over from the live
     site's palette, defined but not yet applied to any specific UI element.
5. **Site font is set once, globally, with an easy-revert comment** — the
   active choice (currently Nunito, both body and headings) lives in
   `src/css/custom.css`'s `@import` and `--ifm-font-family-base` /
   `--ifm-heading-font-family` values. When trying a new font, leave the
   previous working `@import` line commented out directly above the new one
   rather than deleting it, so reverting is a two-line change.

## 6. Table Formatting

1. **Number list-like tables, don't number tables with a natural key column**
   — tables that are genuinely enumerable lists (`Resources`, `Inspiration`,
   `Terms`) get a leading `#` column. Tables where the first column already
   serves as a natural key (`Group`/`Code` in the Passed/Failed tables,
   `Type` in Protocol mapping, `Variant` in the `Err` table) don't get a
   redundant `#` on top of that.
2. **Every table is forced to full content-column width** — Infima's default
   table sizing shrinks to fit content, making short tables look noticeably
   narrower than long ones. A single global rule
   (`.theme-doc-markdown table { width: 100% }`) overrides this everywhere.
3. **Repeated group values collapse to the first row only** — in the
   Passed/Failed code tables (`Group | Code | Description`), the `Group`
   cell (rendered via `GroupBadge`) only appears on that group's first row;
   subsequent rows for the same group leave that cell blank rather than
   repeating the badge.

4. **The Defaults table shows the group on every row** — `Reference > Defaults`
   (`Group | Alias | Code | Description`) has exactly one row per group, so
   the `GroupBadge` repeats instead of collapsing to a first row as in the
   Passed/Failed tables. Its Descriptions are the codes' own messages, the
   same text as in those tables.

## 7. Linking & Cross-References

1. **Source links use the right GitHub URL shape for what they point at** —
   `blob/main/<path>/File.kt#L<N>` for a specific file or field/class
   (blob view, optionally with a line anchor); `tree/main/<path>` for a
   folder (directory listing view, never a line anchor).
2. **Internal `#anchor` links only exist when the destination is real** — no
   speculative links to a section that "will probably exist later." When a
   term's related content moves to a different Section, its `MoreLink`
   target gets updated in the same change, not left stale.

## 8. Headings & Anchors

1. **No emoji in page-body headings** — this breaks Docusaurus's anchor-id
   slug generation (e.g. `## 🎓 Tutorial` slugs to `-tutorial`, not
   `tutorial`, breaking every `#tutorial`-style link), and the standard
   markdown fix for that (`{#tutorial}`) in turn breaks MDX parsing in any
   file that already uses JSX components — which every doc page here does.
2. **Emoji live in the TOC only, keyed to the Section's anchor via CSS** — a
   `::before` pseudo-element on each top-level TOC entry's link, matched by
   its anchor (`a[href$='#design']`, `#tutorial`, ...), not by its position or
   its text. That keeps the order of the Sections free to change, and a page
   with fewer than all the Sections still gets the right emoji.

## 9. Blog

1. **All posts dated within 2026** — filenames use `2026-01-0N-slug.mdx`,
   sequential, regardless of when they're actually written.
2. **Single shared author** — `kiit` ("Kiit Team") in `blog/authors.yml`, not
   individual named authors.
3. **A small, fixed tag set** — `announcement`, `kiit`, `kiit-codes`,
   `kiit-result` in `blog/tags.yml`. Add a new tag only when a real
   recurring topic needs one, not per-post.

## 10. Build, Verification & Workflow

1. **Typecheck after every change** — `npm run typecheck` (fast, catches
   component prop mismatches and import errors) runs after essentially
   every edit, even pure-CSS ones.
2. **A full `npm run build` for anything touching links, anchors, or content**
   — `npm run typecheck` alone won't catch a broken `#anchor` reference or
   an MDX parsing error; a full build is the only way to be sure those are
   clean, since Docusaurus fails the build on broken internal links/anchors
   by default.
3. **The dev server stays running across a work session** — rather than
   spinning up a fresh build for every small verification, `npm start` runs
   once in the background and Fast Refresh picks up changes live. A full
   `npm run build` is still used periodically for the broken-link/anchor
   check above, since dev mode doesn't catch those the same way.
4. **No git commits or pushes performed on the user's behalf** — all
   commits, pushes, and branch operations are left for the user to do
   themselves.

## 11. Swizzled Theme Files

Copies of `@docusaurus/theme-classic` files (currently 3.10.2) that this site
changes. Everything not listed here is the stock theme.

1. **`src/theme/TOC/`** — adds the collapse provider and the "Expand all /
   Collapse all" buttons to the right-hand TOC.
2. **`src/theme/TOCItems/Tree.tsx`** — adds a toggle button to each Section
   entry that has Topics, and hides its Topics while collapsed. Without a
   provider (mobile and inline TOCs) it renders like the original.
3. **Upgrades:** on a Docusaurus upgrade, diff these files against the new
   originals.
4. **Restart the dev server** after adding or removing a file under
   `src/theme/`. Docusaurus reads theme overrides at startup and hot reload
   doesn't see new ones.
