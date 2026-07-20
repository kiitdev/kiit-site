# Hugo Site Conventions (`wavo` theme)

Reference notes on how this site actually works, distilled while building the blog section
(`content/blog/`). Read this before adding or editing content — several of these are not
enforced by any CSS/Hugo config, they're just conventions every existing page happens to follow.

## Content authoring conventions

These apply to any page body (`content/**/*.md`), not just blog posts.

### 1. Use `#` (H1) for section headings, not `##`

There is no site-wide CSS rule for `h2`. The bold, colored section headings you see throughout
the site (e.g. `/start/overview`) come from a single global rule:

```css
h1 { color: #494e6b; font-weight: bold; }
```

Every page's own layout banner *also* renders an `<h1>` for the page title, so pages end up with
multiple `<h1>`s — that's expected here, not a bug to fix. Section headings in the body should
still be `#`, never `##`/`##`.

Give every heading an explicit anchor id, especially if the heading text has punctuation
(`#`, `:`, `'`) that would otherwise produce an unpredictable auto-generated slug:

```md
# Use case 1: Validation {#use-case-1-validation}
```

### 2. End every section with `{{% section-end mod="<section>/<slug>" %}}`

This shortcode (`themes/wavo/layouts/shortcodes/section-end.html`) adds the vertical spacing
between sections *and* a "Back to top" link:

```html
<br/>
<a href="{{.Get "mod" }}#overview" class="sk-back-to-top">Back to top </a>
<br/><br/><br/><br/>
```

Notes:
- `mod` must be the page's own section/slug path (e.g. `blog/kiit-codes`, `start/overview`) — it's
  prepended to a hardcoded `#overview` anchor, not templated per-section.
- Because the back-to-top link always targets `#overview`, **every page must have a heading
  anchored `#overview`** — by convention this is the page's first section (see `# Overview` on
  `start/overview.md`, `arch/results.md`, and the blog archetype).
- A shorter shortcode, `{{% break %}}`, just adds `<br/><br/>` with no back-to-top link — used
  between sub-elements *within* a section rather than at the end of one.
- `{{% feature-end mod="..." %}}` is a variant used for sub-feature subsections (adds both
  "Back to features" and "Back to top" links) — see `arch.md`/`core.md` archetypes.

### 3. Fenced code blocks need manual blank-line + indent padding

There is no CSS padding/margin on `.chroma`/`pre` (only `pre { border-radius: 10px; }`). Every
code block on the site fakes visual padding with literal whitespace inside the fence: a blank
line right after the opening fence, the code indented 4 spaces, and a blank line before the
closing fence:

````md
```kotlin

    val x = 1

```
````

Plain triple-backtick fences get identical Chroma/Pygments highlighting to the `{{< highlight
LANG >}}` shortcode (`pygmentsCodefences = true` in `config.toml`), so either is fine — just keep
the blank-line/indent convention either way.

### 4. Lists → tables, not markdown bullets

There's no styling for generic `ul`/`li` in body content (only the sidebar nav's `ul`/`li` is
styled). Plain markdown `-`/`*`/`1.` lists render with unstyled, small, misaligned browser-default
bullets. The site's actual convention for anything list-like is an HTML table:

```html
<table class="table table-bordered table-striped">
    <tr>
        <td><strong>Name</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td><strong>Item</strong></td>
        <td>Description text</td>
    </tr>
</table>
```

See the Goals/Uses tables on `/start/overview` or the Design table on `/arch/results`. A short
numbered sequence with no real "description" per item (e.g. a 3-step CLI walkthrough) is
sometimes written as plain numbered lines with `<br/>` instead of `<li>` — see
`content/info/license.md` — but a table is the safer default for anything with a label +
description shape.

## Sidebar table-of-contents (`archComponent`)

The right-hand sidebar TOC is **not** Hugo-native and **not** derived from headings automatically.
It's a hand-wired JS mechanism:

- `themes/wavo/layouts/partials/sidebar.html` renders an empty `#sk_arch_component_menu_sections`
  container.
- `themes/wavo/static/assets/app/slatekit.js`'s `buildArchComponent()` reads a page-local
  `archComponent` JS object and injects the sidebar links client-side, on `$(document).ready`.
