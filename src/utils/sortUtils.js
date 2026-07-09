const PRIORITY_WEIGHT = { High: 0, Medium: 1, Low: 2 };

/**
 * Sort tasks: incomplete before completed, then by priority (High first),
 * then by due date (earliest/most urgent first, undated tasks last).
 */
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    const priorityDiff = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;

    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}
