import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const SectionHeader = ({ title }: { title: string }) => <Text style={styles.title}>{title}</Text>;

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
});
