import { getCharState } from './get-char-state';
import { Char, CharValue, SubmittedWord, Word } from './types';

export const stringToWord = (value: string): Word => {
  const stringValue = value.toLocaleUpperCase();
  const charSrings = stringValue.split('');

  const chars: Char[] = charSrings.map((char) => ({
    value: char as CharValue,
    displayValue: char,
  }));

  return {
    chars,
    stringValue,
  };
};

export const wordToSubmittedWord = (
  word: Word,
  correctWord: Word
): SubmittedWord => {
  return {
    ...word,
    chars: word.chars.map((char, i) => ({
      ...char,
      state: getCharState(i, word, correctWord),
    })),
  };
};
