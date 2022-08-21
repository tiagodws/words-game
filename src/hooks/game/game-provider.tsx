import React, { FC, useCallback, useEffect, useState } from 'react';
import { Char } from './char';
import { GameContext } from './game-context';
import { getCharState } from './get-char-state';
import { KeyboardListener } from './keyboard-listener';
import { CharState, CharStates, SubmittedWord, Word } from './types';
import { useWordInput } from './use-word-input';
import { words } from './words';

export type GameProviderProps = {
  wordLength: number;
  tries: number;
  children?: React.ReactNode;
};

export const GameProvider: FC<GameProviderProps> = (props) => {
  const { wordLength, tries, children } = props;
  const [word] = useState(
    words[Math.floor(Math.random() * words.length)]
      .toLowerCase()
      .split('') as Char[]
  );
  const [submittedWords, setSubmittedWords] = useState<SubmittedWord[]>([]);
  const [charStates, setCharStates] = useState({} as CharStates);

  const onSubmitSuccess = useCallback(
    (newWord: Word) => {
      const submittedWord = newWord.map((char, i) => ({
        char,
        state: getCharState(i, newWord, word),
      }));

      setSubmittedWords((prev) => [...prev, submittedWord]);
    },
    [word]
  );

  const onSubmitError = useCallback(() => {}, []);

  const input = useWordInput({ wordLength, onSubmitSuccess, onSubmitError });

  useEffect(() => {
    if (!submittedWords.length) {
      return;
    }

    const lastWord = submittedWords[submittedWords.length - 1];

    setCharStates((prev) => {
      const newState = { ...prev };

      lastWord.forEach(({ char, state }) => {
        const prevState = prev[char];

        if (prevState === state || prevState === CharState.Correct) {
          return;
        }

        if (!prevState || state === CharState.Correct) {
          newState[char] = state;
          return;
        }

        if (prevState === CharState.Hint || state === CharState.Hint) {
          newState[char] = CharState.Hint;
          return;
        }
      });

      return newState;
    });
  }, [submittedWords]);

  return (
    <GameContext.Provider
      value={{
        word,
        wordLength,
        tries,
        triesLeft: tries - submittedWords.length,
        submittedWords,
        charStates,
        input,
      }}
    >
      <KeyboardListener
        onArrowLeft={() => input.focusPreviousIndex(true)}
        onArrowRight={() => input.focusNextIndex(true)}
        onTab={() => input.focusNextIndex(true)}
        onBackspace={() => input.erase()}
        onSpace={() => input.focusEmptyIndex()}
        onChar={(char) => input.type(char)}
        onEnter={() => input.submit()}
      />
      {children}
    </GameContext.Provider>
  );
};
