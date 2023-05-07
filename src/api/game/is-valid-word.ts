import { getPossibleWords } from '../words/get-possible-words';
import { WORD_LENGTH } from './consts';

export const isValidWord = async (wordString: string): Promise<boolean> => {
  const possibleWords = await getPossibleWords({ wordLength: WORD_LENGTH });
  const hasValidLength = wordString.length === WORD_LENGTH;
  const isPossibleWord = possibleWords.some(
    (possibleWord) => possibleWord === wordString
  );
  return hasValidLength && isPossibleWord;
};
