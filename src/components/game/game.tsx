import { Grid } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Char, CharCell, CharCellProps } from '../char-cell';
import { words } from './words';

type GameProps = {};

const WORD_LENGTH = 5;

const getArrayOfSize = (size: number) => Array.from(new Array(size));

export const Game: FC<GameProps> = (props) => {
  const [word] = useState(
    words[Math.floor(Math.random() * words.length)].toLowerCase().split('')
  );
  const [triedWords, setTriedWords] = useState<Char[][]>([]);
  const [inputArray, setInputArray] = useState<(Char | undefined)[]>(
    getArrayOfSize(WORD_LENGTH)
  );
  const [focusedCell, setFocusedCell] = useState<number>(0);
  const wordHistoryArea = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (inputArray.some((char) => !char)) {
      return;
    }

    setTriedWords((prev) => [...prev, inputArray as Char[]]);
    setInputArray(getArrayOfSize(WORD_LENGTH));
    setFocusedCell(0);
  };

  const focusNextCell = useCallback(
    (loop?: boolean) => {
      if (loop && focusedCell === WORD_LENGTH - 1) {
        setFocusedCell(0);
      } else {
        setFocusedCell(Math.min(WORD_LENGTH - 1, focusedCell + 1));
      }
    },
    [focusedCell]
  );

  const focusPreviousCell = useCallback(
    (loop?: boolean) => {
      if (loop && focusedCell === 0) {
        setFocusedCell(WORD_LENGTH - 1);
      } else {
        setFocusedCell(Math.max(0, focusedCell - 1));
      }
    },
    [focusedCell]
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);

    if (e.key === 'ArrowLeft') {
      focusPreviousCell(true);
    } else if (e.key === 'ArrowRight') {
      focusNextCell(true);
    } else if (e.key === 'Tab') {
      focusNextCell(true);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Backspace') {
      setInputArray((prev) => {
        const newArray = [...prev];
        newArray[focusedCell] = undefined;
        return newArray;
      });
      focusPreviousCell();
    } else if (e.key === 'Delete') {
      setInputArray((prev) => {
        const newArray = [...prev];
        newArray[focusedCell] = undefined;
        return newArray;
      });
    } else if (Object.values(Char).includes(e.key.toLowerCase() as Char)) {
      setInputArray((prev) => {
        const newArray = [...prev];
        newArray[focusedCell] = e.key.toLowerCase() as Char;
        return newArray;
      });
      focusNextCell();
    }
  };

  const getCellState = useCallback(
    (char: Char, i: number): CharCellProps['state'] => {
      if (word[i] === char) {
        return 'correct';
      }

      if (word.includes(char)) {
        return 'hint';
      }

      return 'incorrect';
    },
    [word]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <Grid
      container
      direction="column"
      sx={{ height: '100%', flexWrap: 'nowrap', gap: 10 }}
    >
      <Grid
        id="word-history-area"
        ref={wordHistoryArea}
        item
        sx={{
          flex: 1,
          overflow: 'hidden',
          '-webkit-mask-image':
            '-webkit-gradient(linear, left 10%, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,1)))',
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          {triedWords.map((word, i) => (
            <Grid item key={i}>
              <Grid
                container
                gap={0.4}
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                {word.map((char, i) => (
                  <Grid item key={i}>
                    <CharCell char={char} state={getCellState(char, i)} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid id="input-area" item>
        <Grid container direction="column" gap={4}>
          <Grid id="current-word-area" item>
            <Grid
              container
              gap={0.4}
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {inputArray.map((_, i) => (
                <Grid item key={i}>
                  <CharCell
                    char={inputArray[i]}
                    onClick={() => setFocusedCell(i)}
                    isFocused={focusedCell === i}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid id="keyboard-area" item sx={{ bgcolor: 'grey.500' }}>
            <div>Keyboard area</div>
            <div>Keyboard area</div>
            <div>Keyboard area</div>
            <div>Keyboard area</div>
            <div>Keyboard area</div>
            <div>Keyboard area</div>
            <div>Keyboard area</div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
