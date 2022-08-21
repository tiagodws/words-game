import React from 'react';
import { CharStates, SubmittedWord, Word } from './types';
import { WordInput } from './use-word-input';

export type GameContextData = {
  word: Word;
  wordLength: number;
  tries: number;
  triesLeft: number;
  submittedWords: SubmittedWord[];
  charStates: CharStates;
  input: WordInput;
};

export const GameContext = React.createContext<GameContextData>({
  word: [],
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
});
