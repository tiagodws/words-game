import { GameConfig } from './game-provider';
import { getCharStates } from './get-char-state';
import {
  CharState,
  CharStates,
  GameStatus,
  SubmittedWord,
  Word,
} from './types';

export type GameState = {
  status: GameStatus;
  triesLeft: number;
  submittedWords: SubmittedWord[];
  charStates: CharStates;
};

type GameStateRaw = Omit<GameState, 'triesLeft' | 'status'>;

export const getGameState = (
  config: GameConfig,
  word?: Word,
  state?: GameStateRaw
): GameState => {
  const { totalTries } = config;
  const { submittedWords = [], charStates: prevCharStates = {} } = state || {};

  const triesLeft = totalTries - submittedWords.length;

  if (!word) {
    return {
      submittedWords: [],
      charStates: {},
      triesLeft,
      status: GameStatus.Loading,
    };
  }

  if (!submittedWords.length) {
    return {
      submittedWords: [],
      charStates: {},
      triesLeft,
      status: GameStatus.Playing,
    };
  }

  const lastWord = submittedWords[submittedWords.length - 1];
  const charStates = getCharStates(lastWord, prevCharStates);
  const newState = { word, charStates, submittedWords, triesLeft };

  if (lastWord.every((char) => char.state === CharState.Correct)) {
    return {
      ...newState,
      status: GameStatus.Won,
    };
  } else if (submittedWords.length >= totalTries) {
    return {
      ...newState,
      status: GameStatus.Lost,
    };
  }

  return { ...newState, status: GameStatus.Playing };
};
