import { Box, Button, Divider, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Game, GameState } from '../../api/game';
import { useCreateGame } from '../../hooks/game/api/use-create-game';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { CharCell } from '../char-cell';
import { Dialog } from '../dialog';
import { GuessDistribution } from '../stats-dialog/guess-distribution';
import { StatsSummary } from '../stats-dialog/stats-summary';
import { Text } from '../text';
import { WordMeaning } from './word-meaning';

type ResultDialogProps = {
  isOpen: boolean;
};

export const ResultDialog: FC<ResultDialogProps> = (props) => {
  const { isOpen } = props;
  const { t } = useTranslation('result');
  const { data: game } = useCurrentGame();
  const { mutate: createGame } = useCreateGame();
  const [dialogGame, setDialogGame] = useState<Game>(game);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (!isVisible) {
      setDialogGame(game);
    }
  }, [isVisible, game]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(isOpen);
    }
  }, [isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      onInvisible={() => setIsVisible(false)}
      title={
        dialogGame.state === GameState.Won ? t('titleWon') : t('titleLost')
      }
    >
      <Grid
        container
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <Text textAlign="center" variant="body2">
                {t('theWordWas')}
              </Text>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {dialogGame.word?.chars.map((char, i) => (
                  <Box key={i} sx={{ mx: '2px' }}>
                    <CharCell
                      width={32}
                      value={char.displayValue}
                      state={dialogGame.charStates[char.value]}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <WordMeaning word={dialogGame.word.stringValue} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <StatsSummary />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <GuessDistribution
            highlightValue={
              game.state === GameState.Lost
                ? 'X'
                : game.submittedWords.length.toString()
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            autoFocus
            fullWidth
            onClick={() => {
              createGame();
            }}
          >
            {t('tryAgain')}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
