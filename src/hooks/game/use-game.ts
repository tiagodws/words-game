import { useContext } from 'react';
import { GameContext, GameContextData } from './game-context';

export const useGame = (): GameContextData => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within an GameProvider');
  }

  return context;
};
