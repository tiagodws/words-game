import { FC } from 'react';
import { useGameInput, useGameInputActions } from '../../hooks/game/game-input';
import { BoardCell } from './board-cell';

type BoardRowInputProps = {
  fontSize: number;
  cellSize: number;
};

export const BoardRowInput: FC<BoardRowInputProps> = (props) => {
  const { fontSize, cellSize } = props;
  const input = useGameInput();
  const inputActions = useGameInputActions();

  return (
    <>
      {input.values.map((char, j) => (
        <BoardCell
          key={j}
          value={char}
          onClick={() => inputActions.focusIndex(j)}
          isFocused={input.isFocused && input.currentIndex === j}
          state={input.emptyIndexes.includes(j) ? 'invalid' : 'default'}
          fontSize={fontSize}
          cellSize={cellSize}
        />
      ))}
    </>
  );
};
