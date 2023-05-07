import { WordInputValue } from './game-input-context';

export const getNextIndex = (
  currentIndex: number,
  values: WordInputValue[],
  loop?: boolean
): number => {
  const focusFirst = loop && currentIndex >= values.length - 1;
  const nextPos = Math.min(values.length - 1, currentIndex + 1);
  const newPos = focusFirst ? 0 : nextPos;
  return newPos;
};

export const getEmptyIndex = (
  currentIndex: number,
  values: WordInputValue[]
): number | undefined => {
  const emptyIndexes = values.reduce<{ first?: number; next?: number }>(
    (result, char, i) => {
      if (result.first !== undefined && result.next !== undefined) {
        return result;
      }

      const newResult = { ...result };

      if (!char && newResult.next === undefined && i > currentIndex) {
        newResult.next = i;
      }

      if (!char && newResult.first === undefined) {
        newResult.first = i;
      }

      return newResult;
    },
    {}
  );

  if (emptyIndexes.next !== undefined) {
    return emptyIndexes.next;
  }

  if (emptyIndexes.first !== undefined) {
    return emptyIndexes.first;
  }

  if (currentIndex === values.length - 1) {
    return;
  }

  return currentIndex + 1;
};

export const getPreviousIndex = (
  currentIndex: number,
  values: WordInputValue[],
  loop?: boolean
): number => {
  const focusLast = loop && currentIndex === 0;
  const previousPos = Math.max(0, currentIndex - 1);
  const newPos = focusLast ? values.length - 1 : previousPos;
  return newPos;
};
