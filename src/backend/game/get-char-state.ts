import { CharStates, SubmittedCharState, SubmittedWord, Word } from './types';

export const getCharState = (
  i: number,
  word: Word,
  correctWord: Word
): SubmittedCharState => {
  const char = word.chars[i];

  if (correctWord.chars[i] === char) {
    return SubmittedCharState.Correct;
  }

  const misses = correctWord.chars.reduce<number[]>((result, wordChar, i) => {
    if (wordChar === char && word.chars[i] !== wordChar) {
      return [...result, i];
    }

    return result;
  }, []);

  const tries = word.chars.reduce<number[]>((result, submittedChar, i) => {
    if (submittedChar === char && correctWord.chars[i] !== submittedChar) {
      return [...result, i];
    }
    return result;
  }, []);

  const hints = tries.slice(0, misses.length);

  if (hints.includes(i)) {
    return SubmittedCharState.Hint;
  }

  return SubmittedCharState.Incorrect;
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

  if (prevState === state || prevState === SubmittedCharState.Correct) {
    return getCharStates(submittedWord, states, i + 1);
  }

  if (!prevState || state === SubmittedCharState.Correct) {
    return getCharStates(submittedWord, { ...states, [value]: state }, i + 1);
  }

  if (
    prevState === SubmittedCharState.Hint ||
    state === SubmittedCharState.Hint
  ) {
    return getCharStates(
      submittedWord,
      { ...states, [value]: SubmittedCharState.Hint },
      i + 1
    );
  }

  return states;
};
