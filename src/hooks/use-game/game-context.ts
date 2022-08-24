import React from 'react';
import { CharStates, GameStatus, SubmittedWord, Word } from './types';
import { WordInput } from './use-word-input';

export type GameContextData = {
  state: GameStatus;
  word?: Word;
  wordLength: number;
  totalTries: number;
  triesLeft: number;
  submittedWords: SubmittedWord[];
  charStates: CharStates;
  input: WordInput;
  reset: () => void;
};

export const GameContext = React.createContext<GameContextData>({
  state: GameStatus.Playing,
  wordLength: 0,
  totalTries: 0,
  triesLeft: 0,
  submittedWords: [],
  charStates: {},
  input: {
    values: [],
    currentIndex: 0,
    isFocused: false,
    invalidIndexes: [],
    type: () => null,
    erase: () => null,
    submit: () => null,
    focusIndex: () => null,
    focusEmptyIndex: () => null,
    focusNextIndex: () => null,
    focusPreviousIndex: () => null,
  },
  reset: () => null,
});
