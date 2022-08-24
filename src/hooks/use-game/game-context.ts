import React from 'react';
import { GameConfig } from './game-provider';
import { GameStatus } from './types';
import { GameState } from './use-game-state';
import { WordInput } from './use-word-input';

export type GameContextData = {
  config: GameConfig;
  state: GameState;
  input: WordInput;
  newGame: () => void;
};

export const GameContext = React.createContext<GameContextData>({
  config: {
    wordLength: 0,
    totalTries: 0,
  },
  state: {
    status: GameStatus.Playing,
    triesLeft: 0,
    submittedWords: [],
    charStates: {},
  },
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
  newGame: () => null,
});
