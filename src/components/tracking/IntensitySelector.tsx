import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { intensityOptions } from '../../constants/intensity';
import { Intensity } from '../../types/entry';

export const IntensitySelector = ({ value, onChange }: { value: Intensity; onChange: (value: Intensity) => void }) => (
  <View style={styles.row}>
    {intensityOptions.map((option) => (
      <Pressable key={option.value} style={[styles.item, value === option.value && styles.selected]} onPress={() => onChange(option.value)}>
        <Text>{option.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  item: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  selected: { borderColor: '#1d4ed8', backgroundColor: '#dbeafe' },
});
