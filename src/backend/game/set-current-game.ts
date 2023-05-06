import { CURRENT_GAME_STORAGE_KEY } from './consts';
import { Game } from './types';

export const setCurrentGame = async (game: Game): Promise<void> => {
  try {
    localStorage.setItem(CURRENT_GAME_STORAGE_KEY, JSON.stringify(game));
  } catch (err) {
    console.error(`Error setting current game`, err);
  }
};
