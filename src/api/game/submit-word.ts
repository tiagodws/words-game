import { updateStats } from '../stats/update-stats';
import { InvalidGameError, InvalidWordError } from './errors';
import { getCharStates } from './get-char-state';
import { getCurrentGame } from './get-current-game';
import { isValidWord } from './is-valid-word';
import { setCurrentGame } from './set-current-game';
import { Game, GameState } from './types';
import { stringToWord, wordToSubmittedWord } from './word-utils';

export const submitWord = async (wordString: string): Promise<Game> => {
  const game = await getCurrentGame();

  if (game?.state !== GameState.Playing) {
    throw new InvalidGameError('No game currently in progress');
  }

  if (!isValidWord(wordString)) {
    throw new InvalidWordError('Invalid word');
  }

  const word = stringToWord(wordString);
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
  await updateStats(updatedGame);

  return updatedGame;
};

const getState = (hasWon: boolean, hasLost: boolean): GameState => {
  if (hasWon) return GameState.Won;
  if (hasLost) return GameState.Lost;
  return GameState.Playing;
};
