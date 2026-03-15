import { Habit } from '../types/habit';

export const defaultHabits: Habit[] = [
  { id: 'carencia', name: 'Carência', category: 'emocional', isActive: true },
  { id: 'disposicao', name: 'Disposição', category: 'saude_bem_estar', isActive: true },
  { id: 'apetite', name: 'Apetite', category: 'saude_bem_estar', isActive: true },
  { id: 'concentracao', name: 'Concentração', category: 'profissional', isActive: true },
  { id: 'libido', name: 'Libido', category: 'saude_bem_estar', isActive: true },
  { id: 'colica', name: 'Cólica / Desconfortos', category: 'saude_bem_estar', isActive: true },
];
