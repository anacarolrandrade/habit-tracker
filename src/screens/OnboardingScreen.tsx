import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HabitMultiSelect } from '../components/habits/HabitMultiSelect';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { NumberSuggestions } from '../components/ui/NumberSuggestions';
import { SectionHeader } from '../components/ui/SectionHeader';
import { periodMaxDays, periodMinDays, periodSuggestions } from '../constants/periodSuggestions';
import { Habit } from '../types/habit';

interface Props {
  habits: Habit[];
  onSave: (selectedHabitIds: string[], periodDays: number) => Promise<void>;
}

export const OnboardingScreen = ({ habits, onSave }: Props) => {
  const [selectedHabitIds, setSelectedHabitIds] = useState<string[]>(habits.filter((h) => h.isActive).map((h) => h.id));
  const [periodInput, setPeriodInput] = useState('30');

  const periodDays = useMemo(() => Number(periodInput), [periodInput]);

  const toggleHabit = (habitId: string) => {
    setSelectedHabitIds((prev) =>
      prev.includes(habitId) ? prev.filter((id) => id !== habitId) : [...prev, habitId],
    );
  };

  const handleSubmit = async () => {
    if (selectedHabitIds.length === 0) {
      Alert.alert('Validação', 'Selecione pelo menos um hábito.');
      return;
    }
    if (!Number.isInteger(periodDays) || periodDays < periodMinDays || periodDays > periodMaxDays) {
      Alert.alert('Validação', `Informe período entre ${periodMinDays} e ${periodMaxDays} dias.`);
      return;
    }
    await onSave(selectedHabitIds, periodDays);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>
      <Text style={styles.subtitle}>Configure seus hábitos e período de acompanhamento.</Text>

      <SectionHeader title="Hábitos" />
      <HabitMultiSelect habits={habits} selectedIds={selectedHabitIds} onToggle={toggleHabit} />

      <SectionHeader title="Período (dias)" />
      <Input
        keyboardType="number-pad"
        value={periodInput}
        onChangeText={setPeriodInput}
        placeholder="Ex.: 30"
      />
      <NumberSuggestions values={periodSuggestions} onPick={(value) => setPeriodInput(String(value))} />

      <Button label="Começar rastreamento" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 56, gap: 8 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#475569' },
});
