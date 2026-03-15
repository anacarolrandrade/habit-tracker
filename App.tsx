import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { NewEntryScreen } from './src/screens/NewEntryScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { StatsScreen } from './src/screens/StatsScreen';
import { EditEntryScreen } from './src/screens/EditEntryScreen';
import { TrackingProvider, useTrackingStore } from './src/store/tracking.store';
import { HabitEntry } from './src/types/entry';
import { theme } from './src/theme';

const MainApp = () => {
  const { loading, config, habits, entries, saveOnboarding, createEntry, updateEntry, removeEntry, setHabitActive, updatePeriodDays } = useTrackingStore();
  const [tab, setTab] = useState<'home' | 'stats' | 'settings'>('home');
  const [route, setRoute] = useState<'main' | 'new-entry' | 'edit-entry'>('main');
  const [selectedEntry, setSelectedEntry] = useState<HabitEntry | null>(null);
  const [initialHabitId, setInitialHabitId] = useState<string | undefined>(undefined);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator color={theme.colors.accent} />
      </SafeAreaView>
    );
  }

  if (!config.onboardingCompleted) {
    return <OnboardingScreen habits={habits} onSave={saveOnboarding} />;
  }

  if (route === 'new-entry') {
    return (
      <NewEntryScreen
        habits={habits}
        initialHabitId={initialHabitId}
        onSave={createEntry}
        onCancel={() => {
          setInitialHabitId(undefined);
          setRoute('main');
        }}
      />
    );
  }

  if (route === 'edit-entry' && selectedEntry) {
    return (
      <EditEntryScreen
        entry={selectedEntry}
        onSave={(patch) => updateEntry(selectedEntry.id, patch)}
        onDelete={() => removeEntry(selectedEntry.id)}
        onClose={() => {
          setSelectedEntry(null);
          setRoute('main');
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {tab === 'home' && (
        <HomeScreen
          entries={entries}
          habits={habits}
          periodDays={config.periodDays}
          onNew={() => setRoute('new-entry')}
          onNewForHabit={(habitId) => {
            setInitialHabitId(habitId);
            setRoute('new-entry');
          }}
          onOpenEntry={(entry) => {
            setSelectedEntry(entry);
            setRoute('edit-entry');
          }}
        />
      )}
      {tab === 'stats' && <StatsScreen entries={entries} habits={habits} />}
      {tab === 'settings' && (
        <SettingsScreen
          habits={habits}
          periodDays={config.periodDays}
          onToggleHabit={setHabitActive}
          onSavePeriod={updatePeriodDays}
        />
      )}

      <View style={styles.tabbar}>
        <TabItem icon="📋" label="Rastreamento" active={tab === 'home'} onPress={() => setTab('home')} />
        <TabItem icon="📊" label="Estatísticas" active={tab === 'stats'} onPress={() => setTab('stats')} />
        <TabItem icon="⚙️" label="Configurações" active={tab === 'settings'} onPress={() => setTab('settings')} />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const TabItem = ({ icon, label, active, onPress }: { icon: string; label: string; active: boolean; onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.tabItem}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    <View style={[styles.dot, active && styles.dotActive]} />
  </Pressable>
);

export default function App() {
  return (
    <TrackingProvider>
      <MainApp />
    </TrackingProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.appBg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.appBg },
  tabbar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.border,
    paddingVertical: 8,
    backgroundColor: theme.colors.cardBg,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  icon: { fontSize: 20 },
  tabText: { color: theme.colors.textMuted, fontSize: 10, fontWeight: '500' },
  tabTextActive: { color: theme.colors.accent },
  dot: { width: 4, height: 4, borderRadius: 999, backgroundColor: 'transparent' },
  dotActive: { backgroundColor: theme.colors.accent },
});
