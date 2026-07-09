import { v4 as uuid } from 'uuid';
import { startOfDay, addDays, subDays } from 'date-fns';

/** First-run sample data so the app never opens to a blank void mid-demo. */
export function seedGoals() {
  const weekGoalId = uuid();
  const monthGoalId = uuid();
  return {
    weekGoalId,
    monthGoalId,
    goals: [
      { id: weekGoalId, title: 'Finish React project', period: 'week' },
      { id: monthGoalId, title: 'Land an internship', period: 'month' },
    ],
  };
}

export function seedTasks({ weekGoalId, monthGoalId }) {
  const now = new Date().toISOString();
  return [
    {
      id: uuid(),
      title: 'Set up project repo',
      completed: true,
      priority: 'Medium',
      dueDate: subDays(startOfDay(new Date()), 1).toISOString(),
      goalId: weekGoalId,
      tags: ['work'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuid(),
      title: 'Wireframe the dashboard',
      completed: false,
      priority: 'High',
      dueDate: startOfDay(new Date()).toISOString(),
      goalId: weekGoalId,
      tags: ['work', 'design'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuid(),
      title: 'Practice two DSA problems',
      completed: false,
      priority: 'Medium',
      dueDate: startOfDay(new Date()).toISOString(),
      goalId: monthGoalId,
      tags: ['college'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuid(),
      title: 'Refine resume bullet points',
      completed: false,
      priority: 'Low',
      dueDate: addDays(startOfDay(new Date()), 2).toISOString(),
      goalId: monthGoalId,
      tags: ['college'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuid(),
      title: 'Book dentist appointment',
      completed: false,
      priority: 'Low',
      dueDate: subDays(startOfDay(new Date()), 2).toISOString(),
      goalId: null,
      tags: ['health'],
      createdAt: now,
      updatedAt: now,
    },
  ];
}
