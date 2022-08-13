import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../container';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation(['header', 'common']);

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        px: 4,
        width: '100%',
        borderBottom: '1px solid',
        borderBottomColor: '#ddd',
      }}
    >
      <Container>
        <Grid
          container
          alignItems="center"
          flexWrap={'nowrap'}
          spacing={4}
          p={2}
        >
          <Grid item>Left</Grid>

          <Grid
            item
            sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
          >
            <Typography variant="h2">{t('common:title')}</Typography>
          </Grid>

          <Grid item>Right</Grid>
        </Grid>
      </Container>
    </Box>
  );
};
