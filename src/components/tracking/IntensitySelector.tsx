import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { intensityOptions } from '../../constants/intensity';
import { theme } from '../../theme';
import { Intensity } from '../../types/entry';

export const IntensitySelector = ({ value, onChange }: { value: Intensity; onChange: (value: Intensity) => void }) => (
  <View style={styles.row}>
    {intensityOptions.map((option) => (
      <Pressable key={option.value} style={[styles.item, value === option.value && styles.selected]} onPress={() => onChange(option.value)}>
        <Text style={[styles.text, value === option.value && styles.textSelected]}>{option.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  item: { flex: 1, borderWidth: 1.5, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingVertical: 10, alignItems: 'center', backgroundColor: theme.colors.cardBg },
  selected: { borderColor: theme.colors.accent, backgroundColor: theme.colors.accent },
  text: { color: theme.colors.textSecondary, fontWeight: '500' },
  textSelected: { color: '#fff' },
});
