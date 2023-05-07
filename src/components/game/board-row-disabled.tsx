import { FC } from 'react';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { BoardCell } from './board-cell';

type BoardRowDisabledProps = {
  fontSize: number;
  cellSize: number;
};

export const BoardRowDisabled: FC<BoardRowDisabledProps> = (props) => {
  const { fontSize, cellSize } = props;
  const { data: game } = useCurrentGame();
  const { config } = game;
  const wordLengthArray = getArrayOfSize(config.wordLength);

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
