import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useGame } from '../../hooks/game';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { CharCell } from '../char-cell';

const Row: FC<{ children: ReactNode }> = ({ children }) => (
  <Grid item sx={{ minHeight: 0 }}>
    <Grid container sx={{ gap: 1, justifyContent: 'center', height: '100%' }}>
      {children}
    </Grid>
  </Grid>
);

const Column: FC<{ children: ReactNode }> = ({ children }) => (
  <Grid
    item
    xs={1.6}
    sm={1.2}
    md={0.8}
    sx={{ minHeight: 0, minWidth: 0, height: '100%' }}
  >
    {children}
  </Grid>
);

export const WordBoard: FC = () => {
  const {
    wordLength,
    triesLeft,
    submittedWords,
    inputArray,
    currentPos,
    invalidPos,
    focusPos,
  } = useGame();

  const triesArray = getArrayOfSize(triesLeft);
  const wordLengthArray = getArrayOfSize(wordLength);

  return (
    <Grid
      container
      direction="column"
      sx={{
        gap: 1,
        flexWrap: 'nowrap',
        height: '100%',
        overflow: 'hidden',
        alignContent: 'center',
      }}
    >
      {submittedWords.map((submittedWord, i) => (
        <Row key={i}>
          {submittedWord.map(({ char, state }, i) => (
            <Column key={i}>
              <CharCell char={char} state={state} />
            </Column>
          ))}
        </Row>
      ))}

      {triesArray.map((_, i) =>
        i ? (
          <Row key={i}>
            {wordLengthArray.map((_, i) => (
              <Column key={i}>
                <CharCell state="disabled" />
              </Column>
            ))}
          </Row>
        ) : (
          <Row key={i}>
            {inputArray.map((_, i) => (
              <Column key={i}>
                <CharCell
                  char={inputArray[i]}
                  onClick={() => focusPos(i)}
                  isFocused={currentPos === i}
                  state={invalidPos.includes(i) ? 'invalid' : 'default'}
                />
              </Column>
            ))}
          </Row>
        )
      )}
    </Grid>
  );
};
