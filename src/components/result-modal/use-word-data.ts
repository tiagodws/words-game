import { Word } from '../../hooks/game';

type UseWordData = {
  data?: {
    phonetics: {
      text: string;
    };
    meaning: {
      category: string;
      definition: string;
    };
  };
  source?: string;
  isLoading: boolean;
};

export const useWordData = (word?: Word): UseWordData => {
  // const { data, isLoading } = useQuery(['word-definition', word], () =>
  //   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(
  //     (res) => res.json()
  //   )
  // );

  // console.log(data);

  return {
    data: {
      phonetics: {
        text: '/həˈloʊ/',
      },
      meaning: {
        category: 'noun',
        definition: '"Hello!" or an equivalent greeting.',
      },
    },
    source: 'https://en.wiktionary.org/wiki/hello',
    isLoading: false,
  };
};
