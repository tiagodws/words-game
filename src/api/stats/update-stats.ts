import { Game, GameState } from '../game';
import { getStats } from './get-stats';
import { setStats } from './set-stats';
import { Stats } from './types';

export const updateStats = async (game: Game): Promise<Stats> => {
  const stats = await getStats();

  if (![GameState.Won, GameState.Lost].includes(game.state)) {
    return stats;
  }

  const isWin = game.state === GameState.Won;
  const tries = game.submittedWords.length;

  const newStats = { ...stats };

  newStats.totalGames += 1;

  if (isWin) {
    newStats.wins.total += 1;
    newStats.wins.currentStreak += 1;
    newStats.wins.distribution[tries] =
      (newStats.wins.distribution[tries] ?? 0) + 1;
    newStats.losses.currentStreak = 0;
  } else {
    newStats.losses.total += 1;
    newStats.losses.currentStreak += 1;
    newStats.wins.currentStreak = 0;
  }

  if (newStats.wins.currentStreak > stats.wins.maxStreak) {
    newStats.wins.maxStreak = newStats.wins.currentStreak;
  }

  if (newStats.losses.currentStreak > stats.losses.maxStreak) {
    newStats.losses.maxStreak = newStats.losses.currentStreak;
  }

  await setStats(newStats);

  return newStats;
};
