import { useContext } from 'react';
import {
  GameConfigContext,
  GameConfigContextData,
} from './game-config-context';

export const useGameConfig = (): GameConfigContextData => {
  const context = useContext(GameConfigContext);

  if (!context) {
    throw new Error('useGameConfig must be used within an GameConfigProvider');
  }

  return context;
};
