import BackspaceIcon from '@mui/icons-material/Backspace';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { useElementSize } from 'usehooks-ts';
import { Char, useGame } from '../../hooks/game';
import { KeyboardKey } from './keyboard-key';
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

export const Keyboard: FC = () => {
  const { charStates, fill, erase, submitWord } = useGame();
  useKeyboard();
  const [containerRef, { width }] = useElementSize();
  const spacing = 0.5;
  const fontSize = Math.pow(width, 0.45);

  return (
    <Grid container ref={containerRef} spacing={spacing}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={spacing}
          sx={{ flexWrap: 'nowrap', justifyContent: 'center' }}
        >
          {firstRow.map((char) => (
            <Grid item key={char} sx={{ flex: 1, maxWidth: '3rem' }}>
              <KeyboardKey
                label={char}
                state={charStates[char]}
                lockAspectRatio
                onClick={() => fill(char)}
                fontSize={fontSize}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={spacing}
          sx={{ flexWrap: 'nowrap', justifyContent: 'center' }}
        >
          {secondRow.map((char) => (
            <Grid item key={char} sx={{ flex: 1, maxWidth: '3rem' }}>
              <KeyboardKey
                label={char}
                state={charStates[char]}
                lockAspectRatio
                onClick={() => fill(char)}
                fontSize={fontSize}
              />
            </Grid>
          ))}

          <Grid item sx={{ flex: 1, maxWidth: '5rem' }}>
            <KeyboardKey
              label={'Backspace'}
              icon={<BackspaceIcon />}
              onClick={() => erase()}
              fontSize={fontSize}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={spacing}
          sx={{ flexWrap: 'nowrap', justifyContent: 'center' }}
        >
          {thirdRow.map((char) => (
            <Grid item key={char} sx={{ flex: 1, maxWidth: '3rem' }}>
              <KeyboardKey
                label={char}
                state={charStates[char]}
                lockAspectRatio
                onClick={() => fill(char)}
                fontSize={fontSize}
              />
            </Grid>
          ))}

          <Grid item sx={{ flex: 1, maxWidth: '8rem' }}>
            <KeyboardKey
              label={'Enter'}
              fontSize={fontSize}
              onClick={() => submitWord()}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
