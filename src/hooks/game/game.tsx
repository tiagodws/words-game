import { FC, ReactNode } from 'react';
import { GameInputProvider } from './game-input';
import { KeyboardListener } from './keyboard-listener';

type GameProps = {
  children?: ReactNode;
};

export const Game: FC<GameProps> = (props) => {
  const { children } = props;

  return (
    <GameInputProvider>
      <KeyboardListener />
      {children}
    </GameInputProvider>
  );
};
