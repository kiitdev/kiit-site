import type {ReactNode} from 'react';
import {groupColors, type GroupName} from '@site/src/theme/groupColors';
import styles from './styles.module.css';

export type GroupBadgeProps = {
  group: GroupName;
};

/**
 * Renders a Passed/Failed group name as a colored pill, matching that group's
 * color in the kiit-codes taxonomy diagram (see src/theme/groupColors.ts).
 */
export default function GroupBadge({group}: GroupBadgeProps): ReactNode {
  const {background, color} = groupColors[group];
  return (
    <span className={styles.badge} style={{backgroundColor: background, color}}>
      {group}
    </span>
  );
}
