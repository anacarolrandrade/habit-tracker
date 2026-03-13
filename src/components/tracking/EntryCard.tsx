import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { moodOptions } from '../../constants/moods';
import { HabitEntry } from '../../types/entry';
import { Habit } from '../../types/habit';

export const EntryCard = ({ entry, habits, onPress }: { entry: HabitEntry; habits: Habit[]; onPress: () => void }) => {
  const habit = habits.find((h) => h.id === entry.habitId);
  const moodLabel = moodOptions.find((m) => m.value === entry.mood);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.habit}>{habit?.name ?? entry.habitId}</Text>
        <Text>{entry.date}</Text>
      </View>
      <Text>{moodLabel?.emoji} {moodLabel?.label} • Intensidade: {entry.intensity}</Text>
      {!!entry.note && <Text style={styles.note}>{entry.note}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 12, gap: 6, marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  habit: { fontWeight: '700' },
  note: { color: '#475569' },
});
