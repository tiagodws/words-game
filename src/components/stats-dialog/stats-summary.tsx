import { Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStats } from '../../hooks/game/api/use-stats';
import { StatValue } from './stat-value';

type StatsSummaryProps = {};

export const StatsSummary: FC<StatsSummaryProps> = (props) => {
  const { t } = useTranslation('stats');
  const { data: stats } = useStats();
  const winRate = stats.totalGames
    ? Math.round((stats.wins.total / stats.totalGames) * 100)
    : 0;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <StatValue label={t('totalGamesLabel')} value={stats.totalGames} />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StatValue
          label={t('winRateLabel')}
          value={t('winRateValue', { value: winRate })}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StatValue
          label={t('currentStreakLabel')}
          value={stats.wins.currentStreak}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StatValue label={t('bestStreakLabel')} value={stats.wins.maxStreak} />
      </Grid>
    </Grid>
  );
};
