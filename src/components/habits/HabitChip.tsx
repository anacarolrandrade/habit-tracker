import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Habit } from '../../types/habit';

export const HabitChip = ({ habit, selected, onPress }: { habit: Habit; selected: boolean; onPress: () => void }) => (
  <Pressable style={[styles.chip, selected && styles.selected]} onPress={onPress}>
    <Text style={selected ? styles.selectedText : undefined}>{habit.name}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  selected: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  selectedText: { color: 'white' },
});
