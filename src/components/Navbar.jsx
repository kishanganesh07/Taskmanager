import React from 'react';
import { FiCommand } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-surface-light/80 backdrop-blur-md dark:border-neutral-800/70 dark:bg-surface-dark/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-display text-base font-bold tracking-tight text-neutral-800 dark:text-neutral-100">Flow</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] text-neutral-400 sm:flex dark:border-neutral-800">
            <FiCommand size={11} />
            <span>K to quick add</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
