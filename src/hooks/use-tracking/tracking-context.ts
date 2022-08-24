import { createContext } from 'react';
import { TrackingEvent } from './tracking-event';

export type TrackingEventData = Record<Exclude<string, 'event'>, unknown>;

export type TrackingContextValue = {
  sendEvent(name: TrackingEvent, data?: TrackingEventData): void;
};

export const TrackingContext = createContext<TrackingContextValue>({
  sendEvent: () => null,
});
