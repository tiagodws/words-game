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
import { GameStatus } from '../../hooks/game';
import { useGameState, useGameStateActions } from '../../hooks/game/game-state';
import { GameStateContextData } from '../../hooks/game/game-state/game-state-context';
import { CharCell } from '../char-cell';
import { Link } from '../link';
import { Text } from '../text';
import { useWordData } from './use-word-data';

export const ResultModal: FC = () => {
  const { t } = useTranslation(['stats']);
  const state = useGameState();
  const actions = useGameStateActions();
  const [modalState, setModalState] = useState<GameStateContextData>(state);
  const { data } = useWordData(modalState.word);
  const [isOpen, setIsOpen] = useState(false);
  const [isExited, setIsExited] = useState(true);

  useEffect(() => {
    if (isOpen && modalState.word !== state.word) {
      setIsOpen(false);
    }

    if (isExited) {
      setModalState(state);
    }
  }, [isOpen, isExited, state, modalState.word]);

  useEffect(() => {
    if ([GameStatus.Won, GameStatus.Lost].includes(modalState.status)) {
      setIsOpen(true);
    }
  }, [modalState.status]);

  useEffect(() => {
    if (isOpen) {
      setIsExited(false);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      TransitionProps={{ onExited: () => setIsExited(true) }}
    >
      <DialogTitle textAlign="center">
        {modalState.status === GameStatus.Won
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
                  {modalState.word?.map((char, i) => (
                    <Box
                      key={i}
                      sx={{
                        mx: '2px',
                        height: 36,
                        width: 36,
                      }}
                    >
                      <CharCell
                        char={char}
                        state={modalState.charStates[char]}
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
            <Button variant="contained" fullWidth onClick={actions.restart}>
              {t('stats:tryAgain')}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
