import '@testing-library/jest-dom';
import { getValidWord } from '../../../api/words';
import { getPossibleWords } from '../../../api/words/get-possible-words';
import { createGame } from '../create-game';
import { getCurrentGame } from '../get-current-game';
import { setCurrentGame } from '../set-current-game';
import { submitWord } from '../submit-word';
import { GameState } from '../types';

jest.mock('../../../api/words');
jest.mock('../../../api/words/get-possible-words');
jest.mock('../get-current-game');
jest.mock('../set-current-game');

const gameWord = 'WORDS';
const incorrectWord = 'HELLO';
const possibleWords = [gameWord, incorrectWord, 'WORD2', 'WORD3'];

const mockGetCurrentGame = getCurrentGame as jest.MockedFunction<
  typeof getCurrentGame
>;
const mockGetValidWord = getValidWord as jest.MockedFunction<
  typeof getValidWord
>;
const mockGetPossibleWords = getPossibleWords as jest.MockedFunction<
  typeof getPossibleWords
>;

describe('submitWord', () => {
  beforeEach(async () => {
    mockGetValidWord.mockResolvedValue(gameWord);
    mockGetPossibleWords.mockResolvedValue(possibleWords);
  });

  it("throws when there's no current game in progress", async () => {
    expect(submitWord('')).rejects.toThrow();
  });

  it.each`
    submittedWord
    ${'HI'}
    ${'BAY'}
    ${'HOLE'}
    ${'HALLOW'}
    ${'SHALLOW'}
  `(
    'throws when submitted word has incorrect length: $submittedWord',
    async ({ submittedWord }) => {
      const newGame = await createGame();
      mockGetCurrentGame.mockResolvedValueOnce(newGame);

      expect(submitWord(submittedWord)).rejects.toThrow();
    }
  );

  it.each(possibleWords.map((submittedWord) => ({ submittedWord })))(
    'does not throw when submitted word is valid: $submittedWord',
    async ({ submittedWord }) => {
      const newGame = await createGame();
      mockGetCurrentGame.mockResolvedValueOnce(newGame);

      expect(submitWord(submittedWord)).resolves.not.toThrow();
    }
  );

  it.each(
    possibleWords.map((submittedWord) => ({
      submittedWord: submittedWord.toLocaleLowerCase(),
    }))
  )('accepts lower case word: $submittedWord', async ({ submittedWord }) => {
    const newGame = await createGame();
    mockGetCurrentGame.mockResolvedValueOnce(newGame);

    const game = await submitWord(submittedWord);

    expect(
      possibleWords.includes(
        game.submittedWords[game.submittedWords.length - 1].stringValue
      )
    ).toBeTruthy();
  });

  it('returns a won game when the correct word is submitted', async () => {
    const newGame = await createGame();
    const submittedWord = newGame.word;
    mockGetCurrentGame.mockResolvedValueOnce(newGame);

    const game = await submitWord(submittedWord.stringValue);

    expect(game.state).toBe(GameState.Won);
  });

  it('returns a playing game when an incorrect word is submitted and there are more tries left', async () => {
    const newGame = await createGame();
    mockGetCurrentGame.mockResolvedValueOnce(newGame);

    const game = await submitWord(incorrectWord);

    expect(game.state).toBe(GameState.Playing);
  });

  it('returns a lost game when an incorrect word is submitted and there are no more tries left', async () => {
    const newGame = await createGame();
    newGame.config.totalTries = 1;
    mockGetCurrentGame.mockResolvedValueOnce(newGame);

    const game = await submitWord(incorrectWord);

    expect(game.state).toBe(GameState.Lost);
  });

  it.each`
    submittedWord
    ${incorrectWord}
    ${gameWord}
  `('saves the game state on success', async ({ submittedWord }) => {
    const newGame = await createGame();
    mockGetCurrentGame.mockResolvedValueOnce(newGame);

    await submitWord(submittedWord);

    expect(setCurrentGame).toHaveBeenCalledTimes(1);
  });
});
