import { FC, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { TrackingEvent, useTracking } from '../use-tracking';
import { useGameConfig } from './game-config';
import { useGameInput } from './game-input';
import { useGameState } from './game-state';
import { GameStatus } from './types';

type TrackingData = {
  gameId?: string;
  lastSubmittedWord?: string;
};

export const GameTracking: FC = () => {
  const { sendEvent } = useTracking();
  const config = useGameConfig();
  const state = useGameState();
  const input = useGameInput();
  const [trackingData, setTrackingData] = useLocalStorage<TrackingData>(
    'events',
    {}
  );

  useEffect(() => {
    if (!state.word) {
      return;
    }

    const word = state.word?.join('');
    const id = state.id;
    const status = state.status;
    const submittedWords = state.submittedWords;
    const lastSubmitted = submittedWords[submittedWords.length - 1];
    const lastSubmittedString = lastSubmitted?.map(({ char }) => char).join('');
    const isRestoredGame = id === trackingData?.gameId;
    const alreadySubmittedWord =
      isRestoredGame && trackingData?.lastSubmittedWord === lastSubmittedString;

    if (status === GameStatus.Playing && !submittedWords.length) {
      sendEvent(TrackingEvent.GameStarted, { word });
      return;
    }

    if (status === GameStatus.Won) {
      sendEvent(TrackingEvent.GameWon, { word });
      return;
    }

    if (status === GameStatus.Lost) {
      sendEvent(TrackingEvent.GameLost, { word });
      return;
    }

    if (
      status === GameStatus.Playing &&
      lastSubmitted &&
      !alreadySubmittedWord
    ) {
      sendEvent(TrackingEvent.GameWordSubmitted, { word: lastSubmittedString });
      setTrackingData({ gameId: id, lastSubmittedWord: lastSubmittedString });
      return;
    }
  }, [
    state.id,
    state.word,
    state.submittedWords,
    state.status,
    trackingData?.gameId,
    trackingData?.lastSubmittedWord,
    sendEvent,
    setTrackingData,
  ]);

  useEffect(() => {
    const submittedValues = input.submittedValues?.filter((v) => !!v);
    const invalidIndexes = input.invalidIndexes;
    const isComplete = submittedValues?.length === config.wordLength;
    const isInvalid = !!invalidIndexes.length;

    if (isComplete && isInvalid) {
      sendEvent(TrackingEvent.GameWordTried, {
        word: submittedValues.join(''),
      });
    }
  }, [
    input.submittedValues,
    input.invalidIndexes,
    config.wordLength,
    sendEvent,
  ]);

  return null;
};
