import { CharState, CharStates, SubmittedWord, Word } from './types';

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

export const getCharStates = (
  submittedWord: SubmittedWord,
  states: CharStates,
  i = 0
): CharStates => {
  if (i >= submittedWord.length) {
    return states;
  }

  const { char, state } = submittedWord[i];
  const prevState = states[char];

  if (prevState === state || prevState === CharState.Correct) {
    return getCharStates(submittedWord, states, i + 1);
  }

  if (!prevState || state === CharState.Correct) {
    return getCharStates(submittedWord, { ...states, [char]: state }, i + 1);
  }

  if (prevState === CharState.Hint || state === CharState.Hint) {
    return getCharStates(
      submittedWord,
      { ...states, [char]: CharState.Hint },
      i + 1
    );
  }

  return states;
};
