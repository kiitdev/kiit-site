import type {ReactNode} from 'react';
import styles from './styles.module.css';

export type CodeBadgeProps = {
  children: ReactNode;
};

/**
 * Renders a single code (e.g. SUCCESS, DENIED) as a rounded pill — secondary
 * detail next to the colored GroupBadge, not colored per group itself. See
 * styles.module.css for the design rationale (borrows the active
 * breadcrumb's badge shape, softened).
 */
export default function CodeBadge({children}: CodeBadgeProps): ReactNode {
  return <span className={styles.badge}>{children}</span>;
}
