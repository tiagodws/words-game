import { getValidWord } from '../words';
import { TOTAL_TRIES, WORD_LENGTH } from './consts';
import { Game, GameState } from './types';
import { stringToWord } from './word-utils';

export const createGame = async (): Promise<Game> => {
  const wordString = await getValidWord({ wordLength: WORD_LENGTH });
  const word = stringToWord(wordString);
  const game: Game = {
    word,
    submittedWords: [],
    state: GameState.Playing,
    charStates: {},
    config: { totalTries: TOTAL_TRIES, wordLength: WORD_LENGTH },
  };

  return game;
};
