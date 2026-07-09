import React from 'react';

/**
 * Signature element: a hand-tuned circular progress ring used for both goal
 * cards and the dashboard's productivity score, so progress always "reads"
 * the same way throughout the app.
 */
export default function ProgressCircle({ percent = 0, size = 56, stroke = 6, color = '#2563EB', label }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-neutral-200 dark:text-neutral-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <span className="absolute font-display text-xs font-semibold text-neutral-700 dark:text-neutral-200">
        {label ?? `${percent}%`}
      </span>
    </div>
  );
}
