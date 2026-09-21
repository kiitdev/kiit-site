import type {ReactNode} from 'react';
import clsx from 'clsx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

export type CodeCardColor = 'blue' | 'yellow' | 'red' | 'green';

export type CodeCardProps = {
  /** Optional heading above the frame. */
  title?: string;
  /** Optional description next to the title. */
  subtitle?: ReactNode;
  color?: CodeCardColor;
  /**
   * One snippet as a string, highlighted as `language`. Or several snippets keyed by language
   * (`{kotlin: '...', java: '...'}`), shown as tabs inside the frame.
   */
  code: string | Record<string, string>;
  /** Highlight language for a single string snippet. Ignored when `code` is keyed by language. */
  language?: string;
  footnote?: ReactNode;
};

const LANGUAGES: {value: string; label: string; highlight: string}[] = [
  {value: 'kotlin', label: 'Kotlin', highlight: 'kotlin'},
  {value: 'java', label: 'Java', highlight: 'java'},
  {value: 'typescript', label: 'TypeScript', highlight: 'typescript'},
  {value: 'swift', label: 'Swift', highlight: 'swift'},
];

/**
 * A code snippet inside a colored, rounded frame, used to build diagram-style figures out of real, highlighted code
 * instead of a screenshot. The title and description are optional and sit above the frame, the code panel is inside
 * it, and an optional footnote sits below. Stack several to make a figure (see Guide > Usage).
 *
 * 1. `code` as a string is one snippet, so use it for JSON or a single-language example.
 * 2. `code` as an object keyed by language shows one tab per language, in the order Kotlin, Java, TypeScript, Swift.
 *    The tabs sit above the colored frame, on the page background, and only the code panel is inside the frame. They
 *    use groupId="language", so the choice is shared with every other language tab on the page.
 * 3. Purely presentational: the frame colors are `--card-bezel` per `color` in styles.module.css.
 */
export default function CodeCard({title, subtitle, color = 'blue', code, language = 'kotlin', footnote}: CodeCardProps): ReactNode {
  const tabs =
    typeof code === 'string'
      ? []
      : LANGUAGES.filter((l) => code[l.value] !== undefined).map((l) => ({...l, code: code[l.value]}));
  if (typeof code !== 'string' && tabs.length === 0) {
    throw new Error(`<CodeCard>: no snippet for a known language. Use one of ${LANGUAGES.map((l) => l.value).join(', ')}.`);
  }

  return (
    <section className={clsx(styles.card, styles[color])}>
      {(title || subtitle) && (
        <header className={styles.header}>
          {title && <span className={styles.title}>{title}</span>}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </header>
      )}
      {typeof code === 'string' || tabs.length === 1 ? (
        <div className={styles.bezel}>
          <CodeBlock language={typeof code === 'string' ? language : tabs[0].highlight}>
            {typeof code === 'string' ? code : tabs[0].code}
          </CodeBlock>
        </div>
      ) : (
        <div className={styles.withTabs}>
          <Tabs
            groupId="language"
            defaultValue={tabs.find((t) => t.value === 'kotlin')?.value ?? tabs[0].value}
            values={tabs.map(({value, label}) => ({value, label}))}>
            {tabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                <CodeBlock language={tab.highlight}>{tab.code}</CodeBlock>
              </TabItem>
            ))}
          </Tabs>
        </div>
      )}
      {footnote && <div className={styles.footnote}>{footnote}</div>}
    </section>
  );
}
