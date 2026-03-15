import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { HabitPicker } from '../components/habits/HabitPicker';
import { IntensitySelector } from '../components/tracking/IntensitySelector';
import { MoodSelector } from '../components/tracking/MoodSelector';
import { NoteInput } from '../components/tracking/NoteInput';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { todayDayISO } from '../utils/date/dayKey';
import { Habit } from '../types/habit';
import { Intensity, Mood } from '../types/entry';
import { theme } from '../theme';

interface Props {
  habits: Habit[];
  initialHabitId?: string;
  onSave: (params: { habitId: string; date: string; mood: Mood; intensity: Intensity; note?: string }) => Promise<{ ok: boolean; error?: string }>;
  onCancel: () => void;
}

export const NewEntryScreen = ({ habits, initialHabitId, onSave, onCancel }: Props) => {
  const activeHabits = useMemo(() => habits.filter((habit) => habit.isActive), [habits]);
  const [habitId, setHabitId] = useState(initialHabitId ?? activeHabits[0]?.id ?? '');
  const [mood, setMood] = useState<Mood>('neutro');
  const [intensity, setIntensity] = useState<Intensity>('media');
  const [note, setNote] = useState('');

  const handleSave = async () => {
    if (!habitId) {
      Alert.alert('Validação', 'Selecione um hábito ativo.');
      return;
    }

    const result = await onSave({ habitId, date: todayDayISO(), mood, intensity, note: note.trim() || undefined });
    if (!result.ok) {
      Alert.alert('Não foi possível salvar', result.error || 'Erro inesperado');
      return;
    }
    onCancel();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Novo Registro</Text>
      <Text style={styles.subtitle}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>

      <SectionHeader title="Hábito" />
      <HabitPicker habits={activeHabits} selectedHabitId={habitId} onPick={setHabitId} />

      <SectionHeader title="Mood" />
      <MoodSelector value={mood} onChange={setMood} />

      <SectionHeader title="Intensidade" />
      <IntensitySelector value={intensity} onChange={setIntensity} />

      <SectionHeader title="Observação (opcional)" />
      <NoteInput value={note} onChangeText={setNote} />

      <Button label="Salvar registro" onPress={handleSave} />
      <Button label="Cancelar" variant="secondary" onPress={onCancel} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 24, backgroundColor: theme.colors.appBg, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: '600', color: theme.colors.textPrimary },
  subtitle: { fontSize: 13, color: theme.colors.textMuted, marginTop: 2, textTransform: 'capitalize' },
});
