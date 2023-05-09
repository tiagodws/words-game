import { Divider, Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStats } from '../../hooks/game/api/use-stats';
import { DistributionBar } from './distribution-bar';
import { StatValue } from './stat-value';

export const Stats: FC = () => {
  const { t } = useTranslation('stats');
  const { data: stats } = useStats();
  const winDistArray = Object.entries(stats.wins.distribution);
  const winOccurrences = Object.values(stats.wins.distribution);
  const maxOccurrences = [...winOccurrences, stats.losses.total].sort(
    (a, b) => b - a
  )[0];
  const winRate = stats.totalGames ? Math.round((stats.wins.total / stats.totalGames) * 100) : 0;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
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
            <StatValue
              label={t('bestStreakLabel')}
              value={stats.wins.maxStreak}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {winDistArray.map(([value, occurrences]) => (
            <Grid item xs={12} key={value}>
              <DistributionBar
                value={value}
                occurrences={occurrences}
                total={maxOccurrences}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <DistributionBar
              value={'X'}
              occurrences={stats.losses.total}
              total={maxOccurrences}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
