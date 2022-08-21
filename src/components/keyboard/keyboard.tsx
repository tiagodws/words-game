import { Box } from '@mui/material';
import { FC } from 'react';
import { useElementSize } from 'usehooks-ts';
import { Char, useGame } from '../../hooks/game';
import { KeyboardKey, KeyboardKeyProps } from './keyboard-key';

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

const Key: FC<
  {
    size?: number;
    itemWidth: number;
    itemHeight: number;
  } & KeyboardKeyProps
> = ({ size = defaultKeySize, itemHeight, itemWidth, ...props }) => (
  <Box
    sx={{
      gridColumn: `span ${size}`,
      mx: `${itemWidth * 0.05}px`,
      my: `${itemWidth * 0.05}px`,
    }}
  >
    <KeyboardKey {...props} />
  </Box>
);

export const Keyboard: FC = () => {
  const { charStates, input } = useGame();
  const { type, erase, submit } = input;
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
        <Key
          key={char}
          label={char}
          fontSize={keyboardFontSize}
          onClick={() => type(char)}
          state={charStates[char]}
          itemHeight={keyboardKeyHeight}
          itemWidth={keyboardKeyWidth}
        />
      ))}
      <Box />
      <Box />

      <Box />
      {secondRow.map((char) => (
        <Key
          key={char}
          label={char}
          fontSize={keyboardFontSize}
          onClick={() => type(char)}
          state={charStates[char]}
          itemHeight={keyboardKeyHeight}
          itemWidth={keyboardKeyWidth}
        />
      ))}
      <Box />
      <Key
        label={'<'}
        fontSize={keyboardFontSize}
        onClick={() => erase()}
        itemHeight={keyboardKeyHeight}
        itemWidth={keyboardKeyWidth}
      />

      <Box />
      <Box />
      {thirdRow.map((char) => (
        <Key
          key={char}
          label={char}
          fontSize={keyboardFontSize}
          onClick={() => type(char)}
          state={charStates[char]}
          itemHeight={keyboardKeyHeight}
          itemWidth={keyboardKeyWidth}
        />
      ))}

      <Box />
      <Key
        label={'ENTER'}
        size={5}
        fontSize={keyboardFontSize}
        onClick={() => submit()}
        itemHeight={keyboardKeyHeight}
        itemWidth={keyboardKeyWidth}
      />
    </Box>
  );
};
