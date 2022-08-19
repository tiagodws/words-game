import { useEffect } from 'react';
import { Key } from 'ts-key-enum';
import { useGame } from '../../hooks/game/use-game';

export const useKeyboard = () => {
  const {
    focusPreviousPos,
    focusNextPos,
    focusNextEmptyPos,
    fill,
    erase,
    submitWord,
  } = useGame();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case Key.ArrowLeft: {
        focusPreviousPos(true);
        return;
      }
      case Key.ArrowRight: {
        focusNextPos(true);
        return;
      }
      case Key.Tab: {
        focusNextPos(true);
        e.preventDefault();
        return;
      }
      case Key.Backspace: {
        erase();
        return;
      }
      case Key.Enter: {
        submitWord();
        return;
      }
      case ' ': {
        focusNextEmptyPos();
        return;
      }
      default: {
        fill(e.key);
        return;
      }
    }
  };
};
