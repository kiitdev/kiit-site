#!/usr/bin/env node
// Extracts documentation examples from the kiit-codes sample apps into src/examples/kiit-codes.json, which the
// <Example section="..." topic="..." /> component (src/components/Example) reads. Run with `npm run examples`.
//
// Markers carry only an id (and optional tags). Where an example goes on the site is decided by the map in
// kiit-codes/samples/docs-map.json, so the site can be reorganized without touching the samples.
//
// Two kinds of marker, both opened by <example id="..." tags="a,b">:
// 1. Inline, around real code in the file, in // comments:
//      // <example id="overview-checks" tags="concepts">
//      val outcome = tasks.complete(...)
//      // </example>
// 2. Block, a free-standing comment for content that isn't code in the file (install, imports). The code goes in
//    markdown fences, the fence language is used for highlighting and a title="..." on the fence becomes the
//    code block title. The closing </example> is optional, the end of the comment also ends it:
//      /*
//      <example id="setup-install" tags="setup">
//      ```kotlin title="build.gradle.kts"
//      implementation("{{module.group}}:{{module.artifact}}:{{module.version}}")
//      ```
//      </example>
//      */
//
// The map's "kind" is install, imports (shown above the code in the same block) or code (the default).
// Placeholders {{module.name}}, {{module.group}}, {{module.artifact}}, {{module.package}} and {{module.version}} are
// filled in at extraction. The version comes from the build file of the language the example is written in.
// The output has no timestamps, so running it twice gives identical files.
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');
const codes = resolve(site, '../kiit-codes');
const MAP = resolve(codes, 'samples/docs-map.json');
const OUTPUT = resolve(site, 'src/examples/kiit-codes.json');
const KNOWN_ATTRS = new Set(['id', 'tags']);
const KINDS = new Set(['code', 'install', 'imports']);
const LANGS = ['kotlin', 'java', 'typescript', 'swift'];

const errors = [];
const warnings = [];
const map = JSON.parse(readFileSync(MAP, 'utf8'));

// ---- placeholders
function versionFor(lang) {
  const v = map.versions?.[lang];
  if (!v) return undefined;
  const text = readFileSync(resolve(codes, v.file), 'utf8');
  if (v.json) return JSON.parse(text)[v.json];
  return text.match(new RegExp(v.regex))?.[1];
}
const versions = Object.fromEntries(LANGS.map((l) => [l, versionFor(l)]));
function fill(code, lang, where) {
  return code.replace(/\{\{\s*module\.(\w+)\s*\}\}/g, (all, name) => {
    const value = name === 'version' ? versions[lang] : map.module?.[name];
    if (value === undefined) errors.push(`${where}: unknown placeholder ${all} for ${lang}`);
    return value ?? all;
  });
}

// ---- parse markers
function parseAttrs(tag) {
  const attrs = {};
  for (const m of tag.matchAll(/(\w+)="([^"]*)"/g)) attrs[m[1]] = m[2];
  return attrs;
}
function dedent(lines) {
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join('\n').replace(/^\n+|\n+$/g, '');
}

