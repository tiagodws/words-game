import { CURRENT_GAME_STORAGE_KEY } from './consts';
import { Game } from './types';

export const getLocalStorageValue = async (): Promise<Game> => {
  const currentGameData = localStorage.getItem(CURRENT_GAME_STORAGE_KEY);
  return JSON.parse(currentGameData ?? 'null');
};

export const setLocalStorageValue = async (value: Game): Promise<void> => {
  localStorage.setItem(CURRENT_GAME_STORAGE_KEY, JSON.stringify(value));
};
