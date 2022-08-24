import React, { FC, useCallback, useEffect, useState } from 'react';
import { GameContext } from './game-context';
import { getCharState, getCharStates } from './get-char-state';
import { KeyboardListener } from './keyboard-listener';
import { CharState, CharStates, GameState, SubmittedWord, Word } from './types';
import { useWord } from './use-word';
import { useWordInput } from './use-word-input';

export type GameProviderProps = {
  wordLength: number;
  tries: number;
  children?: React.ReactNode;
};

export const GameProvider: FC<GameProviderProps> = (props) => {
  const { wordLength, tries, children } = props;
  const { word, changeWord: reset } = useWord({ wordLength });
  const [submittedWords, setSubmittedWords] = useState<SubmittedWord[]>([]);
  const [charStates, setCharStates] = useState({} as CharStates);
  const [state, setState] = useState(GameState.Playing);

  const onSubmitSuccess = useCallback(
    (newWord: Word) => {
      if (!word) {
        return;
      }

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
    onSubmitSuccess,
  });

  useEffect(() => {
    setSubmittedWords([]);
    setCharStates({});
    setState(GameState.Playing);
  }, [word]);

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

    setCharStates((prev) => getCharStates(lastWord, prev));
  }, [submittedWords, tries]);

  return (
    <GameContext.Provider
      value={{
        state,
        word,
        wordLength,
        tries,
        triesLeft: word ? tries - submittedWords.length : 0,
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
        onTab={(shiftKey) =>
          shiftKey ? input.focusPreviousIndex(true) : input.focusNextIndex(true)
        }
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
