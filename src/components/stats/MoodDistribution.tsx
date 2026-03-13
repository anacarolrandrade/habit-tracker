import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moodOptions } from '../../constants/moods';
import { Mood } from '../../types/entry';

export const MoodDistribution = ({ distribution }: { distribution: Record<Mood, number> }) => (
  <View style={styles.wrap}>
    {moodOptions.map((mood) => (
      <View key={mood.value} style={styles.row}>
        <Text>{mood.emoji} {mood.label}</Text>
        <Text>{distribution[mood.value] ?? 0}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});
