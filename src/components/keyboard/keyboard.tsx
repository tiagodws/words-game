import { Box } from '@mui/material';
import { FC } from 'react';
import { useLongPress, useMeasure } from 'react-use';
import { CharValue } from '../../api/game';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { useGameInputActions } from '../../hooks/game/game-input';
import { KeyboardCell } from './keyboard-cell';

const firstRow = [
  CharValue.Q,
  CharValue.W,
  CharValue.E,
  CharValue.R,
  CharValue.T,
  CharValue.Y,
  CharValue.U,
  CharValue.I,
  CharValue.O,
  CharValue.P,
];
const secondRow = [
  CharValue.A,
  CharValue.S,
  CharValue.D,
  CharValue.F,
  CharValue.G,
  CharValue.H,
  CharValue.J,
  CharValue.K,
  CharValue.L,
];
const thirdRow = [
  CharValue.Z,
  CharValue.X,
  CharValue.C,
  CharValue.V,
  CharValue.B,
  CharValue.N,
  CharValue.M,
];

const rows = 3;
const cols = 22;
const defaultKeySize = 2;

export const Keyboard: FC = () => {
  const { data: game } = useCurrentGame();
  const inputActions = useGameInputActions();
  const [keyboardContainer, { width: keyboardWidth, height: keyboardHeight }] =
    useMeasure();

  const longPressEvent = useLongPress(() => inputActions.clear(), {
    isPreventDefault: false,
    delay: 600,
  });

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
          state={game.charStates[char]}
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
          state={game.charStates[char]}
          size={defaultKeySize}
          fontSize={keyboardFontSize}
          cellHeight={keyboardKeyHeight}
          cellWidth={keyboardKeyWidth}
        />
      ))}
      <Box />
      <KeyboardCell
        label={'<'}
        {...longPressEvent}
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
          state={game.charStates[char]}
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
