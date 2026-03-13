import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Habit } from '../../types/habit';

export const HabitPicker = ({ habits, selectedHabitId, onPick }: { habits: Habit[]; selectedHabitId: string; onPick: (habitId: string) => void }) => (
  <View style={styles.wrap}>
    {habits.map((habit) => (
      <Pressable key={habit.id} style={[styles.item, selectedHabitId === habit.id && styles.selected]} onPress={() => onPick(habit.id)}>
        <Text style={selectedHabitId === habit.id ? styles.selectedText : undefined}>{habit.name}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  item: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  selected: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  selectedText: { color: 'white' },
});
