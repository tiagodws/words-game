import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { v4 } from 'uuid';
import { useGameConfig } from '../game-config';
import { CharState, GameStatus, SubmittedWord, Word } from '../types';
import {
  GameStateActionsContext,
  GameStateContext,
  GameStateContextData,
} from './game-state-context';
import { getCharState, getCharStates } from './get-char-state';
import { getWord } from './use-word';

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

const startState: GameStateContextData = {
  status: GameStatus.Loading,
  submittedWords: [],
  charStates: {},
  triesLeft: 0,
};

export const GameStateProvider: FC<GameStateProviderProps> = (props) => {
  const { children } = props;
  const config = useGameConfig();
  const [state, setState] = useState<GameStateContextData>(startState);
  const [savedState, saveState] = useLocalStorage<GameStateContextData | null>(
    'gameState',
    null
  );
  const [isRestored, setIsRestored] = useState(false);

  const submitWord = useCallback(
    (newWord: Word) => {
      const word = state.word;

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
          ...prev,
          word,
          charStates,
          submittedWords,
          triesLeft,
          status: getStatus(submittedWords, config.totalTries),
        };
      });
    },
    [state.word, config.totalTries]
  );

  const restart = useCallback(() => {
    setState(startState);
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state, saveState]);

  useEffect(() => {
    if (isRestored && !state.word) {
      const loadWord = async () => {
        const word = await getWord(config.wordLength);
        setState({
          id: v4(),
          word,
          status: GameStatus.Playing,
          submittedWords: [],
          charStates: {},
          triesLeft: config.totalTries,
        });
      };

      loadWord();
      return;
    }

    if (isRestored) {
      return;
    }

    if (savedState) {
      setState(savedState);
    }

    setIsRestored(true);
  }, [isRestored, state, savedState, config, saveState]);

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
