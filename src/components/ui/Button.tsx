import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export const Button = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: { backgroundColor: '#2563eb', borderRadius: 8, padding: 12, marginTop: 8 },
  text: { color: '#fff', fontWeight: '700', textAlign: 'center' },
});
