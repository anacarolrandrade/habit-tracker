import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.card}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 12, minWidth: 120 },
  value: { fontSize: 20, fontWeight: '700' },
  label: { color: '#64748b' },
});
