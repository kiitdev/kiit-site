import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type MoreLinkProps = {
  href: string;
  label?: string;
  variant?: 'accent' | 'green';
};

/**
 * Small pill-button link to a term's in-page section, matching BackToTop's
 * visual style. Used in the Terms table's "More" column when a term has a
 * dedicated section elsewhere on the page, and on the homepage module cards
 * (label="Docs", variant="green") to link into that module's docs page.
 */
export default function MoreLink({
  href,
  label = 'More',
  variant = 'accent',
}: MoreLinkProps): ReactNode {
  return (
    <Link
      to={href}
      className={clsx(styles.moreLink, variant === 'green' && styles.moreLinkGreen)}>
      {label}
    </Link>
  );
}
