import { Char } from './char';

export enum GameStatus {
  Playing = 'playing',
  Won = 'won',
  Lost = 'lost',
}

export enum CharState {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Hint = 'hint',
}

export type CharStates = Partial<Record<Char, CharState>>;
export type InputValue = Char | undefined;
export type Word = Char[];
export type SubmittedWord = {
  char: Char;
  state: CharState;
}[];
