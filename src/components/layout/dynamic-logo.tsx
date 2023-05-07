import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { CharValue } from '../../api/game';
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

type Cells = Record<number, { char: CharValue; state: CellState }>;

export const DynamicLogo: FC<DynamicLogoProps> = (props) => {
  const { word } = props;
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
          char: char as CharValue,
          state: isNaN(Number(char)) ? 'disabled' : 'correct',
        },
      }),
      {}
    );

    setCells(newCells);
  }, [word]);

  return (
    <Grid container spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
      {Object.values(cells).map((cell, i) => (
        <Grid item key={i}>
          <CharCell
            width={28}
            state={cell.state}
            value={cell.char}
            onClick={() => onClickCell(i)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
