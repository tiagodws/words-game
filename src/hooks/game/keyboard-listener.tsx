import { FC, useEffect } from 'react';
import { Key } from 'ts-key-enum';
import { Char } from './char';

type KeyboardListenerProps = {
  onArrowLeft: () => void;
  onArrowRight: () => void;
  onTab: () => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onChar: (char: Char) => void;
};

const validChars = Object.values(Char);

export const KeyboardListener: FC<KeyboardListenerProps> = (props) => {
  const {
    onArrowLeft,
    onArrowRight,
    onTab,
    onBackspace,
    onEnter,
    onSpace,
    onChar,
  } = props;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case Key.ArrowLeft: {
        onArrowLeft();
        return;
      }
      case Key.ArrowRight: {
        onArrowRight();
        return;
      }
      case Key.Tab: {
        onTab();
        e.preventDefault();
        return;
      }
      case Key.Backspace: {
        onBackspace();
        return;
      }
      case Key.Enter: {
        onEnter();
        return;
      }
      case ' ': {
        onSpace();
        return;
      }
      default: {
        const char = e.key.toLowerCase() as Char;

        if (validChars.includes(char)) {
          onChar(char);
        }

        return;
      }
    }
  };

  return null;
};
