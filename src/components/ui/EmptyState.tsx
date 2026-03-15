import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

export const EmptyState = ({ message }: { message: string }) => (
  <View style={styles.container}>
    <Text style={styles.icon}>📝</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 32, marginBottom: 8 },
  message: { color: theme.colors.textMuted, textAlign: 'center', lineHeight: 20 },
});
