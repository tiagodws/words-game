import { useQuery } from '@tanstack/react-query';
import { isValidWord } from '../../../api/game';

export const useIsValidWord = (wordString: string = '') => {
  return useQuery(
    ['isValidWord', wordString],
    () => ({
      word: wordString,
      isValid: isValidWord(wordString),
    }),
    {
      enabled: !!wordString,
    }
  );
};
