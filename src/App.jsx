import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Confetti from './components/Confetti.jsx';
import { useTasks } from './context/TaskContext.jsx';

export default function App() {
  const { celebrate } = useTasks();
  const quickAddRef = useRef(null);
  const searchRef = useRef(null);

  // App-wide keyboard shortcuts: keeps the whole experience keyboard-first.
  useEffect(() => {
    function handleKeyDown(e) {
      const tag = document.activeElement?.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        quickAddRef.current?.focus();
        return;
      }

      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (e.key === 'Escape') {
        document.activeElement?.blur();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-surface-light text-neutral-900 transition-colors duration-300 dark:bg-surface-dark dark:text-neutral-100">
      <Navbar />
      <Dashboard quickAddRef={quickAddRef} searchRef={searchRef} />
      <Confetti active={celebrate} />
    </div>
  );
}
