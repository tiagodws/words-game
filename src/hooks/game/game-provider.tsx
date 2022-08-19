import React, { FC, useCallback, useEffect, useState } from 'react';
import { CellState } from '../../components/char-cell';
import { getArrayOfSize } from '../../utils/get-array-of-size';
import { Char } from './char';
import { GameContext } from './game-context';
import { words } from './words';

export type GameProviderProps = {
  wordLength: number;
  tries: number;
  children?: React.ReactNode;
};

export type CharState = Exclude<CellState, 'default' | 'invalid' | 'disabled'>;

export type SubmittedWord = {
  char: Char;
  state: CharState;
}[];

export type CharStates = Partial<Record<Char, CharState>>;

type InputValue = Char | undefined;

type InputState = {
  inputArray: InputValue[];
  currentPos: number;
};

const getNextPos = (input: InputState, loop?: boolean) => {
  const { inputArray, currentPos } = input;
  const focusFirst = loop && currentPos >= inputArray.length - 1;
  const nextPos = Math.min(inputArray.length - 1, currentPos + 1);
  const newPos = focusFirst ? 0 : nextPos;
  return newPos;
};

const getNextEmptyPos = (input: InputState) => {
  const { inputArray, currentPos } = input;
  const nextEmptyPos = inputArray.findIndex(
    (char, i) => !char && (i > currentPos || i === inputArray.length - 1)
  );
  const newPos = nextEmptyPos === -1 ? inputArray.length : nextEmptyPos;
  return newPos;
};

const getPrevPos = (input: InputState, loop?: boolean) => {
  const { inputArray, currentPos } = input;
  const focusLast = loop && currentPos === 0;
  const previousPos = Math.max(0, currentPos - 1);
  const newPos = focusLast ? inputArray.length - 1 : previousPos;
  return newPos;
};

export const GameProvider: FC<GameProviderProps> = (props) => {
  const { wordLength, tries, children } = props;
  const [submittedWords, setSubmittedWords] = useState<SubmittedWord[]>([]);
  const [currentWord] = useState(
    words[Math.floor(Math.random() * words.length)]
      .toLowerCase()
      .split('') as Char[]
  );
  const [inputState, setInputState] = useState<InputState>({
    inputArray: getArrayOfSize(wordLength),
    currentPos: 0,
  });
  const [invalidPos, setInvalidPos] = useState<number[]>([]);
  const [charStates, setCharStates] = useState({} as CharStates);

  const fill = (value: string) => {
    const lowerCase = value && value.toLowerCase();
    const isValidChar = Object.values(Char).includes(lowerCase as Char);

    if (lowerCase && !isValidChar) {
      return;
    }

    setInputState(({ inputArray, currentPos }) => {
      if (currentPos >= inputArray.length) {
        return { inputArray, currentPos };
      }

      const char = lowerCase as Char;
      const newInputArray = [...inputArray];
      newInputArray[currentPos] = char as Char;
      const newPos = getNextEmptyPos({ inputArray: newInputArray, currentPos });

      return { inputArray: newInputArray, currentPos: newPos };
    });
  };

  const erase = () => {
    setInputState(({ inputArray, currentPos }) => {
      const newInputArray = [...inputArray];
      const isCurrentPosEmpty = !newInputArray[currentPos];
      const isPreviousPosEmpty = !newInputArray[currentPos - 1];

      if (!isCurrentPosEmpty) {
        newInputArray[currentPos] = undefined;
        return { inputArray: newInputArray, currentPos };
      }

      if (!isPreviousPosEmpty) {
        newInputArray[currentPos - 1] = undefined;
        return { inputArray: newInputArray, currentPos: currentPos - 1 };
      }

      if (currentPos) {
        return { inputArray, currentPos: currentPos - 1 };
      }

      return { inputArray, currentPos };
    });
  };

  const getCellState = useCallback(
    (submittedWord: Char[], i: number): CharState => {
      const char = submittedWord[i];

      if (currentWord[i] === char) {
        return 'correct';
      }

      const misses = currentWord.reduce<number[]>((result, wordChar, i) => {
        if (wordChar === char && submittedWord[i] !== wordChar) {
          return [...result, i];
        }

        return result;
      }, []);

      const tries = submittedWord.reduce<number[]>(
        (result, submittedChar, i) => {
          if (submittedChar === char && currentWord[i] !== submittedChar) {
            return [...result, i];
          }
          return result;
        },
        []
      );

      const hints = tries.slice(0, misses.length);

      if (hints.includes(i)) {
        return 'hint';
      }

      return 'incorrect';
    },
    [currentWord]
  );

  const submitWord = useCallback(() => {
    const word = [...inputState.inputArray];
    const emptyChars = word.reduce<number[]>((result, char, i) => {
      if (!char) {
        return [...result, i];
      }
      return result;
    }, []);

    if (emptyChars.length) {
      setInvalidPos(emptyChars);
      return;
    }

    const validWord = word as Char[];
    const submittedWord = validWord.map((char, i) => ({
      char,
      state: getCellState(validWord, i),
    }));

    setInputState({ inputArray: getArrayOfSize(wordLength), currentPos: 0 });
    setSubmittedWords((prev) => {
      if (prev.length >= tries) {
        return prev;
      }

      return [...prev, submittedWord];
    });
  }, [tries, wordLength, inputState.inputArray, getCellState]);

  useEffect(() => {
    if (!submittedWords.length) {
      return;
    }

    const lastWord = submittedWords[submittedWords.length - 1];

    setCharStates((prev) => {
      const newState = { ...prev };

      lastWord.forEach(({ char, state }) => {
        const prevState = prev[char];

        if (prevState === state || prevState === 'correct') {
          return;
        }

        if (!prevState || state === 'correct') {
          newState[char] = state;
          return;
        }

        if (prevState === 'hint' || state === 'hint') {
          newState[char] = 'hint';
          return;
        }
      });

      return newState;
    });
  }, [submittedWords]);

  useEffect(() => {
    if (!invalidPos.length) {
      return;
    }

    setInvalidPos([]);
  }, [inputState.inputArray, invalidPos.length]);

  return (
    <GameContext.Provider
      value={{
        wordLength,
        triesLeft: tries - submittedWords.length,
        currentWord,
        submittedWords,
        invalidPos,
        inputArray: inputState.inputArray,
        currentPos: inputState.currentPos,
        charStates,
        focusPos: (pos: number) =>
          setInputState((state) => ({ ...state, currentPos: pos })),
        focusNextEmptyPos: () =>
          setInputState((state) => ({
            ...state,
            currentPos: getNextEmptyPos(state),
          })),
        focusNextPos: (loop?: boolean) =>
          setInputState((state) => ({
            ...state,
            currentPos: getNextPos(state, loop),
          })),
        focusPreviousPos: (loop?: boolean) =>
          setInputState((state) => ({
            ...state,
            currentPos: getPrevPos(state, loop),
          })),
        fill,
        erase,
        submitWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
