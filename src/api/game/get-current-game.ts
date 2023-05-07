import { createGame } from './create-game';
import { getLocalStorageValue } from './local-storage';
import { Game } from './types';

export const getCurrentGame = async (): Promise<Game> => {
  try {
    const currentGameData = await getLocalStorageValue();

    if (!currentGameData) {
      return createGame();
    }

    return currentGameData;
  } catch (err) {
    console.error(`Error loading current game`, err);
    return createGame();
  }
};
