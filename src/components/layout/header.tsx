import InfoIcon from '@mui/icons-material/Info';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useElementSize } from 'usehooks-ts';
import { Container } from '../container';
import { DynamicLogo } from './dynamic-logo';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation(['header', 'common']);
  const [container, { height }] = useElementSize();
  const titleArray = t('common:title').split('');

  return (
    <Box
      ref={container}
      sx={{
        px: 1,
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
            gap: 1,
          }}
        >
          <Grid item sx={{ flex: 1 }}>
            <Grid container spacing={1} sx={{ flexWrap: 'nowrap' }}>
              <Grid item>
                <IconButton color="secondary" size="small">
                  <MenuIcon sx={{ fontSize: height * 0.4 }} />
                </IconButton>
              </Grid>

              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <IconButton color="secondary" size="small">
                  <InfoIcon sx={{ fontSize: height * 0.4 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              flex: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <DynamicLogo containerHeight={height} word={t('common:title')} />
          </Grid>

          <Grid item sx={{ flex: 1 }}>
            <Grid
              container
              sx={{ justifyContent: 'flex-end', flexWrap: 'nowrap' }}
              spacing={1}
            >
              <Grid item>
                <IconButton color="secondary" size="small">
                  <LeaderboardIcon sx={{ fontSize: height * 0.4 }} />
                </IconButton>
              </Grid>

              <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <IconButton color="secondary" size="small">
                  <SettingsIcon sx={{ fontSize: height * 0.4 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
