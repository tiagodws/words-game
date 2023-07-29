import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CharValue } from '../../../api/game';
import { getArrayOfSize } from '../../../utils/get-array-of-size';
import { useSnacks } from '../../use-snacks';
import { useCurrentGame } from '../api/use-current-game';
import { useSubmitWord } from '../api/use-submit-word';
import {
  GameInputActionsContext,
  GameInputContext,
  GameInputContextData,
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

export const GameInputProvider: FC<GameInputProviderProps> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const { showSnack } = useSnacks();
  const { data: game } = useCurrentGame();
  const { config } = game;
  const { mutate: submitWord } = useSubmitWord();
  const [inputState, setInputState] = useState<GameInputContextData>({
    values: getArrayOfSize(game?.config.wordLength),
    currentIndex: 0,
    isFocused: true,
    invalidIndexes: [],
  });
  const possibleWords = usePossibleWords({
    wordLength: game?.config.wordLength,
  });

  const type = useCallback((value: string) => {
    const upperCase = value && value.toUpperCase();
    const isValidChar = Object.values(CharValue).includes(
      upperCase as CharValue
    );

    if (upperCase && !isValidChar) {
      return;
    }

    setInputState((state) => {
      const { values, currentIndex, isFocused } = state;

      if (!isFocused || currentIndex >= values.length) {
        return state;
      }

      const char = upperCase as CharValue;
      const newValues = [...values];
      newValues[currentIndex] = char as CharValue;
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

      if (!possibleWords.some((word) => word === wordString)) {
        return { ...prev, invalidIndexes: prev.values.map((_, i) => i) };
      }

      submitWord(wordString);

      return {
        ...prev,
        invalidIndexes: [],
      };
    });
  }, [possibleWords, submitWord]);

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
  }, [clear, game]);

  useEffect(() => {
    const hasInvalidValues = !!inputState.invalidIndexes.length;
    const isInvalidWord =
      hasInvalidValues &&
      inputState.invalidIndexes.length === inputState.values.length;

    if (isInvalidWord) {
      showSnack(t('validation:notValid'), {
        variant: 'warning',
      });

      return;
    }

    if (hasInvalidValues) {
      showSnack(t('validation:incomplete'), {
        variant: 'warning',
      });

      return;
    }
  }, [
    inputState.invalidIndexes.length,
    inputState.values.length,
    t,
    showSnack,
  ]);

  const actions = useMemo(
    () => ({
      type,
      erase,
      clear,
      submit,
      focusEmptyIndex,
      focusIndex,
      focusNextIndex,
      focusPreviousIndex,
    }),
    [
      type,
      erase,
      clear,
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
