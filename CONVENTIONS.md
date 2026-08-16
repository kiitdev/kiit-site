# Kiit Site Conventions

This documents the conventions established while building out the Docusaurus-based
kiit.dev redesign, starting with the `kiit-codes` docs page. Follow these when adding
new doc pages (starting with `kiit-result`) or extending existing ones.

## 1. Terminology

1. **Section** — an H2 heading on a doc page (`Overview`, `Setup`, `Concepts`,
   `Design`, `Tutorial`, `Guide`). Matches the docs template's own vocabulary.
2. **Topic** — an H3 heading nested under a Section (e.g. `Goals`, `Install`,
   `Terms`, `Tiers`). Always belongs to exactly one Section.

## 2. Docs Page Structure

1. **Fixed Section order** — every module docs page follows the same skeleton:
   `Overview → Setup → Concepts → Design → Tutorial → Guide`, per
   `_templates/docs-template.md`. Don't reorder or skip a Section.
2. **Diátaxis discipline per Section** — `Concepts` is bare reference only (no
   rationale, no narrative). `Design` is rationale/explanation only (no
   step-by-step instructions). `Tutorial` is the one guided, hands-on first win,
   requiring no prior Concepts/Design knowledge. `Guide` is how-to, assuming
   existing competence.
3. **Versioned URL path** — the intended final URL shape is `/docs/v1/{module}`
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
   a hoped-for future section.
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
4. **Site font is set once, globally, with an easy-revert comment** — the
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
2. **Emoji live in the TOC only, applied positionally via CSS** — a `::before`
   pseudo-element keyed to each top-level TOC entry's position
   (`:nth-child(1)` through `(6)`), not its text content. This only stays
   correct as long as every doc page follows the fixed 6-Section order from
   Section 2.1 — if that order ever changes, the CSS needs updating to
   match.

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
