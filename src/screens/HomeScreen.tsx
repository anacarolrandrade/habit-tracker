import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { EntryCard } from '../components/tracking/EntryCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { SectionHeader } from '../components/ui/SectionHeader';
import { HabitEntry } from '../types/entry';
import { Habit } from '../types/habit';

interface Props {
  entries: HabitEntry[];
  habits: Habit[];
  onNew: () => void;
  onOpenEntry: (entry: HabitEntry) => void;
}

export const HomeScreen = ({ entries, habits, onNew, onOpenEntry }: Props) => (
  <View style={styles.container}>
    <SectionHeader title="Histórico" />
    <Button label="Novo registro" onPress={onNew} />
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EntryCard entry={item} habits={habits} onPress={() => onOpenEntry(item)} />}
      ListEmptyComponent={<EmptyState message="Nenhum registro ainda." />}
      contentContainerStyle={styles.list}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  list: { paddingBottom: 24 },
});
