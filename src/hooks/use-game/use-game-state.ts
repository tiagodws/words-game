import { useCallback, useEffect, useState } from 'react';
import { GameConfig } from './game-provider';
import { getCharState, getCharStates } from './get-char-state';
import {
  CharState,
  CharStates,
  GameStatus,
  SubmittedWord,
  Word,
} from './types';
import { useWord } from './use-word';

export type GameState = {
  word?: Word;
  status: GameStatus;
  triesLeft: number;
  submittedWords: SubmittedWord[];
  charStates: CharStates;
};

type UseGameState = {
  state: GameState;
  submitWord(word: Word): void;
  newGame(): void;
};

const getStatus = (submittedWords: SubmittedWord[], totalTries: number) => {
  const lastWord = submittedWords[submittedWords.length - 1];

  if (lastWord.every((char) => char.state === CharState.Correct)) {
    return GameStatus.Won;
  } else if (submittedWords.length >= totalTries) {
    return GameStatus.Lost;
  }

  return GameStatus.Playing;
};

export const useGameState = (config: GameConfig): UseGameState => {
  const { word, changeWord } = useWord(config);
  const [state, setState] = useState<GameState>({
    status: GameStatus.Loading,
    submittedWords: [],
    charStates: {},
    triesLeft: 0,
  });

  const submitWord = useCallback(
    (newWord: Word) => {
      if (!word) {
        return;
      }

      const submittedWord = newWord.map((char, i) => ({
        char,
        state: getCharState(i, newWord, word),
      }));

      setState((prev) => {
        const submittedWords = [...prev.submittedWords, submittedWord];
        const triesLeft = config.totalTries - submittedWords.length;
        const charStates = getCharStates(submittedWord, prev.charStates);
        return {
          word,
          charStates,
          submittedWords,
          triesLeft,
          status: getStatus(submittedWords, config.totalTries),
        };
      });
    },
    [word, config.totalTries]
  );

  useEffect(() => {
    if (word) {
      setState({
        word,
        status: GameStatus.Playing,
        submittedWords: [],
        charStates: {},
        triesLeft: config.totalTries,
      });
    }
  }, [word, config.totalTries]);

  return { state, submitWord, newGame: changeWord };
};
