import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { HabitChip } from '../components/habits/HabitChip';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { NumberSuggestions } from '../components/ui/NumberSuggestions';
import { SectionHeader } from '../components/ui/SectionHeader';
import { periodSuggestions } from '../constants/periodSuggestions';
import { Habit } from '../types/habit';

interface Props {
  habits: Habit[];
  periodDays: number;
  onToggleHabit: (habitId: string, isActive: boolean) => Promise<void>;
  onSavePeriod: (days: number) => Promise<void>;
}

export const SettingsScreen = ({ habits, periodDays, onToggleHabit, onSavePeriod }: Props) => {
  const [periodInput, setPeriodInput] = useState(String(periodDays));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="Configurações" />

      <SectionHeader title="Hábitos ativos" />
      <View style={styles.row}>
        {habits.map((habit) => (
          <HabitChip
            key={habit.id}
            habit={habit}
            selected={habit.isActive}
            onPress={() => onToggleHabit(habit.id, !habit.isActive)}
          />
        ))}
      </View>

      <SectionHeader title="Período (dias)" />
      <Input keyboardType="number-pad" value={periodInput} onChangeText={setPeriodInput} />
      <NumberSuggestions values={periodSuggestions} onPick={(value) => setPeriodInput(String(value))} />
      <Button label="Salvar período" onPress={() => onSavePeriod(Number(periodInput) || periodDays)} />

      <Text style={styles.info}>Somente hábitos ativos aparecem em novo registro.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 40 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  info: { color: '#64748b', marginTop: 12 },
});
