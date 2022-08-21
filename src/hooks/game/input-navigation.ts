import { WordInputValue } from './use-word-input';

export const getNextIndex = (
  currentIndex: number,
  values: WordInputValue[],
  loop?: boolean
) => {
  const focusFirst = loop && currentIndex >= values.length - 1;
  const nextPos = Math.min(values.length - 1, currentIndex + 1);
  const newPos = focusFirst ? 0 : nextPos;
  return newPos;
};

export const getEmptyIndex = (
  currentIndex: number,
  values: WordInputValue[]
) => {
  const emptyIndexes = values.reduce<{ first?: number; next?: number }>(
    (result, char, i) => {
      if (result.first !== undefined && result.next !== undefined) {
        return result;
      }

      const newResult = { ...result };

      if (
        !char &&
        newResult.next === undefined &&
        (i > currentIndex || i === values.length - 1)
      ) {
        newResult.next = i;
      }

      if (!char && newResult.first === undefined) {
        newResult.first = i;
      }

      return newResult;
    },
    {}
  );

  const newPos = emptyIndexes.next ?? emptyIndexes.first ?? values.length;
  return newPos;
};

export const getPreviousIndex = (
  currentIndex: number,
  values: WordInputValue[],
  loop?: boolean
) => {
  const focusLast = loop && currentIndex === 0;
  const previousPos = Math.max(0, currentIndex - 1);
  const newPos = focusLast ? values.length - 1 : previousPos;
  return newPos;
};
