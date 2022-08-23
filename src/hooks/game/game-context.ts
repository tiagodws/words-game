import React from 'react';
import { CharStates, GameState, SubmittedWord, Word } from './types';
import { WordInput } from './use-word-input';

export type GameContextData = {
  state: GameState;
  word?: Word;
  wordLength: number;
  tries: number;
  triesLeft: number;
  submittedWords: SubmittedWord[];
  charStates: CharStates;
  input: WordInput;
  reset: () => void;
};

export const GameContext = React.createContext<GameContextData>({
  state: GameState.Playing,
  wordLength: 0,
  tries: 0,
  triesLeft: 0,
  submittedWords: [],
  charStates: {},
  input: {
    values: [],
    currentIndex: 0,
    invalidIndexes: [],
    type: () => {},
    erase: () => {},
    submit: () => [],
    focusIndex: () => {},
    focusEmptyIndex: () => {},
    focusNextIndex: () => {},
    focusPreviousIndex: () => {},
  },
  reset: () => {},
});
