import { ID } from './common';
import { Mood } from './entry';

export interface StatsSnapshot {
  totalEntries: number;
  frequencyByHabit: Record<ID, number>;
  averageIntensityByHabit: Record<ID, number>;
  moodDistribution: Record<Mood, number>;
}
