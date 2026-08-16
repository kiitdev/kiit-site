import type {ReactNode} from 'react';
import styles from './styles.module.css';

/**
 * Small link at the end of a doc section that scrolls back to the top of
 * the page (the page title), instead of requiring a long manual scroll
 * back up past everything just read.
 */
export default function BackToTop(): ReactNode {
  return (
    <button
      type="button"
      className={styles.backToTop}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      ↑ Back to top
    </button>
  );
}
