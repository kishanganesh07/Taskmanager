import React from 'react';
import { FiCommand } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/70 bg-surface-light/80 backdrop-blur-md dark:border-neutral-800/70 dark:bg-surface-dark/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
         
          <span className="font-display text-base font-bold tracking-tight text-neutral-800 dark:text-neutral-100">Flow</span>
        </div>

        <div className="flex items-center gap-3">

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
