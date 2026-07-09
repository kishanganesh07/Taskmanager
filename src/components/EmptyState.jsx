import React from 'react';

export default function EmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-neutral-200 bg-white/60 px-6 py-16 text-center dark:border-neutral-800 dark:bg-neutral-900/40">
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
        <rect x="18" y="14" width="60" height="72" rx="10" className="fill-neutral-100 dark:fill-neutral-800" />
        <rect x="30" y="30" width="36" height="6" rx="3" className="fill-primary/30" />
        <rect x="30" y="44" width="28" height="6" rx="3" className="fill-neutral-300 dark:fill-neutral-700" />
        <rect x="30" y="58" width="20" height="6" rx="3" className="fill-neutral-300 dark:fill-neutral-700" />
        <circle cx="66" cy="70" r="16" className="fill-accent" />
        <path d="M59 70l5 5 9-11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <div>
        <p className="font-display text-lg font-semibold text-neutral-800 dark:text-neutral-100">No tasks yet</p>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          An empty list is just an invitation. Capture the first thing on your mind.
        </p>
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:bg-primary-dark hover:shadow-lg active:scale-95"
      >
        Create your first task
      </button>
    </div>
  );
}
