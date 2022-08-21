import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useElementSize } from 'usehooks-ts';
import { Container } from '../container';
import { Text } from '../text';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation(['header', 'common']);
  const [container, { height }] = useElementSize();

  return (
    <Box
      ref={container}
      sx={{
        px: 4,
        bgcolor: 'background.default',
        width: '100%',
        height: '10vh',
        maxHeight: 64,
        overflow: 'hidden',
      }}
    >
      <Container sx={{ height: '100%' }}>
        <Grid
          ref={container}
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexWrap: 'nowrap',
            gap: 4,
          }}
        >
          <Grid item xs={2}>
            <Text fontSize={height * 0.3}>Left</Text>
          </Grid>

          <Grid
            item
            xs={8}
            sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
          >
            <Text variant="h1" fontSize={height * 0.6}>
              {t('common:title')}
            </Text>
          </Grid>

          <Grid item xs={2}>
            <Text fontSize={height * 0.3}>Right</Text>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
