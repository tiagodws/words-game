import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDebounce } from 'react-use';
import { Game, GameState } from '../../api/game';
import { useCreateGame } from '../../hooks/game/api/use-create-game';
import { useCurrentGame } from '../../hooks/game/api/use-current-game';
import { CharCell } from '../char-cell';
import { Link } from '../link';
import { Text } from '../text';
import { useWordData } from './use-word-data';

export const ResultModal: FC = () => {
  const { t } = useTranslation(['stats']);
  const { data: game } = useCurrentGame();
  const { mutate: createGame } = useCreateGame();
  const [modalGame, setModalGame] = useState<Game>(game);
  const { data } = useWordData(modalGame.word.stringValue);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedIsOpen, setDebouncedIsOpen] = useState(isOpen);
  const [isExited, setIsExited] = useState(true);

  useDebounce(() => setDebouncedIsOpen(isOpen), 600, [isOpen]);

  useEffect(() => {
    if (isOpen && modalGame.word !== game.word) {
      setIsOpen(false);
    }

    if (isExited) {
      setModalGame(game);
    }
  }, [isOpen, isExited, game, modalGame.word]);

  useEffect(() => {
    if ([GameState.Won, GameState.Lost].includes(modalGame.state)) {
      setIsOpen(true);
    }
  }, [modalGame.state]);

  useEffect(() => {
    if (isOpen) {
      setIsExited(false);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen && debouncedIsOpen}
      TransitionProps={{ onExited: () => setIsExited(true) }}
    >
      <DialogTitle textAlign="center">
        {modalGame.state === GameState.Won
          ? t('stats:titleWon')
          : t('stats:titleLost')}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={4}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
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
                  {modalGame.word?.chars.map((char, i) => (
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
                        state={modalGame.charStates[char.value]}
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
            <Button variant="contained" fullWidth onClick={() => createGame()}>
              {t('stats:tryAgain')}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
