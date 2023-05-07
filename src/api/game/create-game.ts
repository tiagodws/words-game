import { getValidWord } from '../words';
import { TOTAL_TRIES, WORD_LENGTH } from './consts';
import { getLocalStorageValue } from './local-storage';
import { setCurrentGame } from './set-current-game';
import { Game, GameState } from './types';
import { stringToWord } from './word-utils';

export const createGame = async (): Promise<Game> => {
  const currentGame = await getLocalStorageValue();

  if (currentGame?.state === GameState.Playing) {
    return currentGame;
  }

  const wordString = await getValidWord({ wordLength: WORD_LENGTH });
  const word = stringToWord(wordString);
  const game: Game = {
    word,
    submittedWords: [],
    state: GameState.Playing,
    charStates: {},
    config: { totalTries: TOTAL_TRIES, wordLength: WORD_LENGTH },
  };

  await setCurrentGame(game);

  return game;
};
