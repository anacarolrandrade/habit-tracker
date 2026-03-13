import { Intensity } from '../types/entry';

export const intensityOptions: { value: Intensity; label: string }[] = [
  { value: 'fraca', label: 'Fraca' },
  { value: 'media', label: 'Média' },
  { value: 'intensa', label: 'Intensa' },
];

export const intensityToNumber: Record<Intensity, number> = {
  fraca: 1,
  media: 2,
  intensa: 3,
};
