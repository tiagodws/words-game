import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGame } from '../../../api/game';

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation(['createGame'], createGame, {
    onSuccess: (game) => {
      queryClient.setQueryData(['game'], game);
    },
  });
};
