import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/TOCItems/Tree';
import {useTocCollapse} from '@site/src/components/TocCollapse';

// Swizzled (ejected) from @docusaurus/theme-classic 3.10.2. Changes from the original: a top-level heading that
// has sub-headings gets a toggle button, and its sub-list is left out while it is collapsed. Without a
// TocCollapseProvider (mobile and inline TOCs) it renders exactly like the original.

const stripTags = (html: string): string => html.replace(/<[^>]+>/g, '');

// Recursive component rendering the toc tree
function TOCItemTree({toc, className, linkClassName, isChild}: Props): ReactNode {
  const {enabled, isCollapsed, toggle} = useTocCollapse();
  if (!toc.length) {
    return null;
  }
  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading) => {
        const collapsible = enabled && !isChild && heading.children.length > 0;
        const collapsed = collapsible && isCollapsed(heading.id);
        return (
          <li key={heading.id} className={collapsible ? 'toc-item--collapsible' : undefined}>
            <Link
              to={`#${heading.id}`}
              className={linkClassName ?? undefined}
              // Developer provided the HTML, so assume it's safe.
              dangerouslySetInnerHTML={{__html: heading.value}}
            />
            {collapsible && (
              <button
                type="button"
                className="toc-toggle"
                aria-expanded={!collapsed}
                aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${stripTags(heading.value)}`}
                onClick={() => toggle(heading.id)}
              />
            )}
            {!collapsed && (
              <TOCItemTree isChild toc={heading.children} className={className} linkClassName={linkClassName} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
