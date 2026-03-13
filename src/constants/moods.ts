import { Mood } from '../types/entry';

export const moodOptions: { value: Mood; label: string; emoji: string }[] = [
  { value: 'muito_ruim', label: 'Muito ruim', emoji: '😞' },
  { value: 'ruim', label: 'Ruim', emoji: '🙁' },
  { value: 'neutro', label: 'Neutro', emoji: '😐' },
  { value: 'bom', label: 'Bom', emoji: '🙂' },
  { value: 'muito_bom', label: 'Muito bom', emoji: '😁' },
];
