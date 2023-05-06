import { CURRENT_GAME_STORAGE_KEY } from './consts';
import { Game } from './types';

export const getCurrentGame = async (): Promise<Game | null> => {
  try {
    const currentGameData = localStorage.getItem(CURRENT_GAME_STORAGE_KEY);

    if (!currentGameData) {
      return null;
    }

    return JSON.parse(currentGameData);
  } catch (err) {
    console.error(`Error loading current game`, err);
    return null;
  }
};
