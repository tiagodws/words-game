import { useContext } from 'react';
import { SnacksContext, SnacksContextValue } from './snacks-context';

export const useSnacks = (): SnacksContextValue => {
  const context = useContext(SnacksContext);

  if (!context) {
    throw new Error('useSnacks must be used within an SnacksProvider');
  }

  return context;
};
