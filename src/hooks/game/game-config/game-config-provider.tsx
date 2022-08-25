import React, { FC } from 'react';
import {
  GameConfigContext,
  GameConfigContextData,
} from './game-config-context';

export type GameConfigProviderProps = {
  config: GameConfigContextData;
  children?: React.ReactNode;
};

export const GameConfigProvider: FC<GameConfigProviderProps> = (props) => {
  const { config, children } = props;
  return (
    <GameConfigContext.Provider value={config}>
      {children}
    </GameConfigContext.Provider>
  );
};
