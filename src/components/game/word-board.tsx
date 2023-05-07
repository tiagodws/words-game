import { Box } from '@mui/material';
import { FC } from 'react';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { useSquareCellBoard } from '../../hooks/use-square-cell-board';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { BoardRowDisabled } from './board-row-disabled';
import { BoardRowInput } from './board-row-input';
import { BoardRowSubmitted } from './board-row-submitted';

const BOARD_MAX_HEIGHT_PX = 520;

export const WordBoard: FC = () => {
  const { data: game } = useCurrentGame();
  const rows = game.config.totalTries;
  const cols = game.config.wordLength;
  const triesLeft = game.config.totalTries - game.submittedWords.length;
  const triesArray = triesLeft > 1 ? getArrayOfSize(triesLeft - 1) : [];

  const [boardContainer, { cellSize, fontSize }] = useSquareCellBoard({
    rows,
    cols,
  });

  return (
    <Box
      ref={boardContainer}
      sx={{
        display: 'grid',
        height: '100%',
        width: '100%',
        maxHeight: BOARD_MAX_HEIGHT_PX,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {game.submittedWords.map((submittedWord, i) => (
        <BoardRowSubmitted
          key={i}
          submittedWord={submittedWord}
          fontSize={fontSize}
          cellSize={cellSize}
        />
      ))}

      {!!triesLeft && <BoardRowInput fontSize={fontSize} cellSize={cellSize} />}

      {triesArray.map((_, i) => (
        <BoardRowDisabled key={i} fontSize={fontSize} cellSize={cellSize} />
      ))}
    </Box>
  );
};
