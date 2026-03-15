import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../../theme';

export const Input = (props: TextInputProps) => <TextInput style={styles.input} placeholderTextColor={theme.colors.textMuted} {...props} />;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.cardBg,
  },
});
