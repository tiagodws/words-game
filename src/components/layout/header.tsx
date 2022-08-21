import InfoIcon from '@mui/icons-material/Info';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useElementSize } from 'usehooks-ts';
import { Char, CharCell } from '../char-cell';
import { Container } from '../container';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation(['header', 'common']);
  const [container, { height }] = useElementSize();
  const titleArray = t('common:title').split('');

  return (
    <Box
      ref={container}
      sx={{
        px: 4,
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
            <Grid container spacing={1} sx={{ flexWrap: 'nowrap' }}>
              <Grid item>
                <IconButton color="secondary">
                  <InfoIcon sx={{ fontSize: height * 0.4 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={8}
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {titleArray.map((char, i) => (
              <Box
                key={i}
                sx={{ m: '1px', height: height * 0.6, width: height * 0.6 }}
              >
                <CharCell
                  state={'disabled'}
                  char={char as Char}
                  fontSize={height * 0.3}
                />
              </Box>
            ))}
          </Grid>

          <Grid item xs={2}>
            <Grid
              container
              sx={{ justifyContent: 'flex-end', flexWrap: 'nowrap' }}
              spacing={1}
            >
              <Grid item>
                <IconButton color="secondary">
                  <LeaderboardIcon sx={{ fontSize: height * 0.4 }} />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton color="secondary">
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
