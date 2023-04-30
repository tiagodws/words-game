import { FC } from 'react';
import { SubmittedWord } from '../../hooks/game';
import { BoardCell } from './board-cell';

type BoardRowSubmittedProps = {
  submittedWord: SubmittedWord;
  fontSize: number;
  cellSize: number;
};

export const BoardRowSubmitted: FC<BoardRowSubmittedProps> = (props) => {
  const { submittedWord, fontSize, cellSize } = props;

  return (
    <>
      {submittedWord.map((char, j) => (
        <BoardCell key={j} {...char} fontSize={fontSize} cellSize={cellSize} />
      ))}
    </>
  );
};