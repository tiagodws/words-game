import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { CharCell } from '../char-cell';
import { Text } from '../text';

type DistributionBarProps = {
  value: string;
  total: number;
  occurrences: number;
};

export const DistributionBar: FC<DistributionBarProps> = (props) => {
  const { value, total, occurrences } = props;
  const percentage = (occurrences / total) * 100;

  return (
    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
      <Grid item xs={1}>
        <CharCell width={28} value={value} />
      </Grid>
      <Grid item xs={11}>
        <Box
          sx={{
            backgroundColor: 'primary.light',
            width: `${percentage}%`,
            minWidth: (theme) => theme.spacing(4),
            px: 1.5,
            py: 0.5,
            borderRadius: 0.5,
          }}
        >
          <Text variant="body2" textAlign={'right'}>
            {occurrences}
          </Text>
        </Box>
      </Grid>
    </Grid>
  );
};
