import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext.jsx';

export default function ThemeToggle() {
  const { theme, setTheme } = useTasks();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-9 w-16 items-center rounded-full bg-neutral-200 px-1 transition-colors duration-300 dark:bg-neutral-800"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-500 shadow-soft transition-transform duration-300 dark:bg-neutral-900 dark:text-neutral-300 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
      </span>
    </button>
  );
}
