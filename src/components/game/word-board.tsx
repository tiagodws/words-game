import { Box } from '@mui/material';
import { FC, Fragment } from 'react';
import { useGame } from '../../hooks/use-game';
import { useSquareCellBoard } from '../../hooks/use-square-cell-board';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { CharCell, CharCellProps } from '../char-cell';

const BOARD_MAX_HEIGHT_PX = 520;

const Char: FC<CharCellProps & { itemSize: number }> = ({
  itemSize,
  ...props
}) => (
  <Box sx={{ m: `${itemSize * 0.05}px` }}>
    <CharCell {...props} />
  </Box>
);

export const WordBoard: FC = () => {
  const { config, state, input } = useGame();
  const { values, currentIndex, invalidIndexes, isFocused, focusIndex } = input;
  const rows = config.totalTries;
  const cols = config.wordLength;
  const wordLengthArray = getArrayOfSize(config.wordLength);
  const triesArray =
    state.triesLeft > 1 ? getArrayOfSize(state.triesLeft - 1) : [];

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
        maxHeight: BOARD_MAX_HEIGHT_PX,
        gridTemplateRows: `repeat(${rows}, ${itemSize}px)`,
        gridTemplateColumns: `repeat(${cols}, ${itemSize}px)`,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {state.submittedWords.map((submittedWord, i) => (
        <Fragment key={i}>
          {submittedWord.map((char, j) => (
            <Char key={j} {...char} fontSize={fontSize} itemSize={itemSize} />
          ))}
        </Fragment>
      ))}

      {state.triesLeft
        ? values.map((char, j) => (
            <Char
              key={j}
              char={char}
              onClick={() => focusIndex(j)}
              isFocused={isFocused && currentIndex === j}
              state={invalidIndexes.includes(j) ? 'invalid' : 'default'}
              fontSize={fontSize}
              itemSize={itemSize}
            />
          ))
        : null}

      {triesArray.map((_, i) => (
        <Fragment key={i}>
          {wordLengthArray.map((_, j) => (
            <Char key={j} state="disabled" itemSize={itemSize} />
          ))}
        </Fragment>
      ))}
    </Box>
  );
};
