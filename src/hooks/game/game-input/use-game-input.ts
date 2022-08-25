import { useContext } from 'react';
import {
  GameInputActionsContext,
  GameInputActionsContextData,
  GameInputContext,
  GameInputContextData,
} from './game-input-context';

export const useGameInput = (): GameInputContextData => {
  const context = useContext(GameInputContext);

  if (!context) {
    throw new Error('useGameInput must be used within an GameInputProvider');
  }

  return context;
};

export const useGameInputActions = (): GameInputActionsContextData => {
  const context = useContext(GameInputActionsContext);

  if (!context) {
    throw new Error(
      'useGameInputActions must be used within an GameInputActionsProvider'
    );
  }

  return context;
};
