import { Mood, HabitEntry } from '../../types/entry';

const allMoods: Mood[] = ['muito_ruim', 'ruim', 'neutro', 'bom', 'muito_bom'];

export const moodDistribution = (entries: HabitEntry[]): Record<Mood, number> => {
  const base = allMoods.reduce<Record<Mood, number>>((acc, mood) => {
    acc[mood] = 0;
    return acc;
  }, {} as Record<Mood, number>);

  entries.forEach((entry) => {
    base[entry.mood] += 1;
  });

  return base;
};
