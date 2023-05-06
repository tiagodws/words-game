export type Game = {
  word: Word;
  config: GameConfig;
  submittedWords: SubmittedWord[];
  state: GameState;
  charStates: CharStates;
};

export type GameConfig = {
  wordLength: number;
  totalTries: number;
};

export enum GameState {
  Playing = 'playing',
  Won = 'won',
  Lost = 'lost',
}

export type CharStates = Partial<Record<CharValue, SubmittedCharState>>;

export type Word = {
  stringValue: string;
  chars: Char[];
};

export type SubmittedWord = Word & {
  chars: SubmittedChar[];
};

export type Char = {
  value: CharValue;
  displayValue: string;
};

export type SubmittedChar = Char & {
  state: SubmittedCharState;
};

export enum CharValue {
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

export enum SubmittedCharState {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Hint = 'hint',
}
