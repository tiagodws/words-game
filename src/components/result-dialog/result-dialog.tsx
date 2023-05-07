import { Box, Button, Chip, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Game, GameState } from '../../api/game';
import { useCreateGame } from '../../hooks/game/api/use-create-game';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { CharCell } from '../char-cell';
import { Dialog } from '../dialog';
import { Link } from '../link';
import { Text } from '../text';
import { useWordData } from './use-word-data';

type ResultDialogProps = {
  isOpen: boolean;
};

export const ResultDialog: FC<ResultDialogProps> = (props) => {
  const { isOpen } = props;
  const { t } = useTranslation(['stats']);
  const { data: game } = useCurrentGame();
  const { mutate: createGame } = useCreateGame();
  const [dialogGame, setDialogGame] = useState<Game>(game);
  const { data } = useWordData(dialogGame.word.stringValue);
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
        dialogGame.state === GameState.Won
          ? t('stats:titleWon')
          : t('stats:titleLost')
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
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{ flexWrap: 'nowrap' }}
          >
            <Grid item>
              <Text textAlign="center">{t('stats:theWordWas')}</Text>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {dialogGame.word?.chars.map((char, i) => (
                  <Box
                    key={i}
                    sx={{
                      mx: '2px',
                      height: 36,
                      width: 36,
                    }}
                  >
                    <CharCell
                      value={char.displayValue}
                      state={dialogGame.charStates[char.value]}
                      fontSize={16}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {data?.meaning && (
            <Text textAlign="center" component="div">
              {data?.meaning?.partOfSpeech && (
                <Chip
                  label={data?.meaning?.partOfSpeech}
                  size="small"
                  sx={{ mr: 1 }}
                />
              )}

              {t('stats:wordDefinition', {
                definition: data.meaning?.definition,
              })}
            </Text>
          )}

          {data?.source && (
            <Box sx={{ mt: 1 }}>
              <Text
                textAlign="center"
                variant="caption"
                color="secondary"
                fontSize="0.5rem"
              >
                <Trans
                  i18nKey="stats:wordDefinitionSource"
                  values={{ source: data.source }}
                  components={[<Link href={data?.source} target="_blank" />]}
                />
              </Text>
            </Box>
          )}
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
            {t('stats:tryAgain')}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
