import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export const Input = (props: TextInputProps) => <TextInput style={styles.input} placeholderTextColor="#94a3b8" {...props} />;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
  },
});
