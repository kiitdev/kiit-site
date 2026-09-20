# kiit-site setup: doc examples

Code examples for the docs are written once, in the kiit-codes sample apps, and pulled onto the site. This page covers the
three pieces you set up: the **tags** in the sample files, the **map** that says where each example goes, and the
**script** that extracts them. Terms follow [CONVENTIONS.md](./CONVENTIONS.md): a **Section** is an H2 on a doc page
and a **Topic** is an H3 under it.

Proven so far for **Setup > Install** in Kotlin, Java and TypeScript. Other examples, Swift, and the `imports` kind on a
real page are not done yet, see section 8.

## 1. The flow

```
kiit-codes/samples/                                        kiit-site/
  sample-kotlin/.../SampleApp2.kt   ─┐  tags (id)
  sample-java/.../SampleApp.java    ─┼───────────────┐
  sample-ts/src/index.ts            ─┘               ▼
  docs-map.json  (id -> section/topic) ──────>  npm run examples
                                                     │
                                                     ▼
                                       src/examples/kiit-codes.json  (committed)
                                                     │
                            <Example section="setup" topic="install" />  ──> language tabs on the page
```

1. **Tags** in each sample file mark a piece of code or a block of text with an `id`.
2. **The map** (`docs-map.json`) says which `id`s go in which Section and Topic. Placement is only in the map, never in
   the tags.
3. **The script** reads the tags and the map and writes one JSON file. That file is committed, so a site build doesn't
   need the kiit-codes repo.
4. **The `<Example>` component** reads that JSON and shows one tab per language.

## 2. Tags

Every tag opens with `<example id="..." tags="a,b">`. `id` is required and must be unique within a file. `tags` is
optional, it is kept in the JSON for filtering and nothing reads it yet. There are two shapes.

### 2.1 Inline, around real code

```kotlin
// <example id="overview-checks" tags="concepts">
val outcome = tasks.create("buy milk")
println("created: ${outcome.name}")
// </example>
verify("overview-checks", outcome.success)
```

1. The example is the code between the two `//` lines. It compiles and runs with the rest of the sample.
2. Keep the `verify(...)` checks **outside** the tags. They fail the sample run if an API changes, so the docs can't drift
   from the library.
3. Use this for every API example.

### 2.2 In a comment, outside the code

For content that can't be code in that file, such as a Gradle dependency, Maven XML or `npm install`.

````kotlin
/*
<example id="setup-install" tags="setup">
```kotlin title="build.gradle.kts"
dependencies {
    implementation("{{module.group}}:{{module.artifact}}:{{module.version}}")
}
```
</example>
*/
````

1. `/*` and the opening tag are on their own lines, with no leading `*`, so the markdown fences stay intact.
2. The code goes in fenced blocks. The fence language (`kotlin`, `xml`, `groovy`, `bash`) is used for highlighting.
   `title="..."` on the fence becomes the title of the code block. Several fences are allowed in one tag (a Maven and a
   Gradle snippet, for example).
3. The closing `</example>` is optional, the end of the comment also ends the example.
4. Kotlin and Swift block comments nest, so a fence must not contain `/*`. Java and TypeScript don't nest.
5. These aren't compiled, so use the placeholders in section 4 for versions and names.

Both shapes use the same comment syntax in Kotlin, Java, TypeScript and Swift (`//` and `/* */`).

## 3. The map: `kiit-codes/samples/docs-map.json`

```json
{
  "module": {"name": "kiit-codes", "group": "dev.kiit", "artifact": "kiit-codes", "package": "@kiitdev/codes"},
  "page": "docs/foundations/kiit-codes.md",
  "sources": {
    "kotlin": "samples/sample-kotlin/src/main/kotlin/sample/SampleApp2.kt",
    "java": "samples/sample-java/src/main/java/sample/SampleApp.java",
    "typescript": "samples/sample-ts/src/index.ts"
  },
  "versions": {
    "kotlin": {"file": "kiit-codes-kotlin/kiit-codes/build.gradle.kts", "regex": "val libraryVersion = \"([^\"]+)\""},
    "typescript": {"file": "ports/kiit-codes-ts/package.json", "json": "version"}
  },
  "map": [
    {"section": "setup", "topic": "install", "items": [{"id": "setup-install", "kind": "install"}]}
  ]
}
```

| Key | Meaning |
|---|---|
| `module` | Values for the `{{module.*}}` placeholders |
| `page` | The docs page (relative to `kiit-site`). Used to check that every `section` and `topic` is a real heading |
| `sources` | One sample file per language. A language with no entry is skipped |
| `versions` | Where each language's `{{module.version}}` comes from: a regex on a file, or a JSON key |
| `map` | Placements. Each has a `section`, a `topic`, and `items` |

