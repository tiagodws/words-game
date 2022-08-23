import { createContext } from 'react';
import { SnackOptions } from './snack';

export type SnacksContextValue = {
  showSnack(text: string, options?: SnackOptions): void;
};

export const SnacksContext = createContext<SnacksContextValue>({
  showSnack: () => null,
});
