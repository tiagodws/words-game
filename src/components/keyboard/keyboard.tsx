import { Box } from '@mui/material';
import { FC } from 'react';
import { useElementSize } from 'usehooks-ts';
import { Char, useGame } from '../../hooks/game';
import { KeyboardKey, KeyboardKeyProps } from './keyboard-key';
import { useKeyboard } from './use-keyboard';

const firstRow = [
  Char.q,
  Char.w,
  Char.e,
  Char.r,
  Char.t,
  Char.y,
  Char.u,
  Char.i,
  Char.o,
  Char.p,
];
const secondRow = [
  Char.a,
  Char.s,
  Char.d,
  Char.f,
  Char.g,
  Char.h,
  Char.j,
  Char.k,
  Char.l,
];
const thirdRow = [Char.z, Char.x, Char.c, Char.v, Char.b, Char.n, Char.m];

const rows = 3;
const cols = 22;
const defaultKeySize = 2;

const Key: FC<
  {
    size?: number;
  } & KeyboardKeyProps
> = ({ size = defaultKeySize, ...props }) => (
  <Box sx={{ gridColumn: `span ${size}`, m: '4px' }}>
    <KeyboardKey {...props} />
  </Box>
);

export const Keyboard: FC = () => {
  useKeyboard();
  const { charStates, fill, erase, submitWord } = useGame();
  const [keyboardContainer, { width: keyboardWidth, height: keyboardHeight }] =
    useElementSize();

  const keyboardKeyHeight = Math.min(keyboardHeight / rows, 64);
  const keyboardKeyWidth = Math.min(keyboardWidth / cols, 32);

  const keyboardFontSize = Math.min(
    keyboardKeyWidth * defaultKeySize > keyboardKeyHeight
      ? keyboardKeyHeight * 0.5
      : keyboardKeyWidth * defaultKeySize * 0.6,
    24
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
          onClick={() => fill(char)}
          state={charStates[char]}
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
          onClick={() => fill(char)}
          state={charStates[char]}
        />
      ))}
      <Box />
      <Key label={'<'} fontSize={keyboardFontSize} onClick={() => erase()} />

      <Box />
      <Box />
      {thirdRow.map((char) => (
        <Key
          key={char}
          label={char}
          fontSize={keyboardFontSize}
          onClick={() => fill(char)}
          state={charStates[char]}
        />
      ))}

      <Box />
      <Key
        label={'ENTER'}
        size={5}
        fontSize={keyboardFontSize}
        onClick={() => submitWord()}
      />
    </Box>
  );
};
