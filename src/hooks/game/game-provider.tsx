import React, { FC, useCallback, useEffect, useState } from 'react';
import { GameContext } from './game-context';
import { getCharState } from './get-char-state';
import { KeyboardListener } from './keyboard-listener';
import { CharState, CharStates, GameState, SubmittedWord, Word } from './types';
import { useWordInput } from './use-word-input';

export type GameProviderProps = {
  wordLength: number;
  tries: number;
  children?: React.ReactNode;
};

const loadWordStrings = (wordLength: number): string[] => {
  const wordFile = require(`./words/words-${wordLength}.json`);
  return wordFile;
};

const getWord = (wordStrings: string[]): Word => {
  return wordStrings[Math.floor(Math.random() * wordStrings.length)].split(
    ''
  ) as Word;
};

export const GameProvider: FC<GameProviderProps> = (props) => {
  const { wordLength, tries, children } = props;
  const [wordStrings, setWordStrings] = useState(loadWordStrings(wordLength));
  const [word, setWord] = useState(getWord(wordStrings));
  const [submittedWords, setSubmittedWords] = useState<SubmittedWord[]>([]);
  const [charStates, setCharStates] = useState({} as CharStates);
  const [state, setState] = useState(GameState.Playing);

  const reset = useCallback(() => {
    setWord(getWord(wordStrings));
    setSubmittedWords([]);
    setCharStates({});
    setState(GameState.Playing);
  }, [wordStrings]);

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

  const input = useWordInput({
    wordLength,
    wordStrings,
    onSubmitSuccess,
  });

  useEffect(() => {
    setWordStrings(loadWordStrings(wordLength));
  }, [wordLength]);

  useEffect(() => {
    reset();
  }, [wordStrings, reset]);

  useEffect(() => {
    if (!submittedWords.length) {
      return;
    }

    const lastWord = submittedWords[submittedWords.length - 1];

    if (lastWord.every((char) => char.state === CharState.Correct)) {
      setState(GameState.Won);
    } else if (submittedWords.length >= tries) {
      setState(GameState.Lost);
    }

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
  }, [submittedWords, tries]);

  return (
    <GameContext.Provider
      value={{
        state,
        word,
        wordLength,
        tries,
        triesLeft: tries - submittedWords.length,
        submittedWords,
        charStates,
        input,
        reset,
      }}
    >
      <KeyboardListener
        isEnabled={state === GameState.Playing}
        onArrowLeft={() => input.focusPreviousIndex(true)}
        onArrowRight={() => input.focusNextIndex(true)}
        onTab={() => input.focusNextIndex(true)}
        onBackspace={() => input.erase(true)}
        onDelete={() => input.erase()}
        onSpace={() => input.focusEmptyIndex()}
        onChar={(char) => input.type(char)}
        onEnter={() => input.submit()}
      />
      {children}
    </GameContext.Provider>
  );
};
