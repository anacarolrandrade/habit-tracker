import { DayISO, ID, ISODateTime } from './common';
import { HabitCategory } from './habit';

export type Mood = 'muito_ruim' | 'ruim' | 'neutro' | 'bom' | 'muito_bom';
export type Intensity = 'fraca' | 'media' | 'intensa';

export interface HabitEntry {
  id: ID;
  habitId: ID;
  date: DayISO;
  mood: Mood;
  intensity: Intensity;
  note?: string;
  category: HabitCategory;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface EntryInput {
  habitId: ID;
  date: DayISO;
  mood: Mood;
  intensity: Intensity;
  note?: string;
}
