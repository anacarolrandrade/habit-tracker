import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { moodOptions } from '../../constants/moods';
import { theme } from '../../theme';
import { Mood } from '../../types/entry';

export const MoodSelector = ({ value, onChange }: { value: Mood; onChange: (mood: Mood) => void }) => (
  <View style={styles.row}>
    {moodOptions.map((option) => (
      <Pressable key={option.value} style={[styles.item, value === option.value && styles.selected]} onPress={() => onChange(option.value)}>
        <Text style={styles.emoji}>{option.emoji}</Text>
        <Text style={styles.label}>{option.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  item: { flex: 1, borderRadius: theme.radius.md, paddingVertical: 10, alignItems: 'center', backgroundColor: theme.colors.cardAlt, borderWidth: 1.5, borderColor: 'transparent' },
  selected: { borderColor: theme.colors.accent, backgroundColor: '#FDF3EC' },
  emoji: { fontSize: 18 },
  label: { fontSize: 9, color: theme.colors.textMuted, marginTop: 3, fontWeight: '500' },
});
