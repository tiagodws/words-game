import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitWord } from '../../../api/game';

export const useSubmitWord = () => {
  const queryClient = useQueryClient();

  return useMutation(['submitWord'], submitWord, {
    onSuccess: (game) => {
      queryClient.setQueryData(['game'], game);
      queryClient.invalidateQueries(['stats']);
    },
    networkMode: 'always',
  });
};
