import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard.jsx';
import EmptyState from './EmptyState.jsx';
import ConfirmModal from './ConfirmModal.jsx';
import { sortTasks } from '../utils/sortUtils.js';
import { applyFilter, applySearch } from '../utils/filterUtils.js';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskList({ filter, search, onFocusQuickAdd }) {
  const { tasks, goalsById, toggleComplete, deleteTask, updateTask } = useTasks();
  const [pendingDelete, setPendingDelete] = useState(null);

  const visibleTasks = useMemo(() => {
    const filtered = applyFilter(tasks, filter);
    const searched = applySearch(filtered, search, goalsById);
    return sortTasks(searched);
  }, [tasks, filter, search, goalsById]);

  const taskToDelete = tasks.find((t) => t.id === pendingDelete);

  if (tasks.length === 0) {
    return <EmptyState onCreate={onFocusQuickAdd} />;
  }

  if (visibleTasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-white/50 px-6 py-12 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-400">
        Nothing matches “{search || filter}”. Try a different filter or search term.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <AnimatePresence initial={false}>
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              goal={task.goalId ? goalsById[task.goalId] : null}
              onToggle={toggleComplete}
              onDelete={setPendingDelete}
              onUpdate={(patch) => updateTask(task.id, patch)}
            />
          ))}
        </AnimatePresence>
      </div>

      <ConfirmModal
        open={Boolean(pendingDelete)}
        title="Delete this task?"
        description={taskToDelete ? `“${taskToDelete.title}” will be removed for good.` : ''}
        confirmLabel="Delete task"
        onConfirm={() => {
          deleteTask(pendingDelete);
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
