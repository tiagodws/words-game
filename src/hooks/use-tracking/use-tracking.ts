import { useContext } from 'react';
import { TrackingContext, TrackingContextValue } from './tracking-context';

export const useTracking = (): TrackingContextValue => {
  const context = useContext(TrackingContext);

  if (!context) {
    throw new Error('useTracking must be used within an TrackingProvider');
  }

  return context;
};
