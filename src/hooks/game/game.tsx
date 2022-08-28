import { FC, ReactNode } from 'react';
import { GameConfigProvider } from './game-config';
import { GameInputProvider } from './game-input';
import { GameStateProvider } from './game-state';
import { GameTracking } from './game-tracking';
import { KeyboardListener } from './keyboard-listener';

type GameProps = {
  children?: ReactNode;
};

export const Game: FC<GameProps> = (props) => {
  const { children } = props;

  return (
    <GameConfigProvider config={{ wordLength: 5, totalTries: 6 }}>
      <GameStateProvider>
        <GameInputProvider>
          <KeyboardListener />
          <GameTracking />
          {children}
        </GameInputProvider>
      </GameStateProvider>
    </GameConfigProvider>
  );
};
