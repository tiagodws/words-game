import { Box } from '@mui/material';
import { FC } from 'react';
import { GameProvider } from '../../hooks/game';
import { Container } from '../container';
import { Keyboard } from '../keyboard';
import { ResultModal } from './result-modal';
import { WordBoard } from './word-board';

export const Game: FC = () => {
  return (
    <GameProvider wordLength={5} tries={6}>
      <ResultModal />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Container
          sx={{
            flex: 5,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            py: '2vh',
          }}
        >
          <WordBoard />
        </Container>

        <Container
          sx={{
            flex: 2,
            minHeight: 0,
            display: 'flex',
            alignItems: 'flex-end',
            py: '2vh',
          }}
        >
          <Keyboard />
        </Container>
      </Box>
    </GameProvider>
  );
};
