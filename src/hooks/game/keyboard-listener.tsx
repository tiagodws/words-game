import { FC, useEffect } from 'react';
import { Key } from 'ts-key-enum';
import { Char } from './char';

type KeyboardListenerProps = {
  isEnabled: boolean;
  onArrowLeft: () => void;
  onArrowRight: () => void;
  onTab: (shiftKey?: boolean) => void;
  onBackspace: () => void;
  onDelete: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onChar: (char: Char) => void;
};

const validChars = Object.values(Char);

export const KeyboardListener: FC<KeyboardListenerProps> = (props) => {
  const {
    isEnabled,
    onArrowLeft,
    onArrowRight,
    onTab,
    onBackspace,
    onDelete,
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
    if (!isEnabled) {
      return;
    }

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
        onTab(e.shiftKey);
        e.preventDefault();
        return;
      }
      case Key.Backspace: {
        onBackspace();
        return;
      }
      case Key.Delete: {
        onDelete();
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
        const char = e.key.toUpperCase() as Char;

        if (validChars.includes(char)) {
          onChar(char);
        }

        return;
      }
    }
  };

  return null;
};
