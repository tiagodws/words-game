import { Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStats } from '../../hooks/game/api/use-stats';
import { Text } from '../text';
import { DistributionBar } from './distribution-bar';

type GuessDistributionProps = {
  highlightValue?: string;
};

export const GuessDistribution: FC<GuessDistributionProps> = (props) => {
  const { highlightValue } = props;
  const { t } = useTranslation('stats');
  const { data: stats } = useStats();
  const winDistArray = Object.entries(stats.wins.distribution);
  const winOccurrences = Object.values(stats.wins.distribution);
  const maxOccurrences = [...winOccurrences, stats.losses.total].sort(
    (a, b) => b - a
  )[0];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Text textAlign={'center'} variant="body2">
          {t('guessDistributionTitle')}
        </Text>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {winDistArray.map(([value, occurrences]) => (
            <Grid item xs={12} key={value}>
              <DistributionBar
                value={value}
                occurrences={occurrences}
                total={maxOccurrences}
                highlight={value === highlightValue}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <DistributionBar
              value={'X'}
              occurrences={stats.losses.total}
              total={maxOccurrences}
              highlight={'X' === highlightValue}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
