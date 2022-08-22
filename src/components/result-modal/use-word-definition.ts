type UseWordDefinition = {
  definition?: string;
  source?: string;
  isLoading: boolean;
};

export const useWordDefinition = (word: string): UseWordDefinition => {
  // const { data, isLoading } = useQuery(['word-definition', word], () =>
  //   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(
  //     (res) => res.json()
  //   )
  // );

  // console.log(data);

  return {
    definition: 'Test',
    source: 'https://www.google.com',
    isLoading: false,
  };
};
