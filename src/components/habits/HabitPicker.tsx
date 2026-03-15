import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Habit } from '../../types/habit';
import { theme } from '../../theme';

export const HabitPicker = ({ habits, selectedHabitId, onPick }: { habits: Habit[]; selectedHabitId: string; onPick: (habitId: string) => void }) => (
  <View style={styles.wrap}>
    {habits.map((habit) => (
      <Pressable key={habit.id} style={[styles.item, selectedHabitId === habit.id && styles.selected]} onPress={() => onPick(habit.id)}>
        <Text style={[styles.text, selectedHabitId === habit.id && styles.selectedText]}>{habit.name}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  item: { borderWidth: 1, borderColor: theme.colors.borderStrong, borderRadius: theme.radius.md, padding: 10, backgroundColor: theme.colors.cardBg },
  selected: { borderColor: theme.colors.accent, backgroundColor: '#FDF3EC' },
  text: { color: theme.colors.textPrimary, fontSize: 14 },
  selectedText: { color: theme.colors.accent, fontWeight: '600' },
});
