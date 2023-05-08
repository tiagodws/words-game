import { STATS_STORAGE_KEY } from './consts';
import { Stats } from './types';

export const getLocalStorageValue = async (): Promise<Stats> => {
  const currentStatsData = localStorage.getItem(STATS_STORAGE_KEY);
  return JSON.parse(currentStatsData ?? 'null');
};

export const setLocalStorageValue = async (value: Stats): Promise<void> => {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(value));
};
