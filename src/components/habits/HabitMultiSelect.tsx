import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Habit } from '../../types/habit';
import { HabitChip } from './HabitChip';

export const HabitMultiSelect = ({ habits, selectedIds, onToggle }: { habits: Habit[]; selectedIds: string[]; onToggle: (habitId: string) => void }) => (
  <View style={styles.wrap}>
    {habits.map((habit) => (
      <HabitChip key={habit.id} habit={habit} selected={selectedIds.includes(habit.id)} onPress={() => onToggle(habit.id)} />
    ))}
  </View>
);

const styles = StyleSheet.create({ wrap: { gap: 8 } });
