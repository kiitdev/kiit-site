import React from 'react';
import type {IconProps} from '@tabler/icons-react';
import {icons, type IconName} from '@site/src/theme/icons';

export type IconComponentProps = IconProps & {
  name: IconName;
};

/**
 * Renders an icon by its canonical name (see src/theme/icons.ts) instead of
 * importing a Tabler component directly, so the underlying icon library can
 * be swapped later without touching call sites.
 */
export default function IconComponent({name, ...props}: IconComponentProps) {
  const TablerIcon = icons[name];
  return <TablerIcon {...props} />;
}
