import { useCallback, useEffect, useState } from 'react';
import { getPossibleWords } from '../../../api/words/get-possible-words';

type UsePossibleWordsProps = {
  wordLength: number;
};

export const usePossibleWords = (props: UsePossibleWordsProps): string[] => {
  const { wordLength } = props;
  const [possibleWords, setPossibleWords] = useState<string[]>([]);

  const changePossibleWords = useCallback(async () => {
    const words = await getPossibleWords({ wordLength });
    setPossibleWords(words);
  }, [wordLength]);

  useEffect(() => {
    changePossibleWords();
  }, [wordLength, changePossibleWords]);

  return possibleWords;
};
