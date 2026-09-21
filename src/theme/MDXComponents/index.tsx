import type {ComponentProps, ReactNode} from 'react';
import MDXComponents from '@theme-original/MDXComponents';

/**
 * Wraps every Markdown table in a scroll container. Tables are full width (see custom.css), and on a narrow screen a
 * table whose columns don't fit scrolls sideways inside the wrapper instead of squeezing its columns.
 */
function Table(props: ComponentProps<'table'>): ReactNode {
  return (
    <div className="kiit-table-scroll">
      <table {...props} />
    </div>
  );
}

export default {
  ...MDXComponents,
  table: Table,
};
