import { defaultHabits } from '../constants/habits';
import { EntryInput, HabitEntry } from '../types/entry';
import { storageKeys } from './storage/keys';
import { storageClient } from './storage/storageClient';

const byDateDesc = (a: HabitEntry, b: HabitEntry) => (a.date < b.date ? 1 : -1);

const randomId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getCategory = (habitId: string) => defaultHabits.find((habit) => habit.id === habitId)?.category ?? 'emocional';

export const entriesService = {
  async load(): Promise<HabitEntry[]> {
    const items = await storageClient.getItem<HabitEntry[]>(storageKeys.entries, []);
    return items.sort(byDateDesc);
  },

  async create(input: EntryInput): Promise<{ ok: boolean; error?: string; data?: HabitEntry[] }> {
    const items = await this.load();
    const duplicated = items.some((item) => item.habitId === input.habitId && item.date === input.date);
    if (duplicated) {
      return { ok: false, error: 'Já existe registro desse hábito para este dia.' };
    }

    const now = new Date().toISOString();
    const newItem: HabitEntry = {
      ...input,
      id: randomId(),
      category: getCategory(input.habitId),
      createdAt: now,
      updatedAt: now,
    };
    const next = [newItem, ...items].sort(byDateDesc);
    await storageClient.setItem(storageKeys.entries, next);
    return { ok: true, data: next };
  },

  async update(id: string, patch: Pick<HabitEntry, 'mood' | 'intensity' | 'note'>): Promise<HabitEntry[]> {
    const items = await this.load();
    const next = items.map((item) =>
      item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item,
    );
    await storageClient.setItem(storageKeys.entries, next);
    return next.sort(byDateDesc);
  },

  async remove(id: string): Promise<HabitEntry[]> {
    const items = await this.load();
    const next = items.filter((item) => item.id !== id);
    await storageClient.setItem(storageKeys.entries, next);
    return next.sort(byDateDesc);
  },
};
