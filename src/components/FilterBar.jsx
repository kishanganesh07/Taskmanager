import React from 'react';
import { FILTERS } from '../constants/index.js';

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Task filters">
      {FILTERS.map((filter) => {
        const isActive = active === filter.id;
        return (
          <button
            key={filter.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(filter.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-soft'
                : 'bg-transparent text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
