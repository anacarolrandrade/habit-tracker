import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultHabits } from '../constants/habits';
import { entriesService } from '../services/entries.service';
import { trackingConfigService } from '../services/trackingConfig.service';
import { EntryInput, HabitEntry } from '../types/entry';
import { Habit } from '../types/habit';
import { TrackingConfig } from '../types/tracking';

interface TrackingStore {
  loading: boolean;
  habits: Habit[];
  config: TrackingConfig;
  entries: HabitEntry[];
  saveOnboarding: (selectedHabitIds: string[], periodDays: number) => Promise<void>;
  setHabitActive: (habitId: string, isActive: boolean) => Promise<void>;
  updatePeriodDays: (days: number) => Promise<void>;
  createEntry: (input: EntryInput) => Promise<{ ok: boolean; error?: string }>;
  updateEntry: (id: string, patch: Pick<HabitEntry, 'mood' | 'intensity' | 'note'>) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
}

const TrackingContext = createContext<TrackingStore | undefined>(undefined);

const initialConfig: TrackingConfig = {
  selectedHabitIds: [],
  periodDays: 30,
  startedAt: new Date().toISOString(),
  onboardingCompleted: false,
};

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<TrackingConfig>(initialConfig);
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [entries, setEntries] = useState<HabitEntry[]>([]);

  useEffect(() => {
    (async () => {
      const [storedConfig, storedEntries] = await Promise.all([
        trackingConfigService.load(),
        entriesService.load(),
      ]);
      setConfig(storedConfig);
      if (storedConfig.selectedHabitIds.length > 0) {
        setHabits((prev) => prev.map((h) => ({ ...h, isActive: storedConfig.selectedHabitIds.includes(h.id) })));
      }
      setEntries(storedEntries);
      setLoading(false);
    })();
  }, []);

  const persistConfig = async (next: TrackingConfig, nextHabits: Habit[] = habits) => {
    setConfig(next);
    setHabits(nextHabits);
    await trackingConfigService.save(next);
  };

  const value: TrackingStore = useMemo(
    () => ({
      loading,
      habits,
      config,
      entries,
      saveOnboarding: async (selectedHabitIds, periodDays) => {
        const nextHabits = habits.map((habit) => ({ ...habit, isActive: selectedHabitIds.includes(habit.id) }));
        const nextConfig: TrackingConfig = {
          selectedHabitIds,
          periodDays,
          startedAt: new Date().toISOString(),
          onboardingCompleted: true,
        };
        await persistConfig(nextConfig, nextHabits);
      },
      setHabitActive: async (habitId, isActive) => {
        const nextHabits = habits.map((habit) => (habit.id === habitId ? { ...habit, isActive } : habit));
        const selectedHabitIds = nextHabits.filter((h) => h.isActive).map((h) => h.id);
        const nextConfig = { ...config, selectedHabitIds };
        await persistConfig(nextConfig, nextHabits);
      },
      updatePeriodDays: async (days) => {
        const nextConfig = { ...config, periodDays: days };
        await persistConfig(nextConfig);
      },
      createEntry: async (input) => {
        const result = await entriesService.create(input);
        if (!result.ok || !result.data) {
          return { ok: false, error: result.error };
        }
        setEntries(result.data);
        return { ok: true };
      },
      updateEntry: async (id, patch) => {
        const next = await entriesService.update(id, patch);
        setEntries(next);
      },
      removeEntry: async (id) => {
        const next = await entriesService.remove(id);
        setEntries(next);
      },
    }),
    [loading, habits, config, entries],
  );

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export const useTrackingStore = (): TrackingStore => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTrackingStore must be used within TrackingProvider');
  }
  return context;
};
