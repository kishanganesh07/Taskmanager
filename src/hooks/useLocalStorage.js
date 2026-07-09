import { useEffect, useState } from 'react';

/**
 * Persist a piece of state to localStorage, seeded lazily so we only touch
 * window/localStorage on the client and only read it once on mount.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      const resolvedInitialValue = typeof initialValue === 'function' ? initialValue() : initialValue;
      return stored !== null ? JSON.parse(stored) : resolvedInitialValue;
    } catch (error) {
      console.warn(`Could not read localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Could not write localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
