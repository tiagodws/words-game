import HelpIcon from '@mui/icons-material/Help';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Box, Grid, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMeasure } from 'react-use';
import { Container } from '../container';
import { InfoDialog } from '../info-dialog';
import { DynamicLogo } from './dynamic-logo';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation(['header', 'common']);
  const [container, { height }] = useMeasure();
  const [isShowingInfo, setIsShowingInfo] = useState(false);

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
                <InfoDialog
                  isOpen={isShowingInfo}
                  onClose={() => setIsShowingInfo(false)}
                />
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => setIsShowingInfo(true)}
                >
                  <HelpIcon sx={{ fontSize: height * 0.4 }} />
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
