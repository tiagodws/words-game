import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../dialog';
import { Text } from '../text';

type StatsDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

export const StatsDialog: FC<StatsDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation('stats');

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={t('statsTitle')}>
      <Grid container>
        <Grid item xs={12}>
          <Text fontSize={64} color="secondary" textAlign="center">
            <BuildCircleIcon fontSize="inherit" />
          </Text>
        </Grid>

        <Grid item xs={12}>
          <Text color="secondary" textAlign="center">
            Under construction
          </Text>
        </Grid>
      </Grid>
    </Dialog>
  );
};
