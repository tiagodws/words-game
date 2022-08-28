import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getArrayOfSize } from '../../../utils/get-array-of-size';
import { useSnacks } from '../../use-snacks';
import { TrackingEvent, useTracking } from '../../use-tracking';
import { useGameConfig } from '../game-config';
import { useGameStateActions } from '../game-state';
import { Char, Word } from '../types';
import {
  GameInputActionsContext,
  GameInputContext,
  WordInputValue,
} from './game-input-context';
import {
  getEmptyIndex,
  getNextIndex,
  getPreviousIndex,
} from './input-navigation';
import { usePossibleWords } from './use-possible-words';

export type GameInputProviderProps = {
  children?: React.ReactNode;
};

export type WordInputState = {
  values: WordInputValue[];
  currentIndex: number;
  isFocused: boolean;
  invalidIndexes: number[];
  submittedValues?: WordInputValue[];
};

export const GameInputProvider: FC<GameInputProviderProps> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const { showSnack } = useSnacks();
  const { sendEvent } = useTracking();
  const config = useGameConfig();
  const { submitWord } = useGameStateActions();
  const possibleWords = usePossibleWords(config);
  const [inputState, setInputState] = useState<WordInputState>({
    values: getArrayOfSize(config.wordLength),
    currentIndex: 0,
    isFocused: true,
    invalidIndexes: [],
  });

  const type = useCallback((value: string) => {
    const upperCase = value && value.toUpperCase();
    const isValidChar = Object.values(Char).includes(upperCase as Char);

    if (upperCase && !isValidChar) {
      return;
    }

    setInputState((state) => {
      const { values, currentIndex, isFocused } = state;

      if (!isFocused || currentIndex >= values.length) {
        return state;
      }

      const char = upperCase as Char;
      const newValues = [...values];
      newValues[currentIndex] = char as Char;
      const emptyIndex = getEmptyIndex(currentIndex, newValues);
      const invalidIndexes = state.invalidIndexes.length
        ? []
        : state.invalidIndexes;

      return {
        values: newValues,
        currentIndex: emptyIndex ?? currentIndex,
        isFocused: emptyIndex !== undefined,
        invalidIndexes,
      };
    });
  }, []);

  const erase = useCallback((goBack?: boolean) => {
    setInputState((state) => {
      const { values, currentIndex } = state;
      const newValues = [...values];
      const isCurrentIndexEmpty = !newValues[currentIndex];
      const isPreviousIndexEmpty = !newValues[currentIndex - 1];
      const isValidIndex = currentIndex < values.length;
      const invalidIndexes = state.invalidIndexes.length
        ? []
        : state.invalidIndexes;

      if (!isCurrentIndexEmpty) {
        newValues[currentIndex] = undefined;
        return {
          values: newValues,
          currentIndex,
          isFocused: true,
          invalidIndexes,
        };
      }

      if (!goBack && isValidIndex) {
        return state;
      }

      if (!isPreviousIndexEmpty) {
        newValues[currentIndex - 1] = undefined;
        return {
          values: newValues,
          currentIndex: currentIndex - 1,
          isFocused: true,
          invalidIndexes,
        };
      }

      if (currentIndex) {
        return {
          values,
          currentIndex: currentIndex - 1,
          isFocused: true,
          invalidIndexes,
        };
      }

      return state;
    });
  }, []);

  const submit = useCallback(() => {
    setInputState((prev) => {
      const word = prev.values;

      const invalidIndexes = word.reduce<number[]>((result, char, i) => {
        if (!char) {
          return [...result, i];
        }
        return result;
      }, []);

      if (invalidIndexes.length) {
        return { ...prev, invalidIndexes, submittedValues: word };
      }

      const wordString = word.join('');
      const isValidWord = possibleWords.some((w) => w === wordString);

      if (!isValidWord) {
        return {
          ...prev,
          invalidIndexes: word.map((_, i) => i),
          submittedValues: word,
        };
      }

      return {
        values: getArrayOfSize(config.wordLength),
        currentIndex: 0,
        isFocused: true,
        invalidIndexes: [],
        submittedValues: word,
      };
    });
  }, [config.wordLength, possibleWords]);

  const clear = useCallback(() => {
    setInputState({
      values: getArrayOfSize(config.wordLength),
      currentIndex: 0,
      isFocused: true,
      invalidIndexes: [],
    });
  }, [config.wordLength]);

  const focusIndex = useCallback((index: number) => {
    setInputState((state) => ({ ...state, currentIndex: index }));
  }, []);

  const focusEmptyIndex = useCallback(() => {
    setInputState((state) => {
      const emptyIndex = getEmptyIndex(state.currentIndex, state.values);
      return {
        ...state,
        currentIndex: emptyIndex ?? state.currentIndex,
        isFocused: emptyIndex !== undefined,
      };
    });
  }, []);

  const focusNextIndex = useCallback((loop?: boolean) => {
    setInputState((state) => ({
      ...state,
      currentIndex: getNextIndex(state.currentIndex, state.values, loop),
      isFocused: true,
    }));
  }, []);

  const focusPreviousIndex = useCallback((loop?: boolean) => {
    setInputState((state) => ({
      ...state,
      currentIndex: getPreviousIndex(state.currentIndex, state.values, loop),
      isFocused: true,
    }));
  }, []);

  useEffect(() => {
    clear();
  }, [clear]);

  useEffect(() => {
    const submittedValues = inputState.submittedValues?.filter((v) => !!v);
    const invalidIndexes = inputState.invalidIndexes;

    if (submittedValues?.length && !invalidIndexes.length) {
      submitWord(submittedValues as Word);
      clear();
      return;
    }

    if (!invalidIndexes.length) {
      return;
    }

    if (submittedValues?.length !== config.wordLength) {
      showSnack(t('validation:incomplete'), {
        variant: 'warning',
      });
      return;
    }

    showSnack(t('validation:notValid'), { variant: 'warning' });
    sendEvent(TrackingEvent.GameWordTried, { word: submittedValues.join('') });
  }, [
    inputState.submittedValues,
    inputState.invalidIndexes,
    config.wordLength,
    clear,
    t,
    showSnack,
    submitWord,
    sendEvent,
  ]);

  const actions = useMemo(
    () => ({
      type,
      erase,
      submit,
      focusEmptyIndex,
      focusIndex,
      focusNextIndex,
      focusPreviousIndex,
    }),
    [
      type,
      erase,
      submit,
      focusEmptyIndex,
      focusIndex,
      focusNextIndex,
      focusPreviousIndex,
    ]
  );

  return (
    <GameInputContext.Provider value={inputState}>
      <GameInputActionsContext.Provider value={actions}>
        {children}
      </GameInputActionsContext.Provider>
    </GameInputContext.Provider>
  );
};
