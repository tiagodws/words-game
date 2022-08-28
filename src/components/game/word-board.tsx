import { Box } from '@mui/material';
import { FC } from 'react';
import { useGameConfig } from '../../hooks/game/game-config';
import { useGameState } from '../../hooks/game/game-state';
import { useSquareCellBoard } from '../../hooks/use-square-cell-board';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { BoardRowDisabled } from './board-row-disabled';
import { BoardRowInput } from './board-row-input';
import { BoardRowSubmitted } from './board-row-submitted';

const BOARD_MAX_HEIGHT_PX = 520;

export const WordBoard: FC = () => {
  const config = useGameConfig();
  const state = useGameState();
  const rows = config.totalTries;
  const cols = config.wordLength;
  const triesArray =
    state.triesLeft > 1 ? getArrayOfSize(state.triesLeft - 1) : [];

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
      {state.submittedWords.map((submittedWord, i) => (
        <BoardRowSubmitted
          key={i}
          submittedWord={submittedWord}
          fontSize={fontSize}
          cellSize={cellSize}
        />
      ))}

      {!!state.triesLeft && (
        <BoardRowInput fontSize={fontSize} cellSize={cellSize} />
      )}

      {triesArray.map((_, i) => (
        <BoardRowDisabled key={i} fontSize={fontSize} cellSize={cellSize} />
      ))}
    </Box>
  );
};
