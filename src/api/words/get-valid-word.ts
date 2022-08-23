import { getRandomArrayItem } from '../../utils/get-random-array-item';

type GetValidWordProps = {
  wordLength: number;
};

const loadValidWords = async (wordLength: number): Promise<string[]> => {
  const wordFile = require(`./data/words-${wordLength}.json`);
  return Object.keys(wordFile).filter((word) => !!wordFile[word]);
};

export const getValidWord = async (
  props: GetValidWordProps
): Promise<string> => {
  const { wordLength } = props;
  const validWords = await loadValidWords(wordLength);
  return getRandomArrayItem(validWords);
};
