import React from 'react';
import { Input } from '../ui/Input';

export const NoteInput = ({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) => (
  <Input value={value} onChangeText={onChangeText} placeholder="Observação (opcional)" multiline numberOfLines={3} />
);
