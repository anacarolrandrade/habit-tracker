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

const MainApp = () => {
  const { loading, config, habits, entries, saveOnboarding, createEntry, updateEntry, removeEntry, setHabitActive, updatePeriodDays } = useTrackingStore();
  const [tab, setTab] = useState<'home' | 'stats' | 'settings'>('home');
  const [route, setRoute] = useState<'main' | 'new-entry' | 'edit-entry'>('main');
  const [selectedEntry, setSelectedEntry] = useState<HabitEntry | null>(null);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!config.onboardingCompleted) {
    return <OnboardingScreen habits={habits} onSave={saveOnboarding} />;
  }

  if (route === 'new-entry') {
    return <NewEntryScreen habits={habits} onSave={createEntry} onCancel={() => setRoute('main')} />;
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
          onNew={() => setRoute('new-entry')}
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
        <TabItem label="Histórico" active={tab === 'home'} onPress={() => setTab('home')} />
        <TabItem label="Stats" active={tab === 'stats'} onPress={() => setTab('stats')} />
        <TabItem label="Config" active={tab === 'settings'} onPress={() => setTab('settings')} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const TabItem = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.tabItem}>
    <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabbar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 8,
    justifyContent: 'space-around',
  },
  tabItem: { padding: 8 },
  tabText: { color: '#64748b' },
  tabTextActive: { color: '#1d4ed8', fontWeight: '700' },
});
