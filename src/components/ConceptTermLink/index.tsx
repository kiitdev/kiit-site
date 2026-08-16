import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type ConceptTermLinkProps = {
  href: string;
  children: ReactNode;
};

/**
 * Links a concept term (a class, field, or file) to its exact source
 * location on GitHub. Renders bold, monospace text without Infima's default
 * inline <code> border/background — a whole table column of bordered code
 * chips reads as too busy.
 */
export default function ConceptTermLink({href, children}: ConceptTermLinkProps): ReactNode {
  return (
    <Link to={href} className={styles.termLink}>
      {children}
    </Link>
  );
}
