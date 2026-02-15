import { HistoryEntry } from './historyTypes';

const STORAGE_KEY = 'tt2yt_conversion_history';

export function getLocalHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function addToLocalHistory(entry: Omit<HistoryEntry, 'id'>): HistoryEntry {
  const newEntry: HistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  const history = getLocalHistory();
  const updated = [newEntry, ...history].slice(0, 50); // Keep last 50
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newEntry;
}

export function deleteFromLocalHistory(id: string): void {
  const history = getLocalHistory();
  const updated = history.filter((entry) => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearLocalHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
