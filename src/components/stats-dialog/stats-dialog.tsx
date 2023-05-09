import { Divider, Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../dialog';
import { GuessDistribution } from './guess-distribution';
import { StatsSummary } from './stats-summary';

type StatsDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

export const StatsDialog: FC<StatsDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation('stats');

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={t('statsTitle')}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StatsSummary />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <GuessDistribution />
        </Grid>
      </Grid>
    </Dialog>
  );
};
