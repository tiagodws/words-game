import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TrackingEvent, useTracking } from '../../use-tracking';
import { useGameConfig } from '../game-config';
import { CharState, GameStatus, SubmittedWord, Word } from '../types';
import {
  GameStateActionsContext,
  GameStateContext,
  GameStateContextData,
} from './game-state-context';
import { getCharState, getCharStates } from './get-char-state';
import { useWord } from './use-word';

export type GameStateProviderProps = {
  children?: React.ReactNode;
};

const getStatus = (submittedWords: SubmittedWord[], totalTries: number) => {
  const lastWord = submittedWords[submittedWords.length - 1];

  if (lastWord.every((char) => char.state === CharState.Correct)) {
    return GameStatus.Won;
  } else if (submittedWords.length >= totalTries) {
    return GameStatus.Lost;
  }

  return GameStatus.Playing;
};

export const GameStateProvider: FC<GameStateProviderProps> = (props) => {
  const { children } = props;
  const config = useGameConfig();
  const { sendEvent } = useTracking();
  const { word, changeWord: restart } = useWord(config);
  const [state, setState] = useState<GameStateContextData>({
    status: GameStatus.Loading,
    submittedWords: [],
    charStates: {},
    triesLeft: 0,
  });

  const submitWord = useCallback(
    (newWord: Word) => {
      if (!word) {
        return;
      }

      const submittedWord = newWord.map((char, i) => ({
        char,
        state: getCharState(i, newWord, word),
      }));

      setState((prev) => {
        const submittedWords = [...prev.submittedWords, submittedWord];
        const triesLeft = config.totalTries - submittedWords.length;
        const charStates = getCharStates(submittedWord, prev.charStates);
        return {
          word,
          charStates,
          submittedWords,
          triesLeft,
          status: getStatus(submittedWords, config.totalTries),
        };
      });
    },
    [word, config.totalTries]
  );

  useEffect(() => {
    if (word) {
      setState({
        word,
        status: GameStatus.Playing,
        submittedWords: [],
        charStates: {},
        triesLeft: config.totalTries,
      });
    }
  }, [word, config.totalTries]);

  useEffect(() => {
    const word = state.word?.join('');
    const status = state.status;
    const submittedWords = state.submittedWords;
    const lastSubmitted = submittedWords[submittedWords.length - 1];
    const lastSubmittedString = lastSubmitted?.map(({ char }) => char).join('');

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

    if (status === GameStatus.Playing && lastSubmitted) {
      sendEvent(TrackingEvent.GameWordSubmitted, { word: lastSubmittedString });
      return;
    }
  }, [state.word, state.submittedWords, state.status, sendEvent]);

  const actions = useMemo(
    () => ({ submitWord, restart }),
    [submitWord, restart]
  );

  return (
    <GameStateContext.Provider value={state}>
      <GameStateActionsContext.Provider value={actions}>
        {children}
      </GameStateActionsContext.Provider>
    </GameStateContext.Provider>
  );
};
