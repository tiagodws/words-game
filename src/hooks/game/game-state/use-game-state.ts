import { useContext } from 'react';
import {
  GameStateActionsContext,
  GameStateActionsContextData,
  GameStateContext,
  GameStateContextData,
} from './game-state-context';

export const useGameState = (): GameStateContextData => {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error('useGameState must be used within an GameStateProvider');
  }

  return context;
};

export const useGameStateActions = (): GameStateActionsContextData => {
  const context = useContext(GameStateActionsContext);

  if (!context) {
    throw new Error(
      'useGameStateActions must be used within an GameStateActionsProvider'
    );
  }

  return context;
};
