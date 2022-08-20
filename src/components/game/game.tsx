import { Grid } from '@mui/material';
import { FC } from 'react';
import { GameProvider } from '../../hooks/game';
import { Container } from '../container';
import { Keyboard } from '../keyboard';
import { WordBoard } from './word-board';

export const Game: FC = () => {
  return (
    <GameProvider wordLength={5} tries={6}>
      <Grid container spacing={2} sx={{ height: '100%', py: 2 }}>
        <Grid item xs={12} height="60%">
          <Container sx={{ height: '100%' }}>
            <WordBoard />
          </Container>
        </Grid>

        <Grid item xs={12} height="40%">
          <Container sx={{ height: '100%' }}>
            <Keyboard />
          </Container>
        </Grid>
      </Grid>
    </GameProvider>
  );
};
