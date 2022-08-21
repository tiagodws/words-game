import { Box } from '@mui/material';
import { FC, Fragment } from 'react';
import { useElementSize } from 'usehooks-ts';
import { useGame } from '../../hooks/game';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { CharCell, CharCellProps } from '../char-cell';

const Char: FC<CharCellProps> = (props) => (
  <Box sx={{ m: '2px' }}>
    <CharCell {...props} />
  </Box>
);

export const WordBoard: FC = () => {
  const {
    wordLength,
    tries,
    triesLeft,
    submittedWords,
    inputArray,
    currentPos,
    invalidPos,
    focusPos,
  } = useGame();

  const rows = tries;
  const cols = wordLength;

  const wordLengthArray = getArrayOfSize(wordLength);
  const triesArray = getArrayOfSize(triesLeft);

  const [boardContainer, { width: boardWidth, height: boardHeight }] =
    useElementSize();

  const boardBiggerDim = Math.max(cols, rows);
  const boardItemSize =
    boardHeight > boardWidth
      ? boardWidth / boardBiggerDim
      : boardHeight / boardBiggerDim;
  const fontSize = Math.min(boardItemSize * 0.6, 24);

  return (
    <Box
      ref={boardContainer}
      sx={{
        display: 'grid',
        height: '100%',
        width: '100%',
        maxHeight: 520,
        gridTemplateRows: `repeat(${rows}, ${boardItemSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${boardItemSize}px)`,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {submittedWords.map((submittedWord, i) => (
        <Fragment key={i}>
          {submittedWord.map((char, j) => (
            <Char key={`${i},${j}`} {...char} fontSize={fontSize} />
          ))}
        </Fragment>
      ))}

      {triesArray.map((_, i) =>
        i
          ? wordLengthArray.map((_, j) => <Char key={j} state="disabled" />)
          : inputArray.map((char, j) => (
              <Char
                key={j}
                char={char}
                onClick={() => focusPos(j)}
                isFocused={currentPos === j}
                state={invalidPos.includes(j) ? 'invalid' : 'default'}
                fontSize={fontSize}
              />
            ))
      )}
    </Box>
  );
};
