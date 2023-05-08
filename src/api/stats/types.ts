export type Stats = {
  totalGames: number;
  wins: {
    total: number;
    currentStreak: number;
    maxStreak: number;
    distribution: Record<number, number>;
  };
  losses: {
    total: number;
    currentStreak: number;
    maxStreak: number;
  };
};
