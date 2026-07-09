import React, { forwardRef, useState } from 'react';
import { FiPlus, FiZap } from 'react-icons/fi';
import { parseNaturalLanguage, formatDueDate } from '../utils/dateUtils.js';
import { useTasks } from '../context/TaskContext.jsx';

const QuickAdd = forwardRef(function QuickAdd(_, ref) {
  const { addTask, goals } = useTasks();
  const [value, setValue] = useState('');
  const [goalId, setGoalId] = useState('');

  const preview = value.trim() ? parseNaturalLanguage(value) : null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    const parsed = parseNaturalLanguage(value);
    addTask({
      title: parsed.title,
      priority: parsed.priority || 'Medium',
      dueDate: parsed.dueDate,
      tags: parsed.tags,
      goalId: goalId || null,
    });
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="sticky top-[4.5rem] z-20">
      <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white/90 p-2 shadow-soft backdrop-blur-md transition focus-within:border-primary/40 focus-within:shadow-ring dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FiPlus size={18} />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What needs to be done? Try “Call dentist Friday 3pm #health”"
          aria-label="Quick add task"
          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
        />
        {goals.length > 0 && (
          <select
            value={goalId}
            onChange={(e) => setGoalId(e.target.value)}
            aria-label="Assign to goal"
            className="hidden shrink-0 rounded-lg border border-transparent bg-neutral-100 px-2 py-1.5 text-xs text-neutral-500 outline-none sm:block dark:bg-neutral-800 dark:text-neutral-400"
          >
            <option value="">No goal</option>
            {goals.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>
        )}
        <button
          type="submit"
          disabled={!value.trim()}
          className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </div>
      {preview && (preview.dueDate || preview.tags.length > 0 || preview.priority) && (
        <div className="mt-2 flex items-center gap-2 pl-2 text-xs text-neutral-500 dark:text-neutral-400">
          <FiZap size={12} className="text-accent" />
          <span>
            Will save as “{preview.title}”
            {preview.dueDate ? ` · ${formatDueDate(preview.dueDate)}` : ''}
            {preview.priority ? ` · ${preview.priority} priority` : ''}
            {preview.tags.length ? ` · ${preview.tags.map((t) => `#${t}`).join(' ')}` : ''}
          </span>
        </div>
      )}
    </form>
  );
});

export default QuickAdd;
