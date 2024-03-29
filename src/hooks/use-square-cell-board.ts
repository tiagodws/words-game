import { useMeasure } from 'react-use';

type UseSquareCellBoardProps = {
  rows: number;
  cols: number;
};

export const useSquareCellBoard = (props: UseSquareCellBoardProps) => {
  const { rows, cols } = props;
  const [boardContainer, { width: boardWidth, height: boardHeight }] =
    useMeasure();

  const biggerDim = Math.max(rows, cols);
  const cellSize =
    boardHeight > boardWidth ? boardWidth / biggerDim : boardHeight / biggerDim;
  const fontSize = Math.min(cellSize * 0.4, 28);

  return [boardContainer, { cellSize, fontSize }] as const;
};
