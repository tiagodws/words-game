import React from 'react';
import { Char } from './char';
import { CharStates, SubmittedWord } from './game-provider';

export type GameContextData = {
  wordLength: number;
  triesLeft: number;
  currentWord: Char[];
  submittedWords: SubmittedWord[];
  invalidPos: number[];
  inputArray: (Char | undefined)[];
  currentPos: number;
  charStates: CharStates;
  focusPos(pos: number): void;
  focusNextEmptyPos(): void;
  focusNextPos(loop?: boolean): void;
  focusPreviousPos(loop?: boolean): void;
  fill(value: string): void;
  erase(): void;
  submitWord(): void;
};

export const GameContext = React.createContext<GameContextData>({
  wordLength: 0,
  triesLeft: 0,
  currentWord: [],
  submittedWords: [],
  invalidPos: [],
  inputArray: [],
  currentPos: 0,
  charStates: {},
  focusPos: () => {},
  focusNextEmptyPos: () => {},
  focusNextPos: () => {},
  focusPreviousPos: () => {},
  fill: () => {},
  erase: () => {},
  submitWord: () => {},
});
