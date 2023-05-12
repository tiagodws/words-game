import { useQuery } from '@tanstack/react-query';
import { Game, GameState, getCurrentGame } from '../../../api/game';

const initialData: Game = {
  word: { chars: [], stringValue: '' },
  submittedWords: [],
  state: GameState.Playing,
  charStates: {},
  config: { totalTries: 6, wordLength: 5 },
};

export const useCurrentGame = () => {
  return useQuery(['game'], getCurrentGame, {
    initialData,
    networkMode: 'always',
  });
};