An item in `map` has:

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | The tag `id`. The same `id` in each language's file is the same example, that is how the tabs line up |
| `kind` | no | `code` (default), `install`, or `imports`. An `imports` item is shown at the top of the code block of the item after it |
| `name` | no | A name for picking one item when a Topic has several: `<Example ... name="http" />` |

1. `section` and `topic` are the heading slugs on the page (`setup`, `install`). Both are needed because two headings on
   the page are called "Protocols".
2. **One `id` can be placed in many places**: list it in more than one `map` entry.
3. The order of `items` is the order they are shown.
4. Tags that aren't in the map are sample-only. They stay in the sample and are reported, not treated as an error.

## 4. Placeholders

Use these in tags instead of typing a version or a name, so they can't go stale.

| Placeholder | Value |
|---|---|
| `{{module.name}}` | `module.name` from the map (`kiit-codes`) |
| `{{module.group}}` | `module.group` (`dev.kiit`, the Maven group) |
| `{{module.artifact}}` | `module.artifact` (`kiit-codes`) |
| `{{module.package}}` | `module.package` (`@kiitdev/codes`, the npm package) |
| `{{module.version}}` | The version for the **language of the file the tag is in** (`versions` in the map) |

`{{module.version}}` depends on the language because the Maven version and the npm version differ (1.1.0 and 0.9.0 at the
time of writing). An unknown placeholder is an error.

## 5. Running the script

From `kiit-site`:

```bash
npm run examples              # writes src/examples/kiit-codes.json
npm run examples -- --verbose # also lists the sample examples that aren't in the map
```

It reads the map and the sample files from the sibling `kiit-codes` folder, so both repos must be checked out side by side.
Commit the changed `src/examples/kiit-codes.json` with the change that caused it.

1. The output has no timestamps and is sorted by the map, so running it twice gives an identical file.
2. **Errors** stop it (exit 1): a tag with no `id`, a duplicate `id` in a file, an unclosed tag, a block with no fenced
   code, an unknown `kind`, an unknown placeholder, or an `id` in the map that no sample has.
3. **Warnings** don't stop it:
   - a `section`/`topic` that isn't a heading on the page
   - an `id` in the map that a language's sample doesn't have yet
   - an unknown attribute on a tag
4. The last lines say how many topics and examples were mapped, and how many sample examples are sample-only.

## 6. Showing an example on a page

```mdx
import Example from '@site/src/components/Example';

### Install

<Example section="setup" topic="install" />                 {/* every item in that Topic */}
<Example section="guide" topic="protocols" name="http" />   {/* one item, by its map name */}
```

1. Import it in each page that uses it, as CONVENTIONS.md section 4 requires. It isn't registered globally.
2. It shows one tab per language that has the example, in the order Kotlin, Java, TypeScript, Swift. The tabs use
   `groupId="language"`, so the choice is shared with the other language tabs on the page and remembered in the browser.
3. An unknown `section`, `topic` or `name` throws, so a typo fails `npm run build` and can't ship an empty block.
4. `docs/foundations/example-test.md` is an unlisted scratch page that uses it. It can be deleted.

## 7. Adding an example

1. **Write it in the Kotlin sample** (`SampleApp2.kt`) between inline tags, or in a block comment for install-type
   content. Give it a new `id`. Keep its `verify(...)` outside the tags.
2. **Run the sample** from `kiit-codes/kiit-codes-kotlin`: `./gradlew :sample-kotlin:runSample2`. It must end with
   "All N checks passed".
3. **Add the same `id`** to the Java, TypeScript and Swift samples. The `id` must match. Until a language has it, that
   tab is missing and the script warns.
4. **Place it** by adding it to a `map` entry in `docs-map.json`.
5. **Extract:** `npm run examples` in `kiit-site`. Fix any error, read any warning.
6. **Use it:** add `<Example section="..." topic="..." />` to the page, then `npm run build`.

## 8. State and known gaps

1. **Done:** the tag format, the map, placeholders, the script, and the component, checked for `setup/install` in Kotlin,
   Java and TypeScript, including one `id` placed in two places.
2. **Not done:** Swift (no source in the map yet, and the SwiftPM coordinates aren't confirmed), the `imports` kind on a
   real page, any example other than install, and using `<Example>` in `kiit-codes.md` (it still has the hand-written
   snippets).
3. **Java and TypeScript examples are block comments for now.** They aren't compiled. Real inline examples come when those
   samples are rewritten to match the Kotlin one.
4. **`tags`** are stored but not used yet.
5. **Restart the dev server** after adding the component or a new theme file (`npm run start`). Hot reload doesn't pick up
   new ones.
