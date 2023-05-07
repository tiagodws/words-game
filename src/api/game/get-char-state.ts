import { CharState, CharStates, SubmittedWord, Word } from './types';

export const getCharState = (
  i: number,
  word: Word,
  correctWord: Word
): CharState => {
  const char = word.chars[i];

  if (correctWord.chars[i].value === char.value) {
    return CharState.Correct;
  }

  const misses = correctWord.chars.reduce<number[]>((result, wordChar, i) => {
    if (
      wordChar.value === char.value &&
      word.chars[i].value !== wordChar.value
    ) {
      return [...result, i];
    }

    return result;
  }, []);

  const tries = word.chars.reduce<number[]>((result, submittedChar, i) => {
    if (
      submittedChar.value === char.value &&
      correctWord.chars[i].value !== submittedChar.value
    ) {
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

export const getCharStates = (
  submittedWord: SubmittedWord,
  states: CharStates,
  i = 0
): CharStates => {
  if (i >= submittedWord.chars.length) {
    return states;
  }

  const { value, state } = submittedWord.chars[i];
  const prevState = states[value];

  if (prevState === state || prevState === CharState.Correct) {
    return getCharStates(submittedWord, states, i + 1);
  }

  if (!prevState || state === CharState.Correct) {
    return getCharStates(submittedWord, { ...states, [value]: state }, i + 1);
  }

  if (prevState === CharState.Hint || state === CharState.Hint) {
    return getCharStates(
      submittedWord,
      { ...states, [value]: CharState.Hint },
      i + 1
    );
  }

  return states;
};
