import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { getArrayOfSize } from '../../../utils/get-array-of-size';
import { Char } from './../char';
import { Word } from './../types';
import {
  getEmptyIndex,
  getNextIndex,
  getPreviousIndex,
} from './input-navigation';
import { usePossibleWords } from './use-possible-words';

export type WordInputValue = Char | undefined;

export type WordInputState = {
  values: WordInputValue[];
  currentIndex: number;
  invalidIndexes: number[];
};

export type WordInput = {
  values: WordInputValue[];
  currentIndex: number;
  invalidIndexes: number[];
  type: (value: string) => void;
  erase: (goBack?: boolean) => void;
  submit: () => void;
  focusIndex: (index: number) => void;
  focusEmptyIndex: () => void;
  focusNextIndex: (loop?: boolean) => void;
  focusPreviousIndex: (loop?: boolean) => void;
};

type UseWordInputProps = {
  wordLength: number;
  onSubmitSuccess: (submittedWord: Word) => void;
};

export const useWordInput = (props: UseWordInputProps): WordInput => {
  const { wordLength, onSubmitSuccess } = props;
  const { enqueueSnackbar } = useSnackbar();
  const possibleWords = usePossibleWords({ wordLength });
  const [inputState, setInputState] = useState<WordInputState>({
    values: getArrayOfSize(wordLength),
    currentIndex: 0,
    invalidIndexes: [],
  });

  const type = useCallback((value: string) => {
    const upperCase = value && value.toUpperCase();
    const isValidChar = Object.values(Char).includes(upperCase as Char);

    if (upperCase && !isValidChar) {
      return;
    }

    setInputState((state) => {
      const { values, currentIndex } = state;

      if (currentIndex >= values.length) {
        return state;
      }

      const char = upperCase as Char;
      const newValues = [...values];
      newValues[currentIndex] = char as Char;
      const newPos = getEmptyIndex(currentIndex, newValues);

      return { values: newValues, currentIndex: newPos, invalidIndexes: [] };
    });
  }, []);

  const erase = useCallback((goBack?: boolean) => {
    setInputState((state) => {
      const { values, currentIndex } = state;
      const newValues = [...values];
      const isCurrentIndexEmpty = !newValues[currentIndex];
      const isPreviousIndexEmpty = !newValues[currentIndex - 1];
      const isValidIndex = currentIndex < values.length;

      if (!isCurrentIndexEmpty) {
        newValues[currentIndex] = undefined;
        return { values: newValues, currentIndex, invalidIndexes: [] };
      }

      if (!goBack && isValidIndex) {
        return state;
      }

      if (!isPreviousIndexEmpty) {
        newValues[currentIndex - 1] = undefined;
        return {
          values: newValues,
          currentIndex: currentIndex - 1,
          invalidIndexes: [],
        };
      }

      if (currentIndex) {
        return { values, currentIndex: currentIndex - 1, invalidIndexes: [] };
      }

      return state;
    });
  }, []);

  const submit = useCallback(() => {
    const word = [...inputState.values];
    const invalidIndexes = word.reduce<number[]>((result, char, i) => {
      if (!char) {
        return [...result, i];
      }
      return result;
    }, []);

    if (invalidIndexes.length) {
      setInputState((state) => ({ ...state, invalidIndexes }));
      enqueueSnackbar('Word is not complete', { variant: 'warning' });
      return;
    }

    const isValidWord = possibleWords.some((w) => w === word.join(''));

    if (!isValidWord) {
      setInputState((state) => ({
        ...state,
        invalidIndexes: word.map((_, i) => i),
      }));

      enqueueSnackbar('This word is not accepted', { variant: 'warning' });
      return;
    }

    setInputState({
      values: getArrayOfSize(wordLength),
      currentIndex: 0,
      invalidIndexes: [],
    });

    onSubmitSuccess(word as Char[]);
  }, [
    inputState.values,
    possibleWords,
    wordLength,
    enqueueSnackbar,
    onSubmitSuccess,
  ]);

  const focusIndex = useCallback((index: number) => {
    setInputState((state) => ({ ...state, currentIndex: index }));
  }, []);

  const focusEmptyIndex = useCallback(() => {
    setInputState((state) => ({
      ...state,
      currentIndex: getEmptyIndex(state.currentIndex, state.values),
    }));
  }, []);

  const focusNextIndex = useCallback((loop?: boolean) => {
    setInputState((state) => ({
      ...state,
      currentIndex: getNextIndex(state.currentIndex, state.values, loop),
    }));
  }, []);

  const focusPreviousIndex = useCallback((loop?: boolean) => {
    setInputState((state) => ({
      ...state,
      currentIndex: getPreviousIndex(state.currentIndex, state.values, loop),
    }));
  }, []);

  useEffect(() => {
    setInputState({
      values: getArrayOfSize(wordLength),
      currentIndex: 0,
      invalidIndexes: [],
    });
  }, [wordLength, possibleWords]);

  return {
    currentIndex: inputState.currentIndex,
    values: inputState.values,
    invalidIndexes: inputState.invalidIndexes,
    type,
    erase,
    submit,
    focusIndex,
    focusEmptyIndex,
    focusNextIndex,
    focusPreviousIndex,
  } as const;
};