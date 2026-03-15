import { intensityToNumber } from '../../constants/intensity';
import { HabitEntry } from '../../types/entry';

export const averageIntensityByHabit = (entries: HabitEntry[]): Record<string, number> => {
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};

  entries.forEach((entry) => {
    sums[entry.habitId] = (sums[entry.habitId] || 0) + intensityToNumber[entry.intensity];
    counts[entry.habitId] = (counts[entry.habitId] || 0) + 1;
  });

  return Object.keys(sums).reduce<Record<string, number>>((acc, habitId) => {
    acc[habitId] = Number((sums[habitId] / counts[habitId]).toFixed(2));
    return acc;
  }, {});
};
