import { isDueToday, isOverdue } from './dateUtils.js';

export function applyFilter(tasks, filter) {
  switch (filter) {
    case 'active':
      return tasks.filter((t) => !t.completed);
    case 'completed':
      return tasks.filter((t) => t.completed);
    case 'today':
      return tasks.filter((t) => isDueToday(t));
    case 'overdue':
      return tasks.filter((t) => isOverdue(t));
    case 'high':
      return tasks.filter((t) => t.priority === 'High');
    case 'all':
    default:
      return tasks;
  }
}

export function applySearch(tasks, query, goalsById) {
  if (!query.trim()) return tasks;
  const q = query.trim().toLowerCase();
  return tasks.filter((t) => {
    const inTitle = t.title.toLowerCase().includes(q);
    const inTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
    const goalTitle = t.goalId && goalsById[t.goalId] ? goalsById[t.goalId].title.toLowerCase() : '';
    const inGoal = goalTitle.includes(q);
    return inTitle || inTags || inGoal;
  });
}
