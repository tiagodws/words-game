import { FC } from 'react';
import { useGameConfig } from '../../hooks/game/game-config';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { BoardCell } from './board-cell';

type BoardRowDisabledProps = {
  fontSize: number;
  cellSize: number;
};

export const BoardRowDisabled: FC<BoardRowDisabledProps> = (props) => {
  const { fontSize, cellSize } = props;
  const { wordLength } = useGameConfig();
  const wordLengthArray = getArrayOfSize(wordLength);

  return (
    <>
      {wordLengthArray.map((_, j) => (
        <BoardCell
          key={j}
          state="disabled"
          cellSize={cellSize}
          fontSize={fontSize}
        />
      ))}
    </>
  );
};
