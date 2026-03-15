import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

export const SectionHeader = ({ title }: { title: string }) => <Text style={styles.title}>{title}</Text>;

const styles = StyleSheet.create({
  title: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 18,
    marginBottom: 10,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
