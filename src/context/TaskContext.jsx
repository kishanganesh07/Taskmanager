import React, { createContext, useContext, useMemo, useRef, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { STORAGE_KEYS } from '../constants/index.js';
import { seedGoals, seedTasks } from '../utils/storage.js';
import { isDueToday, isOverdue } from '../utils/dateUtils.js';
import { toast } from 'react-toastify';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const seed = useMemo(() => seedGoals(), []);

  const [goals, setGoals] = useLocalStorage(STORAGE_KEYS.GOALS, seed.goals);
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.TASKS, () =>
    seedTasks({ weekGoalId: seed.weekGoalId, monthGoalId: seed.monthGoalId })
  );
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'light');
  const [celebrate, setCelebrate] = useState(false);
  const prevAllTodayDone = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  function addTask({ title, priority = 'Medium', dueDate = null, goalId = null, tags = [] }) {
    if (!title.trim()) return;
    const now = new Date().toISOString();
    const task = {
      id: uuid(),
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
      goalId,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [task, ...prev]);
    toast.success('Task created successfully!');
  }

  function updateTask(id, patch) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t))
    );
  }

  function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2600);
      toast.success('Task completed!');
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addGoal({ title, period }) {
    if (!title.trim()) return;
    setGoals((prev) => [...prev, { id: uuid(), title: title.trim(), period }]);
    toast.success('Goal created successfully!');
  }

  function deleteGoal(id) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    setTasks((prev) => prev.map((t) => (t.goalId === id ? { ...t, goalId: null } : t)));
  }

  const goalsById = useMemo(() => Object.fromEntries(goals.map((g) => [g.id, g])), [goals]);

  const goalsWithProgress = useMemo(
    () =>
      goals.map((goal) => {
        const goalTasks = tasks.filter((t) => t.goalId === goal.id);
        const completed = goalTasks.filter((t) => t.completed).length;
        return {
          ...goal,
          totalTasks: goalTasks.length,
          completedTasks: completed,
          remaining: goalTasks.length - completed,
          percent: goalTasks.length ? Math.round((completed / goalTasks.length) * 100) : 0,
        };
      }),
    [goals, tasks]
  );

  const stats = useMemo(() => {
    const today = tasks.filter(isDueToday);
    const completed = tasks.filter((t) => t.completed);
    const pending = tasks.filter((t) => !t.completed);
    const overdue = tasks.filter(isOverdue);
    const completionRate = tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0;
    const productivityScore = Math.max(
      0,
      Math.min(100, Math.round(completionRate * 0.6 + today.filter((t) => t.completed).length * 8 - overdue.length * 5))
    );
    return {
      today: today.length,
      completed: completed.length,
      pending: pending.length,
      overdue: overdue.length,
      completionRate,
      productivityScore,
    };
  }, [tasks]);

  const value = {
    tasks,
    goals: goalsWithProgress,
    goalsById,
    theme,
    setTheme,
    celebrate,
    stats,
    addTask,
    updateTask,
    toggleComplete,
    deleteTask,
    addGoal,
    deleteGoal,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within a TaskProvider');
  return ctx;
}
