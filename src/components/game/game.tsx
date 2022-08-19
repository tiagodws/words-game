import { Grid } from '@mui/material';
import { FC } from 'react';
import { GameProvider } from '../../hooks/game';
import { Container } from '../container';
import { Keyboard } from '../keyboard';
import { WordBoard } from './word-board';

export const Game: FC = () => {
  return (
    <GameProvider wordLength={5} tries={6}>
      <Grid
        container
        direction="column"
        sx={{ height: '100%', flexWrap: 'nowrap', py: 2, gap: 4 }}
      >
        <Grid item sx={{ flex: 1 }}>
          <Container sx={{ height: '100%' }}>
            <Grid container spacing={4} sx={{ height: '100%' }}>
              <Grid item xs={12}>
                <WordBoard />
              </Grid>

              {/* Add more boards */}
            </Grid>
          </Container>
        </Grid>

        <Grid item sx={{ flex: 0 }}>
          <Container>
            <Keyboard />
          </Container>
        </Grid>
      </Grid>
    </GameProvider>
  );
};
