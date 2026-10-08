import type {ReactNode} from 'react';
import styles from './styles.module.css';

export type StatusBadgeProps = {
  status: 'Live' | 'Beta' | 'POC' | 'WIP';
};

/**
 * Release status of a module or target as a colored pill: Live is green, Beta yellow, POC red, WIP gray.
 * White text on a solid fill, like GroupBadge.
 */
export default function StatusBadge({status}: StatusBadgeProps): ReactNode {
  return <span className={`${styles.badge} ${styles[status.toLowerCase()]}`}>{status}</span>;
}
