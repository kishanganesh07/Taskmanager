import React from 'react';
import { FiX } from 'react-icons/fi';
import ProgressCircle from './ProgressCircle.jsx';

export default function GoalCard({ goal, onDelete }) {
  const color = goal.percent === 100 ? '#22C55E' : '#2563EB';

  return (
    <div className="group relative flex items-center gap-4 rounded-2xl border border-neutral-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <ProgressCircle percent={goal.percent} size={52} stroke={5} color={color} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold text-neutral-800 dark:text-neutral-100">{goal.title}</p>
        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
          {goal.completedTasks} / {goal.totalTasks} tasks completed
        </p>
      </div>
      <button
        type="button"
        aria-label={`Remove goal ${goal.title}`}
        onClick={() => onDelete(goal.id)}
        className="absolute right-2 top-2 rounded-full p-1 text-neutral-300 opacity-0 transition hover:bg-neutral-100 hover:text-neutral-500 group-hover:opacity-100 dark:hover:bg-neutral-800"
      >
        <FiX size={14} />
      </button>
    </div>
  );
}
