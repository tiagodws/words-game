import React, { FC, useCallback, useEffect, useState } from 'react';
import { TrackingEvent, useTracking } from '../use-tracking';
import { GameContext } from './game-context';
import { getCharState, getCharStates } from './get-char-state';
import { KeyboardListener } from './keyboard-listener';
import {
  CharState,
  CharStates,
  GameStatus,
  SubmittedWord,
  Word,
} from './types';
import { useWord } from './use-word';
import { useWordInput } from './use-word-input';

export type GameProviderProps = {
  wordLength: number;
  totalTries: number;
  children?: React.ReactNode;
};

export const GameProvider: FC<GameProviderProps> = (props) => {
  const { wordLength, totalTries, children } = props;
  const { word, changeWord: reset } = useWord({ wordLength });
  const [submittedWords, setSubmittedWords] = useState<SubmittedWord[]>([]);
  const [charStates, setCharStates] = useState({} as CharStates);
  const [state, setState] = useState(GameStatus.Playing);
  const { sendEvent } = useTracking();

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

  const sendFinishedEvent = useCallback(
    (isWin: boolean) => {
      sendEvent(TrackingEvent.GameFinished, {
        isWin,
        word,
        wordLength,
        totalTries,
        tries: submittedWords.length,
      });
    },
    [submittedWords, word, wordLength, totalTries, sendEvent]
  );

  useEffect(() => {
    setSubmittedWords([]);
    setCharStates({});
    setState(GameStatus.Playing);

    if (word) {
      sendEvent(TrackingEvent.GameStarted, { word });
    }
  }, [word, sendEvent]);

  useEffect(() => {
    if (!submittedWords.length) {
      return;
    }

    const lastWord = submittedWords[submittedWords.length - 1];

    if (lastWord.every((char) => char.state === CharState.Correct)) {
      setState(GameStatus.Won);
    } else if (submittedWords.length >= totalTries) {
      setState(GameStatus.Lost);
    }

    setCharStates((prev) => getCharStates(lastWord, prev));
  }, [submittedWords, totalTries, sendFinishedEvent]);

  return (
    <GameContext.Provider
      value={{
        state,
        word,
        wordLength,
        totalTries: totalTries,
        triesLeft: word ? totalTries - submittedWords.length : 0,
        submittedWords,
        charStates,
        input,
        reset,
      }}
    >
      <KeyboardListener
        isEnabled={state === GameStatus.Playing}
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
