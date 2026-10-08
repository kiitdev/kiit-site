import React, {type ReactNode} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {usePluginData} from '@docusaurus/useGlobalData';
import serviceIdData from '@site/src/examples/kiit-service-id/examples.json';
import serviceIdFiles from '@site/src/examples/kiit-service-id/files';

/**
 * Shows a documentation example, in one tab per language, from the sample apps.
 *
 * 1. `section` and `topic` name where it goes (Setup > Install), as set in the module's docs map.
 *    `name`, when given, picks one item of a topic that has several. Without it every item is shown in order.
 *    `module` is the module repo the examples come from, `kiit-codes` when not given. A new module is added to
 *    MODULES below.
 * 2. The data comes from `npm run examples` (scripts/extract-examples.mjs), see SETUP.md. examples.json holds the
 *    placement and metadata, and each snippet's code is a plain-text file under src/examples/<module>/<id>/.
 * 3. An unknown section/topic/name throws, so a typo fails `npm run build` instead of showing an empty page.
 * 4. Tabs use groupId="language", so the choice is shared with every other language tab on the page.
 * 5. A code block title is shown only when a language has several blocks in the topic (Maven and Gradle for Java).
 */
interface Snippet {
  lang: string;
  title?: string;
  file: string;
}
interface Item {
  id: string;
  name?: string;
  kind: 'code' | 'install' | 'imports' | 'output';
  snippets: Record<string, Snippet[]>;
}
interface Entry {
  items: Item[];
}

const MODULES: Record<string, {data: {examples: unknown}; files: Record<string, string>}> = {
  'kiit-service-id': {data: serviceIdData, files: serviceIdFiles},
};

const LANGUAGES: {value: string; label: string}[] = [
  {value: 'kotlin', label: 'Kotlin'},
  {value: 'java', label: 'Java'},
  {value: 'typescript', label: 'TypeScript'},
  {value: 'swift', label: 'Swift'},
];

interface Block {
  lang: string;
  title?: string;
  code: string;
}

function codeOf(files: Record<string, string>, snippet: Snippet): string {
  const text = files[snippet.file];
  if (text === undefined) {
    throw new Error(`<Example>: missing file ${snippet.file}. Run \`npm run examples\`.`);
  }
  return text.replace(/\n+$/, '');
}

/** Blocks for one language. Imports are put at the top of the code that follows them, in the same block. */
function blocksFor(files: Record<string, string>, items: Item[], language: string): Block[] {
  const blocks: Block[] = [];
  let imports: string[] = [];
  for (const item of items) {
    const snippets = item.snippets[language] ?? [];
    if (item.kind === 'imports') {
      imports = imports.concat(snippets.map((s) => codeOf(files, s)));
      continue;
    }
    for (const snippet of snippets) {
      const text = codeOf(files, snippet);
      const code = imports.length ? `${imports.join('\n')}\n\n${text}` : text;
      imports = [];
      blocks.push({lang: snippet.lang, title: snippet.title, code});
    }
  }
  return blocks;
}

/** A language's tabs. */
function LanguageTabs({tabs}: {tabs: {value: string; label: string; blocks: Block[]}[]}): ReactNode {
  const defaultValue = tabs.find((tab) => tab.value === 'kotlin')?.value ?? tabs[0].value;
  return (
    <Tabs groupId="language" defaultValue={defaultValue} values={tabs.map(({value, label}) => ({value, label}))}>
      {tabs.map((tab) => (
        <TabItem key={tab.value} value={tab.value}>
          {tab.blocks.map((block, i) => (
            <CodeBlock key={i} language={block.lang} title={block.title}>
              {block.code}
            </CodeBlock>
          ))}
        </TabItem>
      ))}
    </Tabs>
  );
}

/** A title is only shown when a language has several blocks (Maven and Gradle for Java), to tell them apart. */
function tabsFor(blocksOf: (language: string) => Block[]) {
  return LANGUAGES.map((language) => {
    const blocks = blocksOf(language.value);
    return {...language, blocks: blocks.length > 1 ? blocks : blocks.map((b) => ({...b, title: undefined}))};
  }).filter((tab) => tab.blocks.length > 0);
}

/** One example by id, from the module's samples (plugins/examples). */
function ExampleById({id, module}: {id: string; module: string}): ReactNode {
  const data = usePluginData('kiit-examples') as Record<string, Record<string, Record<string, Block[]>>> | undefined;
  const byLanguage = data?.[module]?.[id];
  if (!byLanguage) {
    throw new Error(`<Example>: no example "${id}" in ${module}. Check the <example id="${id}"> marker in its samples.`);
  }
  return <LanguageTabs tabs={tabsFor((language) => byLanguage[language] ?? [])} />;
}

/** The older lookup by section and topic through `npm run examples`, still used by kiit-service-id. */
function ExampleByTopic({section, topic, name, module}: {section: string; topic: string; name?: string; module: string}): ReactNode {
  const source = MODULES[module];
  if (!source) {
    throw new Error(`<Example>: unknown module "${module}". Add it to MODULES in src/components/Example.`);
  }
  const {data, files} = source;
  const key = `${section}/${topic}`;
  const entry = (data.examples as Record<string, Entry>)[key];
  if (!entry) {
    throw new Error(`<Example>: no examples for "${key}" in ${module}. Check its docs map and run \`npm run examples -- ${module}\`.`);
  }
  const items = name ? entry.items.filter((item) => item.name === name) : entry.items;
  if (!items.length) {
    throw new Error(`<Example>: "${key}" has no item named "${name}".`);
  }

  // An output (a JSON response, say) is shown as it is, with no language tabs.
  if (items.every((item) => item.kind === 'output')) {
    return (
      <>
        {items.flatMap((item) =>
          Object.values(item.snippets)
            .flat()
            .map((snippet) => (
              <CodeBlock key={`${item.id}-${snippet.file}`} language={snippet.lang} title={snippet.title}>
                {codeOf(files, snippet)}
              </CodeBlock>
            )),
        )}
      </>
    );
  }
  return <LanguageTabs tabs={tabsFor((language) => blocksFor(files, items, language))} />;
}

/**
 * `<Example id="x" />` shows the example marked `<example id="x">` in the module's samples (`module` defaults to
 * kiit-codes). `<Example module section topic />` is the older lookup, see ExampleByTopic.
 */
export default function Example(props: {id?: string; section?: string; topic?: string; name?: string; module?: string}): ReactNode {
  const module = props.module ?? 'kiit-codes';
  if (props.id) return <ExampleById id={props.id} module={module} />;
  return <ExampleByTopic section={props.section ?? ''} topic={props.topic ?? ''} name={props.name} module={module} />;
}
