import BackspaceIcon from '@mui/icons-material/Backspace';
import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
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

const spacing = 0.5;
const Row: FC<{ children: ReactNode }> = ({ children }) => (
  <Grid item xs={12}>
    <Grid
      container
      spacing={spacing}
      sx={{ flexWrap: 'nowrap', justifyContent: 'center' }}
    >
      {children}
    </Grid>
  </Grid>
);

const Column: FC<{ children: ReactNode; size?: number }> = ({
  children,
  size = 1,
}) => (
  <Grid item xs={1 * size} sm={0.8 * size} md={0.6 * size}>
    {children}
  </Grid>
);

export const Keyboard: FC = () => {
  const { charStates, fill, erase, submitWord } = useGame();
  useKeyboard();
  const [containerRef, { width }] = useElementSize();
  const fontSize = Math.pow(width, 0.45);

  return (
    <Grid container ref={containerRef} spacing={spacing}>
      <Row>
        {firstRow.map((char) => (
          <Column key={char}>
            <KeyboardKey
              label={char}
              state={charStates[char]}
              lockAspectRatio
              onClick={() => fill(char)}
              fontSize={fontSize}
            />
          </Column>
        ))}
      </Row>

      <Row>
        {secondRow.map((char) => (
          <Column key={char}>
            <KeyboardKey
              label={char}
              state={charStates[char]}
              lockAspectRatio
              onClick={() => fill(char)}
              fontSize={fontSize}
            />
          </Column>
        ))}

        <Column size={2}>
          <KeyboardKey
            label={'Backspace'}
            icon={<BackspaceIcon />}
            onClick={() => erase()}
            fontSize={fontSize}
          />
        </Column>
      </Row>

      <Row>
        {thirdRow.map((char) => (
          <Column key={char}>
            <KeyboardKey
              label={char}
              state={charStates[char]}
              lockAspectRatio
              onClick={() => fill(char)}
              fontSize={fontSize}
            />
          </Column>
        ))}

        <Column size={3}>
          <KeyboardKey
            label={'Enter'}
            fontSize={fontSize}
            onClick={() => submitWord()}
          />
        </Column>
      </Row>
    </Grid>
  );
};
