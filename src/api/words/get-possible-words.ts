type GetPossibleWordsProps = {
  wordLength: number;
};

const loadPossibleWords = async (wordLength: number): Promise<string[]> => {
  const wordFile = require(`./data/words-${wordLength}.json`);
  return Object.keys(wordFile);
};

export const getPossibleWords = async (
  props: GetPossibleWordsProps
): Promise<string[]> => {
  const { wordLength } = props;
  return loadPossibleWords(wordLength);
};
