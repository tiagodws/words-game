import React, { FC, useEffect } from 'react';
import { TrackingEvent, useTracking } from '../use-tracking';
import { GameContext } from './game-context';
import { KeyboardListener } from './keyboard-listener';
import { GameStatus } from './types';
import { useGameState } from './use-game-state';
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
  const { state, submitWord, newGame } = useGameState(config);
  const input = useWordInput({
    config,
    onSubmitSuccess: submitWord,
  });

  useEffect(() => {
    const { word, submittedWords } = state;
    const tries = submittedWords.length;

    if (state.status === GameStatus.Won) {
      sendEvent(TrackingEvent.GameFinished, { word, config, tries });
    }

    if (state.status === GameStatus.Lost) {
      console.log(state);
      sendEvent(TrackingEvent.GameFinished, { word, config, tries });
    }
  }, [config, state, sendEvent]);

  useEffect(() => {
    const word = state.word;

    if (state.status === GameStatus.Loading) {
      sendEvent(TrackingEvent.GameLoading, { config });
    }

    if (state.status === GameStatus.Playing) {
      sendEvent(TrackingEvent.GameStarted, { word, config });
    }
  }, [config, state.status, state.word, sendEvent]);

  return (
    <GameContext.Provider
      value={{
        state,
        config,
        input,
        newGame,
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
