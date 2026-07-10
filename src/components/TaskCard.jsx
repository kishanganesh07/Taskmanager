import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiEdit2, FiTrash2, FiCalendar, FiPlus, FiX } from 'react-icons/fi';
import { formatDueDate, formatDueTime, isOverdue } from '../utils/dateUtils.js';
import { PRIORITIES, PRIORITY_STYLES, tagColor } from '../constants/index.js';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskCard({ task, goal, onToggle, onDelete, onUpdate }) {
  const { goals } = useTasks();
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(task.title);
  const [expanded, setExpanded] = useState(false);
  const [tagDraft, setTagDraft] = useState('');
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (editingTitle) titleInputRef.current?.focus();
  }, [editingTitle]);

  const overdue = isOverdue(task);
  const priorityStyle = PRIORITY_STYLES[task.priority];

  function commitTitle() {
    const trimmed = titleDraft.trim();
    if (trimmed) onUpdate({ title: trimmed });
    else setTitleDraft(task.title);
    setEditingTitle(false);
  }

  function cyclePriority() {
    const idx = PRIORITIES.indexOf(task.priority);
    onUpdate({ priority: PRIORITIES[(idx + 1) % PRIORITIES.length] });
  }

  function addTag(e) {
    e.preventDefault();
    const tag = tagDraft.trim().toLowerCase().replace(/^#/, '');
    if (tag && !task.tags.includes(tag)) onUpdate({ tags: [...task.tags, tag] });
    setTagDraft('');
  }

  function removeTag(tag) {
    onUpdate({ tags: task.tags.filter((t) => t !== tag) });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`group rounded-2xl border bg-white p-4 shadow-soft transition-shadow hover:shadow-lg dark:bg-neutral-900 ${
        task.completed ? 'border-neutral-100 dark:border-neutral-800' : 'border-neutral-100 dark:border-neutral-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            task.completed ? 'border-success bg-success' : 'border-neutral-300 hover:border-primary dark:border-neutral-600'
          }`}
        >
          {task.completed && (
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <FiCheck size={12} className="text-white" />
            </motion.span>
          )}
        </button>

        <div className="min-w-0 flex-1">
          {editingTitle ? (
            <input
              ref={titleInputRef}
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitTitle();
                if (e.key === 'Escape') {
                  setTitleDraft(task.title);
                  setEditingTitle(false);
                }
              }}
              className="w-full rounded-lg border border-primary/40 bg-transparent px-1 py-0.5 text-sm text-neutral-800 outline-none dark:text-neutral-100"
            />
          ) : (
            <p
              onClick={() => setEditingTitle(true)}
              className={`cursor-text text-sm font-medium text-neutral-800 transition dark:text-neutral-100 ${
                task.completed ? 'text-neutral-400 line-through dark:text-neutral-500' : ''
              }`}
            >
              {task.title}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={cyclePriority}
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${priorityStyle.bg} ${priorityStyle.text}`}
              aria-label={`Priority: ${task.priority}. Click to change.`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`} />
              {task.priority}
            </button>

            {task.dueDate && (
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  overdue ? 'bg-danger/10 text-danger' : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                }`}
              >
                <FiCalendar size={10} />
                {formatDueDate(task.dueDate)}
                {formatDueTime(task.dueDate) ? ` · ${formatDueTime(task.dueDate)}` : ''}
              </span>
            )}

            {goal && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">{goal.title}</span>
            )}

            {task.tags.map((tag) => {
              const color = tagColor(tag);
              return (
                <span key={tag} className={`group/tag flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${color.bg} ${color.text}`}>
                  #{tag}
                  {expanded && (
                    <button type="button" aria-label={`Remove tag ${tag}`} onClick={() => removeTag(tag)}>
                      <FiX size={10} />
                    </button>
                  )}
                </span>
              );
            })}
          </div>

          {expanded && (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
              <input
                type="date"
                value={task.dueDate ? task.dueDate.slice(0, 10) : ''}
                onChange={(e) =>
                  onUpdate({ dueDate: e.target.value ? new Date(e.target.value).toISOString() : null })
                }
                aria-label="Due date"
                className="rounded-lg border border-neutral-200 bg-transparent px-2 py-1 text-xs text-neutral-600 outline-none dark:border-neutral-700 dark:text-neutral-300"
              />
              <select
                value={task.goalId || ''}
                onChange={(e) => onUpdate({ goalId: e.target.value || null })}
                aria-label="Assign to goal"
                className="rounded-lg border border-neutral-200 bg-transparent px-2 py-1 text-xs text-neutral-600 outline-none dark:border-neutral-700 dark:text-neutral-300"
              >
                <option value="" className="text-neutral-900 dark:text-neutral-900">No goal</option>
                {goals.map((g) => (
                  <option key={g.id} value={g.id} className="text-neutral-900 dark:text-neutral-900">
                    {g.title}
                  </option>
                ))}
              </select>
              <form onSubmit={addTag} className="flex items-center gap-1">
                <input
                  value={tagDraft}
                  onChange={(e) => setTagDraft(e.target.value)}
                  placeholder="add tag"
                  aria-label="Add tag"
                  className="w-20 rounded-lg border border-neutral-200 bg-transparent px-2 py-1 text-xs text-neutral-600 outline-none dark:border-neutral-700 dark:text-neutral-300"
                />
                <button type="submit" aria-label="Confirm add tag" className="rounded-lg bg-neutral-100 p-1.5 text-neutral-500 dark:bg-neutral-800">
                  <FiPlus size={12} />
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            aria-label="Edit task details"
            onClick={() => setExpanded((v) => !v)}
            className={`rounded-lg p-1.5 transition hover:bg-neutral-100 dark:hover:bg-neutral-800 ${expanded ? 'text-primary' : 'text-neutral-400'}`}
          >
            <FiEdit2 size={14} />
          </button>
          <button
            type="button"
            aria-label="Delete task"
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-danger/10 hover:text-danger"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
