import { ID, ISODateTime } from './common';

export interface TrackingConfig {
  selectedHabitIds: ID[];
  periodDays: number;
  startedAt: ISODateTime;
  onboardingCompleted: boolean;
}
