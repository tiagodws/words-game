import { Box } from '@mui/material';
import { FC, Fragment } from 'react';
import { useGame } from '../../hooks/game';
import { useSquareCellBoard } from '../../hooks/use-square-cell-board';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { CharCell, CharCellProps } from '../char-cell';

const Char: FC<CharCellProps> = (props) => (
  <Box sx={{ m: '4px' }}>
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

  const [boardContainer, { itemSize, fontSize }] = useSquareCellBoard({
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
        maxHeight: 520,
        gridTemplateRows: `repeat(${rows}, ${itemSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${itemSize}px)`,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {submittedWords.map((submittedWord, i) => (
        <Fragment key={i}>
          {submittedWord.map((char, j) => (
            <Char key={j} {...char} fontSize={fontSize} />
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
