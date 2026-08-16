import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type MoreLinkProps = {
  href: string;
};

/**
 * Small pill-button link to a term's in-page section, matching BackToTop's
 * visual style. Used in the Terms table's "More" column when a term has a
 * dedicated section elsewhere on the page.
 */
export default function MoreLink({href}: MoreLinkProps): ReactNode {
  return (
    <Link to={href} className={styles.moreLink}>
      More
    </Link>
  );
}
