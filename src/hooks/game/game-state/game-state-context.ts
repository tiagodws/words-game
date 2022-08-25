import React from 'react';
import { CharStates, GameStatus, SubmittedWord, Word } from '../../use-game';

export type GameStateContextData = {
  word?: Word;
  status: GameStatus;
  triesLeft: number;
  submittedWords: SubmittedWord[];
  charStates: CharStates;
};

export const GameStateContext = React.createContext<GameStateContextData>({
  status: GameStatus.Loading,
  triesLeft: 0,
  submittedWords: [],
  charStates: {},
});

export type GameStateActionsContextData = {
  submitWord(word: Word): void;
  restart(): void;
};

export const GameStateActionsContext =
  React.createContext<GameStateActionsContextData>({
    submitWord: () => null,
    restart: () => null,
  });
