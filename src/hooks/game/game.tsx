import { FC, ReactNode } from 'react';
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
    <GameStateProvider>
      <GameInputProvider>
        <KeyboardListener />
        <GameTracking />
        {children}
      </GameInputProvider>
    </GameStateProvider>
  );
};
