import { Box } from '@mui/material';
import { FC } from 'react';
import { Game } from '../../hooks/game/game';
import { Container } from '../container';
import { Keyboard } from '../keyboard';
import { ResultModal } from '../result-modal/result-modal';
import { WordBoard } from './word-board';

export const GameContainer: FC = () => {
  return (
    <Game>
      <ResultModal />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <BoardsContainer />
        <KeyboardContainer />
      </Box>
    </Game>
  );
};

const BoardsContainer: FC = () => {
  return (
    <Container
      sx={{
        flex: 5,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        py: '8vh',
      }}
    >
      <WordBoard />
    </Container>
  );
};

const KeyboardContainer: FC = () => {
  return (
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
  );
};
