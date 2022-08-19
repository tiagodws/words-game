import { Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useGame } from '../../hooks/game';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { CharCell } from '../char-cell';

const Row: FC<{ children: ReactNode }> = ({ children }) => (
  <Grid
    container
    gap={1}
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'nowrap',
    }}
  >
    {children}
  </Grid>
);

const Column: FC<{ children: ReactNode }> = ({ children }) => (
  <Grid item sx={{ maxWidth: '5rem', flex: 1 }}>
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
        flexWrap: 'nowrap',
        height: '100%',
        justifyContent: 'center',
        gap: 1,
        overflow: 'hidden',
      }}
    >
      {submittedWords.map((submittedWord, i) => (
        <Grid item key={i}>
          <Row>
            {submittedWord.map(({ char, state }, i) => (
              <Column key={i}>
                <CharCell char={char} state={state} />
              </Column>
            ))}
          </Row>
        </Grid>
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
