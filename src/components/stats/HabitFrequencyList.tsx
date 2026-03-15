import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Habit } from '../../types/habit';

export const HabitFrequencyList = ({ frequencies, habits }: { frequencies: Record<string, number>; habits: Habit[] }) => (
  <View style={styles.wrap}>
    {Object.entries(frequencies).map(([habitId, count]) => {
      const habitName = habits.find((h) => h.id === habitId)?.name ?? habitId;
      return (
        <View key={habitId} style={styles.row}>
          <Text>{habitName}</Text>
          <Text>{count}</Text>
        </View>
      );
    })}
    {Object.keys(frequencies).length === 0 && <Text style={styles.empty}>Sem dados ainda.</Text>}
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  empty: { color: '#64748b' },
});
