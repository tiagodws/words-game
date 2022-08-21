import { useElementSize } from 'usehooks-ts';

type UseSquareCellBoardProps = {
  rows: number;
  cols: number;
};

export const useSquareCellBoard = (props: UseSquareCellBoardProps) => {
  const { rows, cols } = props;
  const [boardContainer, { width: boardWidth, height: boardHeight }] =
    useElementSize();

  const biggerDim = Math.max(rows, cols);
  const itemSize =
    boardHeight > boardWidth ? boardWidth / biggerDim : boardHeight / biggerDim;
  const fontSize = Math.min(itemSize * 0.4, 28);

  return [boardContainer, { itemSize, fontSize }] as const;
};
