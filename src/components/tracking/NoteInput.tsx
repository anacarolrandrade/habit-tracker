import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '../ui/Input';

export const NoteInput = ({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) => (
  <Input
    value={value}
    onChangeText={onChangeText}
    placeholder="Como você está se sentindo?"
    multiline
    numberOfLines={3}
    style={styles.input}
  />
);

const styles = StyleSheet.create({ input: { minHeight: 72, textAlignVertical: 'top' } });
