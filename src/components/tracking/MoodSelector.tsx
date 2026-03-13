import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { moodOptions } from '../../constants/moods';
import { Mood } from '../../types/entry';

export const MoodSelector = ({ value, onChange }: { value: Mood; onChange: (mood: Mood) => void }) => (
  <View style={styles.row}>
    {moodOptions.map((option) => (
      <Pressable key={option.value} style={[styles.item, value === option.value && styles.selected]} onPress={() => onChange(option.value)}>
        <Text>{option.emoji}</Text>
        <Text style={styles.label}>{option.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  item: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8, alignItems: 'center', minWidth: 82 },
  selected: { borderColor: '#1d4ed8', backgroundColor: '#dbeafe' },
  label: { fontSize: 12 },
});
