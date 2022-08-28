import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Word } from '../../hooks/game';

type ApiResponse = {
  word: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
      example?: string;
    }[];
  }[];
  sourceUrls: string[];
}[];

type WordData = {
  phonetics?: {
    text: string;
  };
  meaning?: {
    partOfSpeech: string;
    definition: string;
    example?: string;
  };
  source?: string;
};

type UseWordData = {
  data?: WordData;
};

const transformData = (data: ApiResponse): WordData => {
  const word = data[0];
  const phonetics = word.phonetics.find((p) => p.text);
  const meaningObj =
    word.meanings.find((m) => m.definitions.find((d) => d.example)) ||
    word.meanings[0];
  const definitionObj =
    meaningObj?.definitions.find((d) => d.example) || meaningObj.definitions[0];
  const source = word.sourceUrls[0];

  return {
    phonetics,
    meaning: {
      partOfSpeech: meaningObj.partOfSpeech,
      definition: definitionObj?.definition,
      example: definitionObj?.example,
    },
    source,
  } as WordData;
};

export const useWordData = (word?: Word): UseWordData => {
  const wordString = word?.join('');
  const { data: apiData } = useQuery(
    ['word-data', wordString],
    () =>
      fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordString}`
      ).then((res) => res.json()),
    { enabled: !!wordString }
  );
  const [data, setData] = useState<WordData>();

  useEffect(() => {
    if (apiData) {
      setData(transformData(apiData));
    }
  }, [apiData]);

  return {
    data,
  };
};
