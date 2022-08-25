import React from 'react';

export type GameConfigContextData = {
  wordLength: number;
  totalTries: number;
};

export const GameConfigContext = React.createContext<GameConfigContextData>({
  wordLength: 0,
  totalTries: 0,
});
