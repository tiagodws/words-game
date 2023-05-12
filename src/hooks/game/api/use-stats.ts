import { useQuery } from '@tanstack/react-query';
import { getStats } from '../../../api/stats/get-stats';
import { Stats } from '../../../api/stats/types';

const initialData: Stats = {
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

export const useStats = () => {
  return useQuery(['stats'], getStats, {
    initialData,
    networkMode: 'always',
  });
};
