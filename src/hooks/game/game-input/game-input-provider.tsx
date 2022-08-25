import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getArrayOfSize } from '../../../utils/get-array-of-size';
import { Char } from '../../use-game';
import { WordInputState } from '../../use-game/use-word-input';
import {
  getEmptyIndex,
  getNextIndex,
  getPreviousIndex,
} from '../../use-game/use-word-input/input-navigation';
import { usePossibleWords } from '../../use-game/use-word-input/use-possible-words';
import { useSnacks } from '../../use-snacks';
import { useTracking } from '../../use-tracking';
import { useGameConfig } from '../game-config';
import { useGameStateActions } from '../game-state';
import {
  GameInputActionsContext,
  GameInputContext,
} from './game-input-context';

export type GameInputProviderProps = {
  children?: React.ReactNode;
};

export const GameInputProvider: FC<GameInputProviderProps> = (props) => {
  const { children } = props;
  const config = useGameConfig();
  const { submitWord } = useGameStateActions();
  const { showSnack } = useSnacks();
  const possibleWords = usePossibleWords(config);
  const { t } = useTranslation(['validation']);
  const [inputState, setInputState] = useState<WordInputState>({
    values: getArrayOfSize(config.wordLength),
    currentIndex: 0,
    isFocused: true,
    invalidIndexes: [],
  });
  const { sendEvent } = useTracking();

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

      return {
        values: newValues,
        currentIndex: emptyIndex ?? currentIndex,
        isFocused: emptyIndex !== undefined,
        invalidIndexes: [],
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

      if (!isCurrentIndexEmpty) {
        newValues[currentIndex] = undefined;
        return {
          values: newValues,
          currentIndex,
          isFocused: true,
          invalidIndexes: [],
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
          invalidIndexes: [],
        };
      }

      if (currentIndex) {
        return {
          values,
          currentIndex: currentIndex - 1,
          isFocused: true,
          invalidIndexes: [],
        };
      }

      return state;
    });
  }, []);

  const submit = useCallback(() => {
    setInputState((prev) => {
      const word = prev.values;
      const wordString = word.join('');
      const invalidIndexes = word.reduce<number[]>((result, char, i) => {
        if (!char) {
          return [...result, i];
        }
        return result;
      }, []);

      if (invalidIndexes.length) {
        return { ...prev, invalidIndexes };
      }

      const isValidWord = possibleWords.some((w) => w === wordString);

      if (!isValidWord) {
        return {
          ...prev,
          invalidIndexes: word.map((_, i) => i),
        };
      }

      return {
        values: getArrayOfSize(config.wordLength),
        currentIndex: 0,
        isFocused: true,
        invalidIndexes: [],
      };
    });
  }, [config.wordLength, possibleWords]);

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
    setInputState({
      values: getArrayOfSize(config.wordLength),
      currentIndex: 0,
      isFocused: true,
      invalidIndexes: [],
    });
  }, [config, possibleWords]);

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
