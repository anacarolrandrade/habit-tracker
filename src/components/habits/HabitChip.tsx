import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Habit } from '../../types/habit';
import { theme } from '../../theme';

const categoryLabel: Record<Habit['category'], string> = {
  saude_bem_estar: 'Saúde',
  emocional: 'Emocional',
  profissional: 'Profissional',
};

const categoryStyle: Record<Habit['category'], object> = {
  saude_bem_estar: { backgroundColor: theme.colors.catSaude },
  emocional: { backgroundColor: theme.colors.catEmocional },
  profissional: { backgroundColor: theme.colors.catProfissional },
};

export const HabitChip = ({ habit, selected, onPress }: { habit: Habit; selected: boolean; onPress: () => void }) => (
  <Pressable style={[styles.row, selected && styles.rowSelected]} onPress={onPress}>
    <Text style={styles.name}>{habit.name}</Text>
    <View style={[styles.badge, categoryStyle[habit.category]]}>
      <Text style={styles.badgeText}>{categoryLabel[habit.category]}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '100%',
  },
  rowSelected: { borderColor: theme.colors.accent2, backgroundColor: '#FDF9F6' },
  name: { color: theme.colors.textPrimary, fontSize: 14, fontWeight: '500', flex: 1 },
  badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 10, fontWeight: '600', color: theme.colors.textSecondary },
});
