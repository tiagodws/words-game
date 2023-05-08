import { setLocalStorageValue } from './local-storage';
import { Stats } from './types';

export const setStats = async (stats: Stats): Promise<void> => {
  try {
    await setLocalStorageValue(stats);
  } catch (err) {
    console.error(`Error setting current stats`, err);
  }
};
