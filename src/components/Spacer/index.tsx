import type {ReactNode} from 'react';
import styles from './styles.module.css';

/**
 * Vertical whitespace between consecutive Topics (H3) within a Section —
 * pure spacing, no visible line, distinct from BackToTop (which separates
 * Sections and also renders a button).
 */
export default function Spacer(): ReactNode {
  return <div className={styles.spacer} />;
}
