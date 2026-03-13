import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const EmptyState = ({ message }: { message: string }) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  message: { color: '#64748b' },
});
