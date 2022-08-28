import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Char } from '../../hooks/game';
import { CellState, CharCell } from '../char-cell';

type DynamicLogoProps = {
  word: string;
  containerHeight: number;
};

const stateArray: CellState[] = ['disabled', 'correct', 'incorrect', 'hint'];

const getNextState = (state: CellState): CellState => {
  const currentIndex = stateArray.indexOf(state);
  const nextIndex = currentIndex + 1;
  return nextIndex === stateArray.length
    ? stateArray[0]
    : stateArray[nextIndex];
};

type Cells = Record<number, { char: Char; state: CellState }>;

export const DynamicLogo: FC<DynamicLogoProps> = (props) => {
  const { containerHeight, word } = props;
  const [cells, setCells] = useState<Cells>({});

  const onClickCell = (i: number) => {
    setCells((prev) => ({
      ...prev,
      [i]: { ...prev[i], state: getNextState(prev[i].state) },
    }));
  };

  useEffect(() => {
    const newCells = word.split('').reduce<Cells>(
      (result, char, i) => ({
        ...result,
        [i]: {
          char: char as Char,
          state: isNaN(Number(char)) ? 'disabled' : 'correct',
        },
      }),
      {}
    );

    setCells(newCells);
  }, [word]);

  return (
    <>
      {Object.values(cells).map((cell, i) => (
        <Box
          key={i}
          sx={{
            mx: containerHeight * 0.06 * 0.05,
            height: containerHeight * 0.45,
            width: containerHeight * 0.45,
          }}
        >
          <CharCell
            state={cell.state}
            char={cell.char}
            fontSize={containerHeight * 0.25}
            onClick={() => onClickCell(i)}
          />
        </Box>
      ))}
    </>
  );
};
