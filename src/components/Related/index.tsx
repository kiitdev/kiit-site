import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import ConceptTermLink from '@site/src/components/ConceptTermLink';
import styles from './styles.module.css';

export type RelatedKind = 'source' | 'reference' | 'guide' | 'sample';

export type RelatedLink = {
  text: string;
  href: string;
  /** What the link is, shown as a small label before it. A `source` link is shown as a source-file link. */
  kind?: RelatedKind;
};

export type RelatedItem = {
  label: string;
  /** One short line on what the item is or why it is related. */
  note?: string;
  links: RelatedLink[];
};

export type RelatedProps = {
  /** Heading above the table. */
  title?: string;
  items: RelatedItem[];
};

const KIND_LABELS: Record<RelatedKind, string> = {
  source: 'Source',
  reference: 'Reference',
  guide: 'Guide',
  sample: 'Sample',
};

/**
 * A numbered table of links related to a Topic: its source files, the Reference Topics that list the details, the
 * Guide that shows how to use it, the sample app. Put one at the end of a Topic. Each row is an item, a short note and its links.
 * The links sit in the last column with a small label for what each one is. The table takes the full page width like every other
 * table (see CONVENTIONS.md, Section 6).
 */
export default function Related({title = 'Related', items}: RelatedProps): ReactNode {
  return (
    <section className={styles.related}>
      <div className={styles.title}>{title}</div>
      <div className="kiit-table-scroll">
        <table>
          <thead>
            <tr>
              <th className={styles.number}>#</th>
              <th>Item</th>
              <th>Note</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.label}>
                <td className={styles.number}>{i + 1}</td>
                <td>{item.label}</td>
                <td>{item.note}</td>
                <td>
                  {item.links.map((link) => (
                    <span key={link.href + link.text} className={styles.link}>
                      {link.kind && <span className={styles.kind}>{KIND_LABELS[link.kind]}</span>}
                      {link.kind === 'source' ? (
                        <ConceptTermLink href={link.href}>{link.text}</ConceptTermLink>
                      ) : (
                        <Link to={link.href}>{link.text}</Link>
                      )}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
