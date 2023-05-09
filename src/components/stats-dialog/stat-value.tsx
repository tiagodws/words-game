import { Grid } from '@mui/material';
import { FC } from 'react';
import { Text } from '../text';

type StatValueProps = {
  label: string;
  value: string | number;
};

export const StatValue: FC<StatValueProps> = (props) => {
  const { label, value } = props;

  return (
    <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12}>
        <Text variant="h3" textAlign={'center'}>
          {value}
        </Text>
      </Grid>

      <Grid item xs={12}>
        <Text variant="body2" textAlign={'center'}>
          {label}
        </Text>
      </Grid>
    </Grid>
  );
};
