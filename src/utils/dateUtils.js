import {
  isToday,
  isTomorrow,
  isYesterday,
  isPast,
  format,
  parse,
  addDays,
  nextDay,
  startOfDay,
  setHours,
  setMinutes,
} from 'date-fns';

const DAY_NAMES = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/** Human, low-friction label for a due date: Today / Tomorrow / Yesterday / "Jan 5". */
export function formatDueDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d');
}

export function formatDueTime(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (date.getHours() === 0 && date.getMinutes() === 0) return null;
  return format(date, 'h:mm a');
}

export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  return isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate));
}

export function isDueToday(task) {
  if (!task.dueDate) return false;
  return isToday(new Date(task.dueDate));
}

/**
 * Lightweight natural-language date/time/tag/priority parser.
 * Designed so it can later be swapped for an LLM-backed parser without
 * touching any call sites — it always returns the same shape.
 *
 * "Call dentist Friday 3pm #health !high"
 *   -> { title: "Call dentist", dueDate: <next Friday 3pm ISO>, tags: ["health"], priority: "High" }
 */
export function parseNaturalLanguage(input) {
  let title = input.trim();
  let dueDate = null;
  let priority = null;
  const tags = [];

  // Tags: #word
  title = title.replace(/#(\w+)/g, (_, tag) => {
    tags.push(tag.toLowerCase());
    return '';
  });

  // Priority shorthand: !high, !medium, !low, !h, !m, !l
  title = title.replace(/!(high|medium|low|h|m|l)\b/i, (_, p) => {
    const map = { h: 'High', m: 'Medium', l: 'Low' };
    const normalized = p.length === 1 ? map[p.toLowerCase()] : p[0].toUpperCase() + p.slice(1).toLowerCase();
    priority = normalized;
    return '';
  });

  // Relative days: today, tomorrow, tonight
  const now = new Date();
  if (/\btonight\b/i.test(title)) {
    dueDate = setMinutes(setHours(startOfDay(now), 20), 0);
    title = title.replace(/\btonight\b/i, '');
  } else if (/\btomorrow\b/i.test(title)) {
    dueDate = startOfDay(addDays(now, 1));
    title = title.replace(/\btomorrow\b/i, '');
  } else if (/\btoday\b/i.test(title)) {
    dueDate = startOfDay(now);
    title = title.replace(/\btoday\b/i, '');
  } else {
    // Named weekday: "friday", "next monday"
    const dayMatch = title.match(/\b(next\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i);
    if (dayMatch) {
      const targetDay = DAY_NAMES[dayMatch[2].toLowerCase()];
      let candidate = nextDay(startOfDay(now), targetDay);
      if (dayMatch[1]) candidate = addDays(candidate, 7); // "next friday" pushes a week further
      dueDate = candidate;
      title = title.replace(dayMatch[0], '');
    }
  }

  // Time of day: "3pm", "3:30pm", "15:00"
  const timeMatch = title.match(/\b(\d{1,2})(:\d{2})?\s?(am|pm)\b/i) || title.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
  if (timeMatch) {
    const base = dueDate ? dueDate : startOfDay(now);
    try {
      if (/am|pm/i.test(timeMatch[0])) {
        dueDate = parse(timeMatch[0].replace(/\s/g, ''), timeMatch[2] ? 'h:mma' : 'ha', base);
      } else {
        dueDate = parse(timeMatch[0], 'H:mm', base);
      }
    } catch {
      // If parsing fails, keep whatever date we already had.
    }
    title = title.replace(timeMatch[0], '');
  }

  title = title.replace(/\s{2,}/g, ' ').trim();

  return {
    title: title || input.trim(),
    dueDate: dueDate ? dueDate.toISOString() : null,
    tags,
    priority,
  };
}
