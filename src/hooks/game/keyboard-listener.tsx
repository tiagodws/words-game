import { FC, useEffect } from 'react';
import { Key } from 'ts-key-enum';
import { CharValue, GameState } from '../../api/game';
import { useCurrentGame } from './api/use-current-game';
import { useGameInputActions } from './game-input';

const validChars = Object.values(CharValue);

export const KeyboardListener: FC = () => {
  const { data: game } = useCurrentGame();
  const inputActions = useGameInputActions();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (game?.state !== GameState.Playing) {
      return;
    }

    switch (e.key) {
      case Key.ArrowLeft: {
        inputActions.focusPreviousIndex(true);
        return;
      }
      case Key.ArrowRight: {
        inputActions.focusNextIndex(true);
        return;
      }
      case Key.Tab: {
        inputActions.focusNextIndex(true);
        e.preventDefault();
        return;
      }
      case Key.Backspace: {
        inputActions.erase(true);
        return;
      }
      case Key.Delete: {
        inputActions.erase();
        return;
      }
      case Key.Enter: {
        inputActions.submit();
        return;
      }
      case ' ': {
        inputActions.focusEmptyIndex();
        return;
      }
      default: {
        const char = e.key.toUpperCase() as CharValue;

        if (validChars.includes(char)) {
          inputActions.type(char);
        }

        return;
      }
    }
  };

  return null;
};
