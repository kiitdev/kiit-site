/**
 * Colors for each Passed/Failed group, matched to the group header pills in the
 * kiit-codes taxonomy diagram (kiit-codes-taxonomy.png) so the docs badges read
 * as the same visual language as the diagrams.
 */
export type GroupName =
  | 'Succeeded'
  | 'Pending'
  | 'Excluded'
  | 'Information'
  | 'Restricted'
  | 'Invalid'
  | 'Rejected'
  | 'Unserved';

type GroupColor = {
  background: string;
  color: string;
};

export const groupColors: Record<GroupName, GroupColor> = {
  // Passed
  Succeeded: {background: '#2e7d32', color: '#ffffff'},
  Pending: {background: '#f2c94c', color: '#ffffff'},
  Excluded: {background: '#8c8c8c', color: '#ffffff'},
  Information: {background: '#2f9bda', color: '#ffffff'},
  // Failed
  Restricted: {background: '#1c1c1c', color: '#ffffff'},
  Invalid: {background: '#f2994a', color: '#ffffff'},
  Rejected: {background: '#c0392b', color: '#ffffff'},
  Unserved: {background: '#a8698a', color: '#ffffff'},
};

export default groupColors;
