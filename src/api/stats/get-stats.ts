import { getLocalStorageValue } from './local-storage';
import { setStats } from './set-stats';
import { Stats } from './types';

const defaultValue: Stats = {
  totalGames: 0,
  wins: {
    total: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
  },
  losses: {
    total: 0,
    currentStreak: 0,
    maxStreak: 0,
  },
};

export const getStats = async (): Promise<Stats> => {
  try {
    const currentStatsData = await getLocalStorageValue();

    if (!currentStatsData) {
      await setStats(defaultValue);
      return defaultValue;
    }

    return currentStatsData;
  } catch (err) {
    console.error(`Error loading current stats`, err);
    await setStats(defaultValue);
    return defaultValue;
  }
};