// found[lang][id] = {tags, snippets: [{lang, title?, code, source}]}
const found = {};
for (const lang of LANGS) {
  const rel = map.sources?.[lang];
  if (!rel) continue;
  const file = resolve(codes, rel);
  const lines = readFileSync(file, 'utf8').split('\n');
  const ex = (found[lang] = {});
  const register = (attrs, snippets, where) => {
    if (!attrs.id) {
      errors.push(`${where}: <example> needs an id (placement is set in samples/docs-map.json)`);
      return;
    }
    for (const key of Object.keys(attrs)) {
      if (!KNOWN_ATTRS.has(key)) warnings.push(`${where}: unknown attribute "${key}"`);
    }
    if (ex[attrs.id]) {
      errors.push(`${where}: duplicate id "${attrs.id}" (first at ${ex[attrs.id].where})`);
      return;
    }
    const tags = (attrs.tags ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    ex[attrs.id] = {where, tags, snippets: snippets.map((s) => ({...s, code: fill(s.code, lang, where), source: where}))};
  };
  for (let i = 0; i < lines.length; i++) {
    const where = `${relative(codes, file)}:${i + 1}`;
    const inline = lines[i].match(/^\s*\/\/\s*<example\b(.*)>\s*$/);
    if (inline) {
      const body = [];
      i++;
      while (i < lines.length && !/^\s*\/\/\s*<\/example>\s*$/.test(lines[i])) body.push(lines[i++]);
      if (i >= lines.length) {
        errors.push(`${where}: <example> is never closed with // </example>`);
        break;
      }
      register(parseAttrs(inline[1]), [{lang, code: dedent(body)}], where);
      continue;
    }
    if (/^\s*\/\*\s*$/.test(lines[i]) && i + 1 < lines.length) {
      const open = lines[i + 1].match(/^\s*<example\b(.*)>\s*$/);
      if (!open) continue;
      const body = [];
      const start = i;
      i += 2;
      while (i < lines.length && !/^\s*\*\/\s*$/.test(lines[i]) && !/^\s*<\/example>\s*$/.test(lines[i])) body.push(lines[i++]);
      if (i >= lines.length) {
        errors.push(`${where}: block <example> is never closed with the end of the comment`);
        break;
      }
      if (/^\s*<\/example>\s*$/.test(lines[i])) while (i < lines.length && !/^\s*\*\/\s*$/.test(lines[i])) i++;
      const snippets = [...body.join('\n').matchAll(/```(\w*)([^\n]*)\n([\s\S]*?)```/g)].map((m) => ({
        lang: m[1] || lang,
        ...(m[2].match(/title="([^"]*)"/) ? {title: m[2].match(/title="([^"]*)"/)[1]} : {}),
        code: m[3].replace(/\n+$/, ''),
      }));
      if (!snippets.length) {
        errors.push(`${relative(codes, file)}:${start + 1}: block <example> has no fenced code block`);
        continue;
      }
      register(parseAttrs(open[1]), snippets, `${relative(codes, file)}:${start + 1}`);
    }
  }
}

// ---- headings on the docs page (warn when a section/topic isn't one of them)
const slug = (s) => s.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
const headings = {};
try {
  let sec;
  for (const l of readFileSync(resolve(site, map.page), 'utf8').split('\n')) {
    const h2 = l.match(/^## (.*)/);
    const h3 = l.match(/^### (.*)/);
    if (h2) headings[(sec = slug(h2[1]))] = new Set();
    else if (h3 && sec) headings[sec].add(slug(h3[1]));
  }
} catch {
  warnings.push(`could not read the docs page ${map.page}, skipping the heading check`);
}

// ---- build the output from the map
const out = {};
const usedIds = new Set();
for (const entry of map.map) {
  const where = `map ${entry.section}/${entry.topic}`;
  if (headings[entry.section] === undefined || !headings[entry.section].has(entry.topic)) {
    warnings.push(`${where}: no heading "${entry.section} > ${entry.topic}" on ${map.page}`);
  }
  const items = [];
  for (const item of entry.items) {
    usedIds.add(item.id);
    const kind = item.kind ?? 'code';
    if (!KINDS.has(kind)) errors.push(`${where}: unknown kind "${kind}" for ${item.id}`);
    const snippets = {};
    let tags = [];
    for (const lang of LANGS) {
      const hit = found[lang]?.[item.id];
      if (!hit) {
        if (map.sources?.[lang]) warnings.push(`${where}: "${item.id}" is not in the ${lang} sample yet`);
        continue;
      }
      snippets[lang] = hit.snippets;
      tags = [...new Set([...tags, ...hit.tags])];
    }
    if (!Object.keys(snippets).length) errors.push(`${where}: "${item.id}" was not found in any sample`);
    items.push({id: item.id, ...(item.name ? {name: item.name} : {}), kind, tags, snippets});
  }
  out[`${entry.section}/${entry.topic}`] = {section: entry.section, topic: entry.topic, items};
}

const allIds = new Set(LANGS.flatMap((l) => Object.keys(found[l] ?? {})));
const unmapped = [...allIds].filter((id) => !usedIds.has(id)).sort();

mkdirSync(dirname(OUTPUT), {recursive: true});
writeFileSync(OUTPUT, JSON.stringify({examples: out}, null, 2) + '\n');
console.log(`Wrote ${relative(site, OUTPUT)}: ${Object.keys(out).length} topics, ${usedIds.size} examples mapped`);
console.log(`${unmapped.length} sample examples are not mapped to a page yet (sample only)`);
if (process.argv.includes('--verbose')) unmapped.forEach((id) => console.log(`  ${id}`));
warnings.forEach((w) => console.warn(`warning: ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`error: ${e}`));
  process.exit(1);
}
