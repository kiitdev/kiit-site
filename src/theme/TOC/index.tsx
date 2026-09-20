import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOC';
import {TocCollapseControls, TocCollapseProvider} from '@site/src/components/TocCollapse';

import styles from './styles.module.css';

// Swizzled (ejected) from @docusaurus/theme-classic 3.10.2. The only change is the collapse provider and the
// "Expand all / Collapse all" controls, see src/components/TocCollapse. Everything else matches the original.

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}: Props): ReactNode {
  return (
    <TocCollapseProvider
      toc={props.toc}
      minHeadingLevel={props.minHeadingLevel}
      maxHeadingLevel={props.maxHeadingLevel}>
      <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
        <TocCollapseControls />
        <TOCItems {...props} linkClassName={LINK_CLASS_NAME} linkActiveClassName={LINK_ACTIVE_CLASS_NAME} />
      </div>
    </TocCollapseProvider>
  );
}
