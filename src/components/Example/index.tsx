import React, {type ReactNode} from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import data from '@site/src/examples/kiit-codes.json';

/**
 * Shows a documentation example, in one tab per language, from the sample apps.
 *
 * 1. `section` and `topic` name where it goes (Setup > Install), as set in kiit-codes/samples/docs-map.json.
 *    `name`, when given, picks one item of a topic that has several. Without it every item is shown in order.
 * 2. The data comes from `npm run examples` (scripts/extract-examples.mjs), see SETUP.md.
 * 3. An unknown section/topic/name throws, so a typo fails `npm run build` instead of showing an empty page.
 * 4. Tabs use groupId="language", so the choice is shared with every other language tab on the page.
 */
interface Snippet {
  lang: string;
  title?: string;
  code: string;
}
interface Item {
  id: string;
  name?: string;
  kind: 'code' | 'install' | 'imports';
  snippets: Record<string, Snippet[]>;
}
interface Entry {
  items: Item[];
}

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

/** Blocks for one language. Imports are put at the top of the code that follows them, in the same block. */
function blocksFor(items: Item[], language: string): Block[] {
  const blocks: Block[] = [];
  let imports: string[] = [];
  for (const item of items) {
    const snippets = item.snippets[language] ?? [];
    if (item.kind === 'imports') {
      imports = imports.concat(snippets.map((s) => s.code));
      continue;
    }
    for (const snippet of snippets) {
      const code = imports.length ? `${imports.join('\n')}\n\n${snippet.code}` : snippet.code;
      imports = [];
      blocks.push({lang: snippet.lang, title: snippet.title, code});
    }
  }
  return blocks;
}

export default function Example({section, topic, name}: {section: string; topic: string; name?: string}): ReactNode {
  const key = `${section}/${topic}`;
  const entry = (data.examples as Record<string, Entry>)[key];
  if (!entry) {
    throw new Error(`<Example>: no examples for "${key}". Check samples/docs-map.json and run \`npm run examples\`.`);
  }
  const items = name ? entry.items.filter((item) => item.name === name) : entry.items;
  if (!items.length) {
    throw new Error(`<Example>: "${key}" has no item named "${name}".`);
  }

  const tabs = LANGUAGES.map((language) => ({...language, blocks: blocksFor(items, language.value)})).filter(
    (tab) => tab.blocks.length > 0,
  );
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
