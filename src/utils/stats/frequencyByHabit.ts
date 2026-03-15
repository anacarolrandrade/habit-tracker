import { HabitEntry } from '../../types/entry';

export const frequencyByHabit = (entries: HabitEntry[]): Record<string, number> => {
  return entries.reduce<Record<string, number>>((acc, item) => {
    acc[item.habitId] = (acc[item.habitId] || 0) + 1;
    return acc;
  }, {});
};
