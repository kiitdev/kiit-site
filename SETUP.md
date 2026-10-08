# kiit-site setup: doc examples

Every code block on a module's docs page comes from that module's **sample apps**. The samples are real programs that
compile and run, so the docs can't drift from the library. A page names an example by its `id`, and the site shows it in
one tab per language. Terms follow [CONVENTIONS.md](./CONVENTIONS.md): a **Section** is an H2 on a doc page and a
**Topic** is an H3 under it.

This page describes the way kiit-codes works. kiit-service-id still uses an older script, see section 8.

## 1. The flow

```
kiit-codes/                                              kiit-site/
  module.json  (name, artifacts, sample files, versions) ─┐
  samples/sample-kotlin/.../SampleApp.kt  ─┐               │   plugins/examples  (reads them at build and dev time)
  samples/sample-java/.../SampleApp.java   ─┤  <example id> │              │
  samples/sample-ts/src/index.ts           ─┤  regions      ▼              ▼
  samples/sample-swift/.../main.swift      ─┘──────────────────>  id -> { language -> code }
                                                                           │
                                  <Example id="guide-builtins" />  ───────▶  one tab per language on the page
```

1. **Regions** in each sample file mark a piece of code with an `id`.
2. **`module.json`** in the module repo lists the sample file per language and where each language's version is.
3. **The plugin** (`plugins/examples/index.ts`) reads those files when the site builds or the dev server runs, fills in the
   placeholders, and gives the page a map of `id` to code per language. **Nothing is generated or committed.**
4. **The `<Example>` component** looks up the `id` and shows one tab per language that has it.

A module repo sits next to `kiit-site` (`../kiit-codes`), so both must be checked out side by side.

## 2. Regions

A region is code between two comment lines. Both open with `<example id="..." tags="a,b">`. `id` is required and must be
unique within a file. `tags` is optional and nothing reads it yet.

### 2.1 Inline, around real code

```kotlin
// <example id="guide-builtins" tags="guide">
// A specific built-in code
val created = Succeeded.CREATED
// The group's default, when you only know the kind of outcome
val failed = Invalid.DEFAULT
// INVALID_VALUE
println(failed.name)
// </example>
verify("guide-builtins: default", failed == Invalid.INVALID_VALUE && failed.isDefault)
```

1. The example is the code between the two lines. It compiles and runs with the rest of the sample.
2. Keep the `verify(...)` (Kotlin) or `check(...)` (Java, TypeScript, Swift) calls **outside** the region. They fail the
   run if a claim the example makes stops being true.
3. Java and Swift have no local functions for a recipe to declare, so a recipe there uses a lambda or a nested function.

### 2.2 In a comment, outside the code

For content that can't be code in that file, such as a Gradle dependency, Maven XML, `npm install` or an import line.

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
2. The code goes in fenced blocks. The fence language is used for highlighting, and `title="..."` becomes the title of
   the code block. Several fences are allowed in one region (a Maven and a Gradle snippet, for example).
3. The closing `</example>` is optional, the end of the comment also ends the region.
4. These aren't compiled, so use the placeholders in section 4.

Both shapes use the same comment syntax in Kotlin, Java, TypeScript and Swift (`//` and `/* */`).

## 3. `module.json`

The module repo keeps its static facts in `module.json` at the root. The README, the docs page and the plugin all read from
it. The plugin uses these keys:

```json
{
  "name": "kiit-codes",
  "artifacts": {
    "maven": {"group": "dev.kiit", "id": "kiit-codes"},
    "npm": {"name": "@kiitdev/codes"}
  },
  "examples": {
    "sources": {
      "kotlin": "samples/sample-kotlin/src/main/kotlin/sample/SampleApp.kt",
      "java": "samples/sample-java/src/main/java/sample/SampleApp.java",
      "typescript": "samples/sample-ts/src/index.ts",
      "swift": "samples/sample-swift/Sources/sample-swift/main.swift"
    },
    "versions": {
      "kotlin": {"file": "kiit-codes/build.gradle.kts", "regex": "val libraryVersion = \"([^\"]+)\""},
      "typescript": {"file": "ports/kiit-codes-ts/package.json", "json": "version"}
    }
  }
}
```

| Key | Meaning |
|---|---|
| `name` | The module name. A page's `<Example>` uses it as `module`, `kiit-codes` when not given |
| `artifacts` | Values for the `{{module.*}}` placeholders |
| `examples.sources` | One sample file per language. A language with no entry is skipped |
| `examples.versions` | Where each language's `{{module.version}}` comes from: a regex on a file, or a JSON key |

The plugin is registered in `docusaurus.config.ts` with the modules to read:
`[examplesPlugin, {modules: ['kiit-codes']}]`. A new module is one more name in that list and a `module.json`.

