import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { HabitChip } from '../components/habits/HabitChip';
import { EntryCard } from '../components/tracking/EntryCard';
import { EmptyState } from '../components/ui/EmptyState';
import { SectionHeader } from '../components/ui/SectionHeader';
import { HabitEntry } from '../types/entry';
import { Habit } from '../types/habit';
import { theme } from '../theme';

interface Props {
  entries: HabitEntry[];
  habits: Habit[];
  periodDays: number;
  onNew: () => void;
  onOpenEntry: (entry: HabitEntry) => void;
  onNewForHabit: (habitId: string) => void;
}

export const HomeScreen = ({ entries, habits, periodDays, onNew, onOpenEntry, onNewForHabit }: Props) => {
  const activeHabits = habits.filter((habit) => habit.isActive);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.subtitle}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
          <Text style={styles.title}>Análise de Hábitos</Text>
        </View>
        <Text style={styles.plus} onPress={onNew}>＋</Text>
      </View>

      <View style={styles.periodCard}>
        <View>
          <Text style={styles.periodValue}>{periodDays}</Text>
          <Text style={styles.periodLabel}>dias de rastreamento</Text>
        </View>
        <Text style={styles.periodMeta}>{entries.length} registros</Text>
      </View>

      <SectionHeader title="Hábitos monitorados" />
      <View style={styles.habitsList}>
        {activeHabits.length > 0 ? activeHabits.map((habit) => (
          <HabitChip key={habit.id} habit={habit} selected onPress={() => onNewForHabit(habit.id)} />
        )) : <EmptyState message="Nenhum hábito ativo. Ajuste em configurações." />}
      </View>

      <SectionHeader title="Registros recentes" />
      <FlatList
        data={[...entries].slice(0, 8)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EntryCard entry={item} habits={habits} onPress={() => onOpenEntry(item)} />}
        ListEmptyComponent={<EmptyState message="Nenhum registro ainda." />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 18, backgroundColor: theme.colors.appBg },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subtitle: { fontSize: 13, color: theme.colors.textMuted, textTransform: 'capitalize' },
  title: { fontSize: 22, color: theme.colors.textPrimary, fontWeight: '600' },
  plus: { width: 40, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 999, backgroundColor: theme.colors.cardBg, borderWidth: 0.5, borderColor: theme.colors.border, fontSize: 24, color: theme.colors.textPrimary },
  periodCard: { marginTop: 18, borderWidth: 0.5, borderColor: theme.colors.border, backgroundColor: theme.colors.cardAlt, borderRadius: theme.radius.md, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  periodValue: { fontSize: 22, fontWeight: '600', color: theme.colors.textPrimary },
  periodLabel: { fontSize: 11, color: theme.colors.textMuted },
  periodMeta: { fontSize: 12, color: theme.colors.textMuted },
  habitsList: { gap: 8 },
  list: { paddingBottom: 24 },
});
