export enum Char {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export enum GameStatus {
  Loading = 'loading',
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
