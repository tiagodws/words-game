import { Box } from '@mui/material';
import { FC } from 'react';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { useGameInput, useGameInputActions } from '../../hooks/game/game-input';
import { useSquareCellBoard } from '../../hooks/use-square-cell-board';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { CellState } from '../char-cell';
import { BoardCell } from './board-cell';

const BOARD_MAX_HEIGHT_PX = 520;

export const WordBoard: FC = () => {
  const { data: game } = useCurrentGame();
  const input = useGameInput();
  const inputActions = useGameInputActions();
  const rows = game.config.totalTries;
  const cols = game.config.wordLength;
  const rowsArray = getArrayOfSize(rows);
  const colsArray = getArrayOfSize(cols);

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
      {rowsArray.map((_, i) => {
        const submittedLength = game.submittedWords.length;
        const isSubmittedRow = i < submittedLength;
        const isInputRow = i === submittedLength;

        return colsArray.map((_, j) => {
          const isFocused =
            isInputRow && input.isFocused && input.currentIndex === j;
          const onClick = () => isInputRow && inputActions.focusIndex(j);
          let state: CellState = 'disabled';
          let value: string | undefined;

          if (isSubmittedRow) {
            const char = game.submittedWords[i].chars[j];
            state = char.state;
            value = char.displayValue;
          }

          if (isInputRow) {
            const isInvalid = input.invalidIndexes.includes(j);
            state = isInvalid ? 'invalid' : 'default';
            value = input.values[j];
          }

          return (
            <BoardCell
              key={j}
              isFocused={isFocused}
              value={value}
              state={state}
              onClick={onClick}
              fontSize={fontSize}
              cellSize={cellSize}
              animationDelayMultiplier={isSubmittedRow ? j : 0}
            />
          );
        });
      })}
    </Box>
  );
};
