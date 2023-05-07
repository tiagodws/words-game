import React from 'react';
import { CharValue } from '../../../api/game';

export type WordInputValue = CharValue | undefined;

export type GameInputContextData = {
  values: WordInputValue[];
  currentIndex: number;
  isFocused: boolean;
  invalidIndexes: number[];
};

export const GameInputContext = React.createContext<GameInputContextData>({
  values: [],
  currentIndex: 0,
  isFocused: false,
  invalidIndexes: [],
});

export type GameInputActionsContextData = {
  type: (value: string) => void;
  erase: (goBack?: boolean) => void;
  submit: () => void;
  focusIndex: (index: number) => void;
  focusEmptyIndex: () => void;
  focusNextIndex: (loop?: boolean) => void;
  focusPreviousIndex: (loop?: boolean) => void;
};

export const GameInputActionsContext =
  React.createContext<GameInputActionsContextData>({
    type: () => null,
    erase: () => null,
    submit: () => null,
    focusIndex: () => null,
    focusEmptyIndex: () => null,
    focusNextIndex: () => null,
    focusPreviousIndex: () => null,
  });
