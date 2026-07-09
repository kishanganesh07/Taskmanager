export const STORAGE_KEYS = {
  TASKS: 'flow.tasks',
  GOALS: 'flow.goals',
  THEME: 'flow.theme',
};

export const PRIORITIES = ['High', 'Medium', 'Low'];

export const PRIORITY_STYLES = {
  High: {
    dot: 'bg-danger',
    text: 'text-danger',
    bg: 'bg-danger/10',
    ring: 'ring-danger/20',
  },
  Medium: {
    dot: 'bg-warning',
    text: 'text-warning',
    bg: 'bg-warning/10',
    ring: 'ring-warning/20',
  },
  Low: {
    dot: 'bg-success',
    text: 'text-success',
    bg: 'bg-success/10',
    ring: 'ring-success/20',
  },
};

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'today', label: 'Today' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'high', label: 'High priority' },
];

export const GOAL_PERIODS = {
  week: 'Weekly',
  month: 'Monthly',
};

// A quiet, desaturated palette so tag pills never fight with priority colors.
export const TAG_PALETTE = [
  { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-300' },
  { bg: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-300' },
  { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-300' },
  { bg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-300' },
  { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-300' },
  { bg: 'bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-300' },
];

export function tagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  const index = Math.abs(hash) % TAG_PALETTE.length;
  return TAG_PALETTE[index];
}
