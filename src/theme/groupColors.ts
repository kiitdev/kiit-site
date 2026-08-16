/**
 * Colors for each Passed/Failed group, matched to the group header pills in the
 * kiit-codes taxonomy diagram (kiit-codes-taxonomy.png) so the docs badges read
 * as the same visual language as the diagrams.
 */
export type GroupName =
  | 'Passed'
  | 'Succeeded'
  | 'Pending'
  | 'Excluded'
  | 'Information'
  | 'Failed'
  | 'Restricted'
  | 'Invalid'
  | 'Rejected'
  | 'Unserved';

type GroupColor = {
  background: string;
  color: string;
};

export const groupColors: Record<GroupName, GroupColor> = {
  // Status level: the diagram renders these as light pastel pills with dark
  // text, not the solid-fill/white-text style used for the groups below.
  Passed: {background: '#d4f4dd', color: '#1e7e34'},
  Failed: {background: '#fbdcdd', color: '#c0392b'},
  // Passed groups
  Succeeded: {background: '#2e7d32', color: '#ffffff'},
  Pending: {background: '#f2c94c', color: '#ffffff'},
  Excluded: {background: '#8c8c8c', color: '#ffffff'},
  Information: {background: '#2f9bda', color: '#ffffff'},
  // Failed groups
  Restricted: {background: '#1c1c1c', color: '#ffffff'},
  Invalid: {background: '#f2994a', color: '#ffffff'},
  Rejected: {background: '#c0392b', color: '#ffffff'},
  Unserved: {background: '#a8698a', color: '#ffffff'},
};

export default groupColors;
