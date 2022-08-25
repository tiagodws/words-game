import { FC, useEffect } from 'react';
import { Key } from 'ts-key-enum';
import { Char, GameStatus } from '../use-game';
import { useGameInputActions } from './game-input';
import { useGameState } from './game-state';

const validChars = Object.values(Char);

export const KeyboardListener: FC = (props) => {
  const { status } = useGameState();
  const inputActions = useGameInputActions();

  useEffect(() => {
    console.log('tet');
  }, [inputActions.submit]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (status !== GameStatus.Playing) {
      return;
    }

    switch (e.key) {
      case Key.ArrowLeft: {
        inputActions.focusPreviousIndex();
        return;
      }
      case Key.ArrowRight: {
        inputActions.focusNextIndex();
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
        const char = e.key.toUpperCase() as Char;

        if (validChars.includes(char)) {
          inputActions.type(char);
        }

        return;
      }
    }
  };

  return null;
};
