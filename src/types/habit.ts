import { ID } from './common';

export type HabitCategory = 'saude_bem_estar' | 'emocional' | 'profissional';

export interface Habit {
  id: ID;
  name: string;
  category: HabitCategory;
  isActive: boolean;
}
