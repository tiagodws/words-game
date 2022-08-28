import { Box } from '@mui/material';
import { FC } from 'react';
import { useElementSize } from 'usehooks-ts';
import { Char } from '../../hooks/game';
import { useGameInputActions } from '../../hooks/game/game-input';
import { useGameState } from '../../hooks/game/game-state';
import { KeyboardCell } from './keyboard-cell';

const firstRow = [
  Char.Q,
  Char.W,
  Char.E,
  Char.R,
  Char.T,
  Char.Y,
  Char.U,
  Char.I,
  Char.O,
  Char.P,
];
const secondRow = [
  Char.A,
  Char.S,
  Char.D,
  Char.F,
  Char.G,
  Char.H,
  Char.J,
  Char.K,
  Char.L,
];
const thirdRow = [Char.Z, Char.X, Char.C, Char.V, Char.B, Char.N, Char.M];

const rows = 3;
const cols = 22;
const defaultKeySize = 2;

export const Keyboard: FC = () => {
  const state = useGameState();
  const inputActions = useGameInputActions();
  const [keyboardContainer, { width: keyboardWidth, height: keyboardHeight }] =
    useElementSize();

  const keyboardKeyHeight = Math.min(keyboardHeight / rows, 64);
  const keyboardKeyWidth = Math.min(keyboardWidth / cols, 32);
  const keyboardFontSize = Math.min(
    keyboardKeyWidth * defaultKeySize > keyboardKeyHeight
      ? keyboardKeyHeight * 0.4
      : keyboardKeyWidth * defaultKeySize * 0.5,
    22
  );

  return (
    <Box
      ref={keyboardContainer}
      sx={{
        display: 'grid',
        height: '100%',
        width: '100%',
        maxHeight: 280,
        gridTemplateRows: `repeat(${rows}, ${keyboardKeyHeight}px)`,
        gridTemplateColumns: `repeat(${cols}, ${keyboardKeyWidth}px)`,
        justifyContent: 'center',
        alignContent: 'flex-end',
      }}
    >
      {firstRow.map((char) => (
        <KeyboardCell
          key={char}
          label={char}
          onClick={() => inputActions.type(char)}
          state={state.charStates[char]}
          size={defaultKeySize}
          fontSize={keyboardFontSize}
          cellHeight={keyboardKeyHeight}
          cellWidth={keyboardKeyWidth}
        />
      ))}
      <Box />
      <Box />

      <Box />
      {secondRow.map((char) => (
        <KeyboardCell
          key={char}
          label={char}
          onClick={() => inputActions.type(char)}
          state={state.charStates[char]}
          size={defaultKeySize}
          fontSize={keyboardFontSize}
          cellHeight={keyboardKeyHeight}
          cellWidth={keyboardKeyWidth}
        />
      ))}
      <Box />
      <KeyboardCell
        label={'<'}
        onClick={() => inputActions.erase(true)}
        size={defaultKeySize}
        fontSize={keyboardFontSize}
        cellHeight={keyboardKeyHeight}
        cellWidth={keyboardKeyWidth}
      />

      <Box />
      <Box />
      {thirdRow.map((char) => (
        <KeyboardCell
          key={char}
          label={char}
          onClick={() => inputActions.type(char)}
          state={state.charStates[char]}
          size={defaultKeySize}
          fontSize={keyboardFontSize}
          cellHeight={keyboardKeyHeight}
          cellWidth={keyboardKeyWidth}
        />
      ))}

      <Box />
      <KeyboardCell
        label="ENTER"
        size={5}
        onClick={() => inputActions.submit()}
        fontSize={keyboardFontSize}
        cellHeight={keyboardKeyHeight}
        cellWidth={keyboardKeyWidth}
      />
    </Box>
  );
};
