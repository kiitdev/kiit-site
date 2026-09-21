import type {CSSProperties, ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export type DiagramProps = {
  /** Path of the image, as for a markdown image (e.g. `/img/kiit-codes/kiit-codes-taxonomy.png`). */
  src: string;
  alt: string;
  /** CSS border radius for this diagram. Defaults to the site's `--kiit-diagram-radius`. */
  radius?: string;
  /** Optional caption below the image. */
  caption?: ReactNode;
};

/**
 * A diagram image with rounded corners, so diagrams drawn with square canvases read as part of the page. Use this for
 * every diagram instead of a markdown image. The default radius is `--kiit-diagram-radius` (src/css/custom.css), and
 * `radius` overrides it for one diagram.
 */
export default function Diagram({src, alt, radius, caption}: DiagramProps): ReactNode {
  const url = useBaseUrl(src);
  const style = radius ? ({'--diagram-radius': radius} as CSSProperties) : undefined;
  return (
    <figure className={styles.diagram} style={style}>
      <img className={styles.image} src={url} alt={alt} loading="lazy" />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
