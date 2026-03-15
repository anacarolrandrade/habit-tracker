import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ label, onPress, variant = 'primary' }: Props) => (
  <Pressable style={[styles.button, styles[variant]]} onPress={onPress}>
    <Text style={[styles.text, variant !== 'primary' && styles.textSecondary]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radius.md,
    paddingVertical: 13,
    paddingHorizontal: 12,
    marginTop: 8,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  secondary: {
    backgroundColor: theme.colors.cardBg,
    borderColor: theme.colors.borderStrong,
  },
  danger: {
    backgroundColor: theme.colors.dangerBg,
    borderColor: '#F09595',
  },
  text: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  textSecondary: { color: theme.colors.accent },
});
