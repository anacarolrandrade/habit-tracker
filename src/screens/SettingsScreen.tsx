import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { HabitChip } from '../components/habits/HabitChip';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { NumberSuggestions } from '../components/ui/NumberSuggestions';
import { SectionHeader } from '../components/ui/SectionHeader';
import { periodSuggestions } from '../constants/periodSuggestions';
import { Habit } from '../types/habit';
import { theme } from '../theme';

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
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.subtitle}>Preferências</Text>

      <SectionHeader title="Duração do período" />
      <View style={styles.card}>
        <Text style={styles.label}>Período de análise em dias</Text>
        <Input keyboardType="number-pad" value={periodInput} onChangeText={setPeriodInput} />
        <NumberSuggestions values={periodSuggestions} onPick={(value) => setPeriodInput(String(value))} />
        <Button label="Salvar período" onPress={() => onSavePeriod(Number(periodInput) || periodDays)} />
      </View>

      <SectionHeader title="Hábitos acompanhados" />
      <View style={styles.card}>
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
      </View>

      <View style={[styles.card, styles.infoCard]}>
        <Text style={styles.infoSmall}>Dados armazenados localmente</Text>
        <Text style={styles.info}>Somente hábitos ativos aparecem em novo registro.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 24, backgroundColor: theme.colors.appBg },
  title: { fontSize: 22, fontWeight: '600', color: theme.colors.textPrimary },
  subtitle: { fontSize: 13, color: theme.colors.textMuted },
  label: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 2 },
  card: { backgroundColor: theme.colors.cardBg, borderWidth: 0.5, borderColor: theme.colors.border, borderRadius: theme.radius.lg, padding: 14 },
  row: { gap: 8 },
  infoCard: { backgroundColor: theme.colors.cardAlt, marginTop: 16 },
  infoSmall: { fontSize: 11, color: theme.colors.textMuted, marginBottom: 4, textAlign: 'center' },
  info: { fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center' },
});
