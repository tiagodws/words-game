import React, { FC, useCallback, useEffect, useState } from 'react';
import { TrackingEvent, useTracking } from '../use-tracking';
import { GameContext } from './game-context';
import { GameState, getGameState } from './game-state';
import { getCharState } from './get-char-state';
import { KeyboardListener } from './keyboard-listener';
import { GameStatus, Word } from './types';
import { useWord } from './use-word';
import { useWordInput } from './use-word-input';

export type GameConfig = {
  wordLength: number;
  totalTries: number;
};

export type GameProviderProps = {
  config: GameConfig;
  children?: React.ReactNode;
};

export const GameProvider: FC<GameProviderProps> = (props) => {
  const { config, children } = props;
  const { sendEvent } = useTracking();
  const { word, changeWord: reset } = useWord({
    wordLength: config.wordLength,
  });
  const [state, setState] = useState<GameState>(getGameState(config, word));

  const onSubmitSuccess = useCallback(
    (newWord: Word) => {
      if (!word) {
        return;
      }

      const submittedWord = newWord.map((char, i) => ({
        char,
        state: getCharState(i, newWord, word),
      }));

      setState((prev) =>
        getGameState(config, word, {
          ...prev,
          submittedWords: [...prev.submittedWords, submittedWord],
        })
      );
    },
    [word, config]
  );

  const input = useWordInput({
    config,
    onSubmitSuccess,
  });

  useEffect(() => {
    setState(getGameState(config, word));
  }, [word, config]);

  useEffect(() => {
    const tries = state.submittedWords.length;

    if (state.status === GameStatus.Won) {
      sendEvent(TrackingEvent.GameFinished, { word, config, tries });
    }

    if (state.status === GameStatus.Lost) {
      console.log(state);
      sendEvent(TrackingEvent.GameFinished, { word, config, tries });
    }
  }, [word, state.status, state.submittedWords, config, sendEvent]);

  useEffect(() => {
    if (state.status === GameStatus.Loading) {
      sendEvent(TrackingEvent.GameLoading, { config });
    }

    if (state.status === GameStatus.Playing) {
      sendEvent(TrackingEvent.GameStarted, { word, config });
    }
  }, [word, config, state.status, sendEvent]);

  return (
    <GameContext.Provider
      value={{
        word,
        state,
        config,
        input,
        reset,
      }}
    >
      <KeyboardListener
        isEnabled={state.status === GameStatus.Playing}
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
