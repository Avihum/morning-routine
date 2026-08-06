import { useEffect, useMemo, useState } from 'react';
import { tasks } from '../tasks';
import type { Settings, StoredState, TaskId } from '../types';

export const STORAGE_KEY = 'morning-routine-state-v1';
export const defaultSettings: Settings = { childName: 'לביא', destination: 'בית הספר', sound: true, speech: false };

export function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadState(today = localDate()): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: today, completed: [], settings: defaultSettings };
    const parsed = JSON.parse(raw) as StoredState;
    return {
      date: today,
      completed: parsed.date === today ? parsed.completed.filter((id) => tasks.some((task) => task.id === id)) : [],
      settings: { ...defaultSettings, ...parsed.settings }
    };
  } catch {
    return { date: today, completed: [], settings: defaultSettings };
  }
}

export function useMorningRoutine() {
  const [state, setState] = useState<StoredState>(() => loadState());
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state]);

  const completedSet = useMemo(() => new Set(state.completed), [state.completed]);
  const nextTask = tasks.find((task) => !completedSet.has(task.id));

  const complete = (id: TaskId) => {
    if (completedSet.has(id)) return false;
    setState((current) => {
      if (current.completed.includes(id)) return current;
      return { ...current, completed: [...current.completed, id] };
    });
    return true;
  };

  const undo = (id: TaskId) => setState((current) => ({ ...current, completed: current.completed.filter((item) => item !== id) }));
  const reset = () => setState((current) => ({ ...current, completed: [], date: localDate() }));
  const updateSettings = (settings: Partial<Settings>) => setState((current) => ({ ...current, settings: { ...current.settings, ...settings } }));

  return { ...state, completedSet, nextTask, complete, undo, reset, updateSettings };
}
