import { getPossibleWords } from '../../api/words/get-possible-words';
import { WORD_LENGTH } from './consts';
import { getCharStates } from './get-char-state';
import { getCurrentGame } from './get-current-game';
import { setCurrentGame } from './set-current-game';
import { Game, GameState, Word } from './types';
import { stringToWord, wordToSubmittedWord } from './word-utils';

export const submitWord = async (wordString: string): Promise<Game> => {
  const game = await getCurrentGame();

  if (game?.state !== GameState.Playing) {
    throw Error('No game currently in progress');
  }

  const word = stringToWord(wordString);
  await validateWord(word);

  const submittedWord = wordToSubmittedWord(word, game.word);
  const submittedWords = [...game.submittedWords, submittedWord];
  const submittedWordString = submittedWord.chars
    .map(({ value }) => value)
    .join('');
  const gameWordString = game.word.chars.map(({ value }) => value).join('');
  const isEndOfGame = game.config.totalTries === submittedWords.length;
  const hasWon = submittedWordString === gameWordString;
  const hasLost = !hasWon && isEndOfGame;
  const charStates = getCharStates(submittedWord, game.charStates);

  const updatedGame = {
    config: game.config,
    word: game.word,
    submittedWords,
    charStates,
    state: getState(hasWon, hasLost),
  };

  await setCurrentGame(updatedGame);

  return updatedGame;
};

const validateWord = async (word: Word): Promise<void> => {
  const possibleWords = await getPossibleWords({ wordLength: WORD_LENGTH });
  const hasValidLength = word.stringValue.length === WORD_LENGTH;
  const isPossibleWord = possibleWords.some(
    (possibleWord) => possibleWord === word.stringValue
  );
  const isValidWord = hasValidLength && isPossibleWord;

  if (!isValidWord) {
    throw new Error('Invalid word');
  }
};

const getState = (hasWon: boolean, hasLost: boolean): GameState => {
  if (hasWon) return GameState.Won;
  if (hasLost) return GameState.Lost;
  return GameState.Playing;
};