- Every page that wants the sidebar must define its own object at the bottom of its markdown body:

```html
<script>
    var archComponent = {
        name: "Page Name",
        page: "section/slug",
        icon: "assets/media/img/white/notes.png",
        menu: {
            mode: "normal",
            useTemplate: false,
            sections: [
                { name: "In this post", items: [
                    { name: "Overview", anchor: "#overview" },
                    { name: "Next Heading", anchor: "#next-heading" }
                ]}
            ]
        }
    };
    function setupArchComponent() { buildArchComponent(archComponent); }
</script>
```

- Sidebar links are built as `archComp.page + item.anchor`, so `anchor` values must exactly match
  the `{#id}` you gave each heading, and `page` must match the page's own URL path.
- Only section templates that include `{{ partial "sidebar.html" . }}` render this column at all
  (currently: `start`, `arch`, `tests`, `blog`). `info`/`utils` don't have a sidebar column.

## Layout / template mechanics

- **No shared `baseof.html`.** Each section (`start`, `arch`, `info`, `blog`, ...) has its own
  standalone `layouts/<section>/single.html` with the full page shell (head/nav/content/footer).
  There's no `{{ block }}` inheritance to rely on — copy an existing section's `single.html` as
  the starting point for a new one.
- **`<base href="...">` depth must match URL depth.** A single page 2 levels deep
  (`/start/overview/`, `/blog/kiit-codes/`) uses `<base href="../../">`. A section list page 1
  level deep (`/blog/`) uses `<base href="../">`. Getting this wrong silently 404s every
  CSS/JS asset on that page — it won't show as a Hugo build error.
- **`layouts/_default/list.html` is broken** — its `{{ block "main" . }}` is never defined
  anywhere in the theme, so any section relying on the default list fallback renders a blank
  `<div id="content"></div>`. Don't build new list pages by extending `_default`; write a
  section-specific `layouts/<section>/list.html` from scratch (Hugo resolves that before ever
  falling back to `_default`).
- **Top nav is one hardcoded partial**, `themes/wavo/layouts/partials/nav.html` — a plain `<ul>`
  of `<li class="nav-item">`. There's no Hugo `[menu]` config and no front-matter `menu:` key
  anywhere; adding a nav item means editing this file directly.
- **Archetypes are matched by section name** (`archetypes/<section>.md`), same as
  `hugo new <section>/<name>.md`. `archetypes/default.md` is the fallback for any section without
  its own file — its front matter (`title`/`date`/`draft` only) does **not** match real page
  conventions (`title`/`date`/`section_header`), so don't rely on it; add a dedicated archetype
  per section instead (see `archetypes/blog.md`).
- `{{% heading name="..." %}}` (used in `archetypes/info.md`) renders an `<h2>` with **no `id`
  attribute** — it can't be a sidebar-anchor target. Use raw `# Heading {#anchor}` instead
  whenever the heading needs to be linkable (which is effectively always, per the conventions
  above).

## Mermaid diagrams

Supported via a per-language render hook, added for the blog:
`themes/wavo/layouts/_default/_markup/render-codeblock-mermaid.html` turns a ` ```mermaid ` fence
into `<div class="mermaid">...</div>` (using `safeHTML`, not `htmlEscape`, so literal `<br/>` in
node labels survives). This hook is theme-wide, but the Mermaid.js CDN script + init call are only
loaded in `layouts/blog/single.html` — a page in another section with a mermaid fence will emit
the right markup but won't visually render as a diagram until its own template also loads the
CDN script.

## Known pre-existing issues (not fixed, just documented)

- `content/posts/my-first-post.md` is an untouched Hugo-quickstart sample (`draft: true`, never
  linked anywhere), routed through `layouts/post/section.html`, an old Bootstrap-3-era template
  inconsistent with the rest of the site. Left alone deliberately — the blog lives at
  `content/blog/` instead.
- `theme1 = "ananke"` in `config.toml` is a dead/unrecognized key; `theme = "wavo"` is the one
  Hugo actually uses. The unused `themes/perfo` theme directory sits alongside `wavo` — don't
  confuse the two when hunting for "the" active layout.
- `archetypes/arch.md` and `archetypes/core.md` are near-duplicates.
