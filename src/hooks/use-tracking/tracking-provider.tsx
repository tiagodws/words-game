import { FC, ReactNode, useCallback } from 'react';
import TagManager from 'react-gtm-module';
import { isDevEnv } from '../../utils/is-dev-env';
import { TrackingContext, TrackingEventData } from './tracking-context';
import { TrackingEvent } from './tracking-event';

type TrackingProviderProps = {
  children?: ReactNode;
};

export const TrackingProvider: FC<TrackingProviderProps> = ({ children }) => {
  const sendEvent = useCallback(
    (eventName: TrackingEvent, data?: TrackingEventData) => {
      if (isDevEnv()) {
        console.debug(`Sending event "${eventName}"`, data);
        return;
      }

      TagManager.dataLayer({
        dataLayer: {
          event: eventName,
          ...data,
        },
      });
    },
    []
  );

  return (
    <TrackingContext.Provider value={{ sendEvent }}>
      {children}
    </TrackingContext.Provider>
  );
};
