import React, { forwardRef } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = forwardRef(function SearchBar({ value, onChange }, ref) {
  return (
    <div className="relative w-full sm:w-64">
      <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks, tags, goals…"
        aria-label="Search tasks"
        className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-12 text-sm text-neutral-700 shadow-sm outline-none transition focus:border-primary/40 focus:shadow-ring dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800">
        /
      </kbd>
    </div>
  );
});

export default SearchBar;
