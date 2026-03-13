import { storageKeys } from './storage/keys';
import { storageClient } from './storage/storageClient';
import { TrackingConfig } from '../types/tracking';

const defaultConfig: TrackingConfig = {
  selectedHabitIds: [],
  periodDays: 30,
  startedAt: new Date().toISOString(),
  onboardingCompleted: false,
};

export const trackingConfigService = {
  load: () => storageClient.getItem<TrackingConfig>(storageKeys.trackingConfig, defaultConfig),
  save: (config: TrackingConfig) => storageClient.setItem(storageKeys.trackingConfig, config),
};
