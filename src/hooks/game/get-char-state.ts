import { CharState, Word } from './types';

export const getCharState = (
  i: number,
  word: Word,
  correctWord: Word
): CharState => {
  const char = word[i];

  if (correctWord[i] === char) {
    return CharState.Correct;
  }

  const misses = correctWord.reduce<number[]>((result, wordChar, i) => {
    if (wordChar === char && word[i] !== wordChar) {
      return [...result, i];
    }

    return result;
  }, []);

  const tries = word.reduce<number[]>((result, submittedChar, i) => {
    if (submittedChar === char && correctWord[i] !== submittedChar) {
      return [...result, i];
    }
    return result;
  }, []);

  const hints = tries.slice(0, misses.length);

  if (hints.includes(i)) {
    return CharState.Hint;
  }

  return CharState.Incorrect;
};
