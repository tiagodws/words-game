import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { GameState } from '../../api/game';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { Game } from '../../hooks/game/game';
import { Container } from '../container';
import { Keyboard } from '../keyboard';
import { ResultDialog } from '../result-dialog';
import { WordBoard } from './word-board';

export const GameContainer: FC = () => {
  const { data: game } = useCurrentGame();
  const [isShowingResults, setIsShowingResults] = useState(false);

  useEffect(() => {
    setIsShowingResults(game.state !== GameState.Playing);
  }, [game.state]);

  return (
    <Game>
      <ResultDialog isOpen={isShowingResults} />
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
