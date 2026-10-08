import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';

/**
 * Doc examples, read straight from a module's sample apps. There is no generated or committed output.
 *
 * 1. A module repo sits next to kiit-site (../kiit-codes). Its module.json names the facts (group, artifact, npm
 *    package) and an "examples" block: the sample file per language and where each language's version is.
 * 2. A sample marks an example with an id. Two forms, both `<example id="..." tags="...">`:
 *      // <example id="x">  real code  // </example>        inline, around code in the file
 *      /* <example id="x"> ```lang title="t" ... ``` </example> *\/   block, for content that isn't code in the file
 * 3. `{{module.name|group|artifact|package|version}}` is filled in. The version is the one of the snippet's language.
 * 4. A page shows an example with `<Example id="x" />`. A missing id fails the build (in the component), a duplicate id
 *    or an unclosed marker fails it here, and an id no page uses is a warning.
 */
export interface Block {
  lang: string;
  title?: string;
  code: string;
}
/** examples[module][id][language] = blocks, in the order they appear. */
export type ExamplesData = Record<string, Record<string, Record<string, Block[]>>>;

interface ModuleJson {
  name: string;
  artifacts?: {maven?: {group?: string; id?: string}; npm?: {name?: string}};
  examples?: {
    sources?: Record<string, string>;
    versions?: Record<string, {file: string; regex?: string; json?: string}>;
  };
}

const attrsOf = (tag: string) => Object.fromEntries([...tag.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

function dedent(lines: string[]): string {
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join('\n').replace(/^\n+|\n+$/g, '');
}

function versionOf(repo: string, spec?: {file: string; regex?: string; json?: string}): string | undefined {
  if (!spec) return undefined;
  const text = readFileSync(resolve(repo, spec.file), 'utf8');
  return spec.json ? JSON.parse(text)[spec.json] : text.match(new RegExp(spec.regex ?? ''))?.[1];
}

export function readModule(repo: string): {data: Record<string, Record<string, Block[]>>; name: string} {
  const mod: ModuleJson = JSON.parse(readFileSync(resolve(repo, 'module.json'), 'utf8'));
  const values: Record<string, string | undefined> = {
    name: mod.name,
    group: mod.artifacts?.maven?.group,
    artifact: mod.artifacts?.maven?.id,
    package: mod.artifacts?.npm?.name,
  };
  const data: Record<string, Record<string, Block[]>> = {};
  const owner: Record<string, string> = {};

  for (const [lang, rel] of Object.entries(mod.examples?.sources ?? {})) {
    const file = resolve(repo, rel);
    const version = versionOf(repo, mod.examples?.versions?.[lang]);
    const lines = readFileSync(file, 'utf8').split('\n');
    const fill = (code: string, where: string) =>
      code.replace(/\{\{\s*module\.(\w+)\s*\}\}/g, (all, key: string) => {
        const value = key === 'version' ? version : values[key];
        if (value === undefined) throw new Error(`${where}: unknown placeholder ${all} for ${lang}`);
        return value;
      });
    const add = (attrs: Record<string, string>, blocks: Block[], where: string) => {
      if (!attrs.id) throw new Error(`${where}: <example> needs an id`);
      if (owner[`${lang}:${attrs.id}`]) throw new Error(`${where}: duplicate id "${attrs.id}" (first at ${owner[`${lang}:${attrs.id}`]})`);
      owner[`${lang}:${attrs.id}`] = where;
      (data[attrs.id] ??= {})[lang] = blocks.map((b) => ({...b, code: fill(b.code, where)}));
    };

    for (let i = 0; i < lines.length; i++) {
      const where = `${relative(repo, file)}:${i + 1}`;
      const inline = lines[i].match(/^\s*\/\/\s*<example\b(.*)>\s*$/);
      if (inline) {
        const body: string[] = [];
        for (i++; i < lines.length && !/^\s*\/\/\s*<\/example>\s*$/.test(lines[i]); i++) body.push(lines[i]);
        if (i >= lines.length) throw new Error(`${where}: <example> is never closed with // </example>`);
        add(attrsOf(inline[1]), [{lang, code: dedent(body)}], where);
        continue;
      }
      const open = /^\s*\/\*\s*$/.test(lines[i]) && lines[i + 1]?.match(/^\s*<example\b(.*)>\s*$/);
      if (!open) continue;
      const start = i;
      const body: string[] = [];
      for (i += 2; i < lines.length && !/^\s*\*\/\s*$/.test(lines[i]) && !/^\s*<\/example>\s*$/.test(lines[i]); i++) body.push(lines[i]);
      if (i >= lines.length) throw new Error(`${where}: block <example> is never closed`);
      if (/^\s*<\/example>\s*$/.test(lines[i])) while (i < lines.length && !/^\s*\*\/\s*$/.test(lines[i])) i++;
      const blocks = [...body.join('\n').matchAll(/```(\w*)([^\n]*)\n([\s\S]*?)```/g)].map((m) => ({
        lang: m[1] || lang,
        ...(m[2].match(/title="([^"]*)"/) ? {title: m[2].match(/title="([^"]*)"/)![1]} : {}),
        code: m[3].replace(/\n+$/, ''),
      }));
      if (!blocks.length) throw new Error(`${relative(repo, file)}:${start + 1}: block <example> has no fenced code block`);
      add(attrsOf(open[1]), blocks, `${relative(repo, file)}:${start + 1}`);
    }
  }
  return {data, name: mod.name};
}

function pagesIn(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return pagesIn(path);
    return /\.mdx?$/.test(entry) ? [path] : [];
  });
}

export default function examplesPlugin(context: LoadContext, options: {modules: string[]}): Plugin<ExamplesData> {
  const repos = options.modules.map((name) => resolve(context.siteDir, '..', name));
  return {
    name: 'kiit-examples',
    getPathsToWatch: () => repos.flatMap((repo) => [join(repo, 'module.json'), join(repo, 'samples')]),
    async loadContent() {
      const all: ExamplesData = {};
      for (const repo of repos) {
        const {data, name} = readModule(repo);
        all[name] = data;
      }
      // An id no page uses is only a warning: the sample may hold examples for a blog post or a later page.
      const pages = pagesIn(join(context.siteDir, 'docs')).map((p) => readFileSync(p, 'utf8')).join('\n');
      const used = new Set([...pages.matchAll(/<Example\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]));
      for (const [name, data] of Object.entries(all)) {
        const unused = Object.keys(data).filter((id) => !used.has(id));
        if (unused.length) console.warn(`[kiit-examples] ${name}: ${unused.length} sample examples no page uses: ${unused.join(', ')}`);
      }
      return all;
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}
