import React, { forwardRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import QuickAdd from '../components/QuickAdd.jsx';
import GoalCard from '../components/GoalCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import StatsCards from '../components/StatsCards.jsx';
import TaskList from '../components/TaskList.jsx';
import { useTasks } from '../context/TaskContext.jsx';

function GoalSection({ title, period, goals, onAddGoal, onDeleteGoal }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const sectionGoals = goals.filter((g) => g.period === period);

  function submit(e) {
    e.preventDefault();
    if (draft.trim()) onAddGoal({ title: draft, period });
    setDraft('');
    setAdding(false);
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
        >
          <FiPlus size={12} /> New goal
        </button>
      </div>

      {adding && (
        <form onSubmit={submit} className="mb-3 flex gap-2">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setAdding(false)}
            placeholder={period === 'week' ? 'e.g. Finish React project' : 'e.g. Land an internship'}
            className="flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary/40 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          />
          <button type="submit" className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-white">
            Add
          </button>
        </form>
      )}

      {sectionGoals.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-200 px-4 py-6 text-center text-xs text-neutral-400 dark:border-neutral-800">
          No {title.toLowerCase()} set yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {sectionGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onDelete={onDeleteGoal} />
          ))}
        </div>
      )}
    </section>
  );
}

const Dashboard = forwardRef(function Dashboard({ quickAddRef, searchRef }, ref) {
  const { goals, addGoal, deleteGoal } = useTasks();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  return (
    <div ref={ref} className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-24 pt-6 sm:px-6">
      <QuickAdd ref={quickAddRef} />

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <GoalSection title="Weekly goals" period="week" goals={goals} onAddGoal={addGoal} onDeleteGoal={deleteGoal} />
        <GoalSection title="Monthly goals" period="month" goals={goals} onAddGoal={addGoal} onDeleteGoal={deleteGoal} />
      </div>

      <section>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar active={filter} onChange={setFilter} />
          <SearchBar ref={searchRef} value={search} onChange={setSearch} />
        </div>
        <TaskList filter={filter} search={search} onFocusQuickAdd={() => quickAddRef.current?.focus()} />
      </section>
    </div>
  );
});

export default Dashboard;
