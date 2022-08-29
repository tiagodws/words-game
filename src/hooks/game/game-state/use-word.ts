import { useCallback, useEffect, useState } from 'react';
import { getValidWord } from '../../../api/words';
import { Word } from '../types';

type UseWordProps = {
  wordLength: number;
};

type UseWord = {
  word?: Word;
  changeWord(): void;
};

export const getWord = async (wordLength: number) => {
  const wordString = await getValidWord({ wordLength });
  return wordString.split('') as Word;
};

export const useWord = (props: UseWordProps): UseWord => {
  const { wordLength } = props;
  const [word, setWord] = useState<Word>();

  const changeWord = useCallback(async () => {
    const newWord = await getWord(wordLength);
    setWord(newWord);
  }, [wordLength]);

  useEffect(() => {
    changeWord();
  }, [wordLength, changeWord]);

  return { word, changeWord };
};
