import type {ReactNode} from 'react';
import styles from './styles.module.css';

export type PageTitleProps = {
  title: string;
  logo: string;
};

/**
 * H1 page title with the module's logo beside it. Docusaurus's own Heading
 * component is a no-op for H1 (no id/anchor generation happens for it), so
 * a plain <h1> here behaves identically to the usual "# Title" markdown
 * syntax it replaces.
 */
export default function PageTitle({title, logo}: PageTitleProps): ReactNode {
  return (
    <h1 className={styles.pageTitle}>
      <img src={logo} alt={`${title} logo`} className={styles.logo} />
      {title}
    </h1>
  );
}
