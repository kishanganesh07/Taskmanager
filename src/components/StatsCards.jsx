import React from 'react';
import { FiSun, FiCheckCircle, FiCircle, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
import ProgressCircle from './ProgressCircle.jsx';
import { useTasks } from '../context/TaskContext.jsx';

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}>{icon}</div>
      <div>
        <p className="font-display text-xl font-semibold text-neutral-800 dark:text-neutral-100">{value}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
      </div>
    </div>
  );
}

export default function StatsCards() {
  const { stats } = useTasks();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <StatCard icon={<FiSun className="text-primary" size={18} />} accent="bg-primary/10" label="Due today" value={stats.today} />
      <StatCard icon={<FiCheckCircle className="text-success" size={18} />} accent="bg-success/10" label="Completed" value={stats.completed} />
      <StatCard icon={<FiCircle className="text-neutral-400" size={18} />} accent="bg-neutral-500/10" label="Pending" value={stats.pending} />
      <StatCard icon={<FiAlertTriangle className="text-danger" size={18} />} accent="bg-danger/10" label="Overdue" value={stats.overdue} />
      <StatCard icon={<FiTrendingUp className="text-accent" size={18} />} accent="bg-accent/10" label="Completion" value={`${stats.completionRate}%`} />
      <div className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <ProgressCircle percent={stats.productivityScore} size={40} stroke={4} color="#2563EB" label={stats.productivityScore} />
        <div>
          <p className="font-display text-xl font-semibold text-neutral-800 dark:text-neutral-100">{stats.productivityScore}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Productivity score</p>
        </div>
      </div>
    </div>
  );
}
