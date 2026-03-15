import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

export const NumberSuggestions = ({ values, onPick }: { values: number[]; onPick: (value: number) => void }) => (
  <View style={styles.row}>
    {values.map((value) => (
      <Pressable key={value} style={styles.item} onPress={() => onPick(value)}>
        <Text style={styles.text}>{value} dias</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  item: { borderWidth: 1, borderColor: theme.colors.borderStrong, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: theme.colors.cardBg },
  text: { color: theme.colors.textSecondary, fontSize: 12 },
});
