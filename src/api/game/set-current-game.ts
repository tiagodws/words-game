import { setLocalStorageValue } from './local-storage';
import { Game } from './types';

export const setCurrentGame = async (game: Game): Promise<void> => {
  try {
    await setLocalStorageValue(game);
  } catch (err) {
    console.error(`Error setting current game`, err);
  }
};