## 4. Placeholders

Use these in a region instead of typing a version or a name, so they can't go stale.

| Placeholder | Value |
|---|---|
| `{{module.name}}` | `name` (`kiit-codes`) |
| `{{module.group}}` | `artifacts.maven.group` (`dev.kiit`) |
| `{{module.artifact}}` | `artifacts.maven.id` (`kiit-codes`) |
| `{{module.package}}` | `artifacts.npm.name` (`@kiitdev/codes`) |
| `{{module.version}}` | The version for the **language of the file the region is in** (`examples.versions`) |

`{{module.version}}` depends on the language because the Maven and npm versions differ. An unknown placeholder is an error.

## 5. Showing an example on a page

```mdx
import Example from '@site/src/components/Example';

#### Collect errors

<Example id="guide-collect-errors" />
```

1. Import it in each page that uses it, as CONVENTIONS.md section 4 requires. It isn't registered globally.
2. It shows one tab per language that has the `id`, in the order Kotlin, Java, TypeScript, Swift. The tabs use
   `groupId="language"`, so the choice is shared with the other language tabs on the page and remembered in the browser.
3. A language that doesn't have the `id` has no tab. That is allowed, and the page text says why when it matters (for
   example, the TypeScript port has no gRPC mapping yet).
4. An unknown `id` throws, so a typo fails `npm run build` and can't ship an empty block.
5. The same `id` can be used in more than one place on a page.

## 6. What the plugin checks

1. **Errors** stop the build: a region with no `id`, a duplicate `id` in a file, an unclosed region, a block with no
   fenced code, an unknown placeholder, or a page that asks for an `id` no sample has.
2. **A warning** lists the ids in a sample that no page uses. They aren't an error, but an unused region is dead weight, so
   remove it.
3. The dev server (`npm run start`) watches `module.json` and the `samples` folder, so editing a region updates the page.

## 7. Adding an example

1. **Write it in the Kotlin sample** (`SampleApp.kt`) between inline regions. Give it a new `id` and keep its `verify(...)`
   outside the region.
2. **Run the sample.** From the `kiit-codes` repo root: `./gradlew :samples:sample-kotlin:run`. It must end with
   "All N checks passed".
3. **Add the same `id`** to the other samples. The `id` must match, that is how the tabs line up.
   - Java: `./gradlew :samples:sample-java:run`
   - TypeScript: in `samples/sample-ts`, `npm run typecheck && npm run build && npm run start`
   - Swift: build the framework with `./gradlew :kiit-codes:linkDebugFrameworkIosSimulatorArm64`, then `./run.sh` in
     `samples/sample-swift`. It runs in the iOS simulator.
4. **Use it:** add `<Example id="..." />` to the page, then `npm run build` in `kiit-site`.

Write the page first and the sample from it. Draft the code block as the reader should see it, agree on it, then make the
sample produce exactly that and verify it.

## 8. The older way: kiit-service-id

kiit-service-id has not moved to the plugin yet. It still uses `npm run examples`, which runs
`scripts/extract-examples.mjs`.

```bash
npm run examples                                # kiit-service-id, writes src/examples/kiit-service-id/
npm run examples -- <module>                    # another module with a doc/docs.json
npm run examples -- <module> --verbose          # also lists the sample examples that aren't in the map
```

1. The module keeps a map in `doc/docs.json` that places each `id` in a `section` and a `topic`.
2. The script writes `src/examples/<module>/`: one `.text` file per snippet, `examples.json` and `files.ts`. This output is
   committed.
3. A page asks for a Topic, not an `id`: `<Example module="kiit-service-id" section="setup" topic="imports" />`. A new
   module on this way also needs an entry in `MODULES` in `src/components/Example/index.tsx`.
4. The `*.text` files are imported as strings by `textFilesPlugin` in `docusaurus.config.ts`, and `src/examples/text.d.ts`
   types them.

Both ways use the same region syntax in the samples. When kiit-service-id moves, it gets a `module.json` with an
`examples` block, its map and its generated folder are deleted, and the script, `textFilesPlugin` and `text.d.ts` go with
them.

## 9. Pieces to know about

| Piece | What it is |
|---|---|
| `plugins/examples/index.ts` | The plugin that reads the samples and gives the page its map of `id` to code |
| `src/components/Example/` | The component. `id` mode reads the plugin's data, the older mode reads `src/examples/` |
| `<module>/module.json` | The static facts and the sample file per language, in the module repo |
| `<module>/samples/` | The sample apps, one per language, with the regions |
| `scripts/extract-examples.mjs` | The older script, for kiit-service-id only |

Restart the dev server after changing `docusaurus.config.ts` or adding a new module to the plugin. Hot reload doesn't pick
those up.
