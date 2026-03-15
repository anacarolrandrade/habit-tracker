import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { moodOptions } from '../constants/moods';
import { HabitEntry } from '../types/entry';
import { Habit } from '../types/habit';
import { theme } from '../theme';
import { averageIntensityByHabit } from '../utils/stats/averageIntensityByHabit';
import { frequencyByHabit } from '../utils/stats/frequencyByHabit';
import { moodDistribution } from '../utils/stats/moodDistribution';

export const StatsScreen = ({ entries, habits }: { entries: HabitEntry[]; habits: Habit[] }) => {
  const frequencies = useMemo(() => frequencyByHabit(entries), [entries]);
  const avgIntensity = useMemo(() => averageIntensityByHabit(entries), [entries]);
  const moods = useMemo(() => moodDistribution(entries), [entries]);
  const uniqueDays = new Set(entries.map((entry) => entry.date)).size;

  const maxFreq = Math.max(...Object.values(frequencies), 1);
  const maxMood = Math.max(...Object.values(moods), 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>
      <Text style={styles.subtitle}>Visão geral</Text>

      <View style={styles.grid}>
        <StatItem label="Total de registros" value={entries.length.toString()} />
        <StatItem label="Hábitos ativos" value={habits.filter((habit) => habit.isActive).length.toString()} />
        <StatItem label="Dias com registro" value={uniqueDays.toString()} />
        <StatItem
          label="Intensidade média"
          value={entries.length > 0 ? (Object.values(avgIntensity).reduce((sum, value) => sum + value, 0) / Math.max(Object.values(avgIntensity).length, 1)).toFixed(1) : '–'}
        />
      </View>

      <Text style={styles.section}>Frequência por hábito</Text>
      <View style={styles.card}>
        {habits.filter((habit) => habit.isActive).map((habit) => {
          const count = frequencies[habit.id] ?? 0;
          return (
            <View key={habit.id} style={styles.barRow}>
              <Text style={styles.barLabel}>{habit.name}</Text>
              <View style={styles.track}><View style={[styles.fill, { width: `${Math.round((count / maxFreq) * 100)}%` }]} /></View>
              <Text style={styles.count}>{count}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.section}>Distribuição de mood</Text>
      <View style={styles.card}>
        {moodOptions.map((option) => (
          <View key={option.value} style={styles.barRow}>
            <Text style={styles.barLabel}>{option.emoji} {option.label}</Text>
            <View style={styles.track}><View style={[styles.fillAlt, { width: `${Math.round(((moods[option.value] ?? 0) / maxMood) * 100)}%` }]} /></View>
            <Text style={styles.count}>{moods[option.value] ?? 0}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statCard}>
    <Text style={styles.statVal}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 24, backgroundColor: theme.colors.appBg },
  title: { fontSize: 22, fontWeight: '600', color: theme.colors.textPrimary },
  subtitle: { fontSize: 13, color: theme.colors.textMuted },
  grid: { marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', backgroundColor: theme.colors.cardBg, borderRadius: theme.radius.md, borderWidth: 0.5, borderColor: theme.colors.border, padding: 12 },
  statVal: { fontSize: 26, fontWeight: '600', color: theme.colors.textPrimary },
  statLabel: { fontSize: 11, color: theme.colors.textMuted, marginTop: 2 },
  section: { marginTop: 18, marginBottom: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: theme.colors.textMuted, fontWeight: '500' },
  card: { backgroundColor: theme.colors.cardBg, borderRadius: theme.radius.lg, borderWidth: 0.5, borderColor: theme.colors.border, padding: 12 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  barLabel: { width: 110, fontSize: 12, color: theme.colors.textSecondary },
  track: { flex: 1, height: 6, backgroundColor: theme.colors.cardAlt, borderRadius: 6, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: theme.colors.accent2 },
  fillAlt: { height: '100%', backgroundColor: theme.colors.accent },
  count: { width: 20, textAlign: 'right', fontSize: 12, color: theme.colors.textMuted },
});
