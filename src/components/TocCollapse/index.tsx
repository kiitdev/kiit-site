import React, {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import type {TOCItem} from '@docusaurus/mdx-loader';

/**
 * Collapse state for the right-hand "On this page" table of contents.
 *
 * 1. Only the top heading level of the TOC (the H2 sections) collapses, and only when it has sub-items.
 * 2. The provider lives in the swizzled TOC (src/theme/TOC), the toggle buttons live in the swizzled
 *    Tree (src/theme/TOCItems/Tree). Without a provider (mobile TOC, inline TOC) the tree renders as before.
 * 3. Everything starts expanded, state is not persisted and resets when the page's headings change.
 */
interface TocCollapseValue {
  enabled: boolean;
  isCollapsed: (id: string) => boolean;
  toggle: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  parentCount: number;
  collapsedCount: number;
}

const noop = () => {};
const TocCollapseContext = createContext<TocCollapseValue>({
  enabled: false,
  isCollapsed: () => false,
  toggle: noop,
  expandAll: noop,
  collapseAll: noop,
  parentCount: 0,
  collapsedCount: 0,
});

interface ProviderProps {
  toc: readonly TOCItem[];
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
  children: ReactNode;
}

export function TocCollapseProvider({toc, minHeadingLevel, maxHeadingLevel, children}: ProviderProps): ReactNode {
  const themeConfig = useThemeConfig();
  const min = minHeadingLevel ?? themeConfig.tableOfContents.minHeadingLevel;
  const max = maxHeadingLevel ?? themeConfig.tableOfContents.maxHeadingLevel;

  // Ids of the top-level headings that have at least one sub-heading right after them.
  const parentIds = useMemo(() => {
    const items = toc.filter((item) => item.level >= min && item.level <= max);
    const ids: string[] = [];
    items.forEach((item, i) => {
      const next = items[i + 1];
      if (item.level === min && next && next.level > min) {
        ids.push(item.id);
      }
    });
    return ids;
  }, [toc, min, max]);

  const key = parentIds.join('|');
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set());

  // A different page means different headings, so start expanded again.
  useEffect(() => {
    setCollapsed(new Set());
  }, [key]);

  const toggle = useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);
  const expandAll = useCallback(() => setCollapsed(new Set()), []);
  const collapseAll = useCallback(() => setCollapsed(new Set(parentIds)), [parentIds]);

  const value = useMemo<TocCollapseValue>(
    () => ({
      enabled: parentIds.length > 0,
      isCollapsed: (id) => collapsed.has(id),
      toggle,
      expandAll,
      collapseAll,
      parentCount: parentIds.length,
      collapsedCount: collapsed.size,
    }),
    [parentIds, collapsed, toggle, expandAll, collapseAll],
  );

  return <TocCollapseContext.Provider value={value}>{children}</TocCollapseContext.Provider>;
}

export function useTocCollapse(): TocCollapseValue {
  return useContext(TocCollapseContext);
}

/** "Expand all" and "Collapse all" buttons, shown above the tree when the page has collapsible sections. */
export function TocCollapseControls(): ReactNode {
  const {enabled, expandAll, collapseAll, parentCount, collapsedCount} = useTocCollapse();
  if (!enabled) {
    return null;
  }
  return (
    <div className="toc-controls">
      <button type="button" className="toc-controls__button" onClick={expandAll} disabled={collapsedCount === 0}>
        Expand all
      </button>
      <button type="button" className="toc-controls__button" onClick={collapseAll} disabled={collapsedCount === parentCount}>
        Collapse all
      </button>
    </div>
  );
}
