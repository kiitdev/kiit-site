import type {CSSProperties, ReactNode} from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export type DiagramProps = {
  /** Path of the image, as for a markdown image (e.g. `/img/kiit-codes/kiit-codes-taxonomy.png`). */
  src: string;
  alt: string;
  /** CSS border radius for this diagram. Defaults to the site's `--kiit-diagram-radius`. */
  radius?: string;
  /** Draws a thin rounded border around the image, in the site's `--kiit-diagram-border` color. Defaults to true. */
  border?: boolean;
  /** Optional caption below the image. */
  caption?: ReactNode;
};

/**
 * A diagram image with rounded corners and a thin rounded border, so diagrams drawn on square canvases read as part of
 * the page and their edges stay visible on a white page or a dark one. Use this for
 * every diagram instead of a markdown image. The default radius and border color are `--kiit-diagram-radius` and
 * `--kiit-diagram-border` (src/css/custom.css). `radius` overrides the radius for one diagram, and `border={false}`
 * removes the border.
 */
export default function Diagram({src, alt, radius, border = true, caption}: DiagramProps): ReactNode {
  const url = useBaseUrl(src);
  const style = radius ? ({'--diagram-radius': radius} as CSSProperties) : undefined;
  return (
    <figure className={styles.diagram} style={style}>
      <img className={clsx(styles.image, border && styles.bordered)} src={url} alt={alt} loading="lazy" />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
