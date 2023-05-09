import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { animated, easings, useSpring } from 'react-spring';
import { CharCell } from '../char-cell';
import { Text } from '../text';

type DistributionBarProps = {
  value: string;
  total: number;
  occurrences: number;
};

export const DistributionBar: FC<DistributionBarProps> = (props) => {
  const { value, total, occurrences } = props;
  const percentage = total ? (occurrences / total) * 100 : 0;
  const springProps = useSpring({
    from: { width: '0' },
    to: { width: `${percentage}%` },
    config: { duration: 800, easing: easings.easeInOutExpo },
  });

  return (
    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
      <Grid item sx={{ flex: 0 }}>
        <CharCell width={28} value={value} />
      </Grid>
      <Grid item sx={{ flex: 1, display: 'flex' }}>
        <animated.div style={springProps}>
          <Box
            sx={{
              width: '100%',
              backgroundColor: 'primary.light',
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
        </animated.div>
      </Grid>
    </Grid>
  );
};
