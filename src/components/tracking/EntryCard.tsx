import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { moodOptions } from '../../constants/moods';
import { HabitEntry } from '../../types/entry';
import { Habit } from '../../types/habit';
import { theme } from '../../theme';

export const EntryCard = ({ entry, habits, onPress }: { entry: HabitEntry; habits: Habit[]; onPress: () => void }) => {
  const habit = habits.find((h) => h.id === entry.habitId);
  const mood = moodOptions.find((m) => m.value === entry.mood);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.icon}><Text style={styles.iconText}>{mood?.emoji ?? '🙂'}</Text></View>
      <View style={styles.info}>
        <Text style={styles.habit}>{habit?.name ?? entry.habitId}</Text>
        <Text style={styles.meta}>{entry.note ? entry.note.slice(0, 30) : 'Sem observação'}</Text>
        <Text style={styles.chip}>{entry.intensity}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.date}>{entry.date}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.cardBg,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  icon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.cardAlt },
  iconText: { fontSize: 18 },
  info: { flex: 1 },
  habit: { fontSize: 14, fontWeight: '600', color: theme.colors.textPrimary },
  meta: { color: theme.colors.textMuted, fontSize: 12, marginTop: 2 },
  chip: { marginTop: 4, alignSelf: 'flex-start', backgroundColor: theme.colors.cardAlt, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, fontSize: 10 },
  right: { alignItems: 'flex-end' },
  date: { fontSize: 11, color: theme.colors.textMuted },
});
