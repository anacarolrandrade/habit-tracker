import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { IntensitySelector } from '../components/tracking/IntensitySelector';
import { MoodSelector } from '../components/tracking/MoodSelector';
import { NoteInput } from '../components/tracking/NoteInput';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { HabitEntry, Intensity, Mood } from '../types/entry';
import { theme } from '../theme';

interface Props {
  entry: HabitEntry;
  onSave: (patch: Pick<HabitEntry, 'mood' | 'intensity' | 'note'>) => Promise<void>;
  onDelete: () => Promise<void>;
  onClose: () => void;
}

export const EditEntryScreen = ({ entry, onSave, onDelete, onClose }: Props) => {
  const [mood, setMood] = useState<Mood>(entry.mood);
  const [intensity, setIntensity] = useState<Intensity>(entry.intensity);
  const [note, setNote] = useState(entry.note ?? '');

  const handleDelete = () => {
    Alert.alert('Excluir registro', 'Essa ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await onDelete();
          onClose();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Registro</Text>
      <Text style={styles.subtitle}>Data: {entry.date}</Text>

      <SectionHeader title="Mood" />
      <MoodSelector value={mood} onChange={setMood} />

      <SectionHeader title="Intensidade" />
      <IntensitySelector value={intensity} onChange={setIntensity} />

      <SectionHeader title="Observação" />
      <NoteInput value={note} onChangeText={setNote} />

      <Button label="Salvar alterações" onPress={async () => { await onSave({ mood, intensity, note: note.trim() || undefined }); onClose(); }} />
      <Button label="Excluir registro" variant="danger" onPress={handleDelete} />
      <Button label="Cancelar" variant="secondary" onPress={onClose} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 24, backgroundColor: theme.colors.appBg, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: '600', color: theme.colors.textPrimary },
  subtitle: { fontSize: 13, color: theme.colors.textMuted, marginTop: 2 },
});
