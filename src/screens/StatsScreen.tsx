import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HabitFrequencyList } from '../components/stats/HabitFrequencyList';
import { MoodDistribution } from '../components/stats/MoodDistribution';
import { StatCard } from '../components/stats/StatCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { HabitEntry } from '../types/entry';
import { Habit } from '../types/habit';
import { averageIntensityByHabit } from '../utils/stats/averageIntensityByHabit';
import { frequencyByHabit } from '../utils/stats/frequencyByHabit';
import { moodDistribution } from '../utils/stats/moodDistribution';
import { totalEntries } from '../utils/stats/totalEntries';

export const StatsScreen = ({ entries, habits }: { entries: HabitEntry[]; habits: Habit[] }) => {
  const total = totalEntries(entries);
  const frequencies = useMemo(() => frequencyByHabit(entries), [entries]);
  const avgIntensity = useMemo(() => averageIntensityByHabit(entries), [entries]);
  const moods = useMemo(() => moodDistribution(entries), [entries]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="Estatísticas" />
      <View style={styles.row}>
        <StatCard label="Total de registros" value={total} />
        <StatCard label="Hábitos com dados" value={Object.keys(frequencies).length} />
      </View>

      <SectionHeader title="Frequência por hábito" />
      <HabitFrequencyList frequencies={frequencies} habits={habits} />

      <SectionHeader title="Média de intensidade por hábito" />
      <HabitFrequencyList frequencies={avgIntensity} habits={habits} />

      <SectionHeader title="Distribuição de moods" />
      <MoodDistribution distribution={moods} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 40 },
  row: { flexDirection: 'row', gap: 8 },
});
