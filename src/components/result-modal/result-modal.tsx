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
import { GameStatus, useGame, Word } from '../../hooks/use-game';
import { CharCell } from '../char-cell';
import { Link } from '../link';
import { Text } from '../text';
import { useWordData } from './use-word-data';

type ModalData = {
  word?: Word;
  state: GameStatus;
};

export const ResultModal: FC = () => {
  const { t } = useTranslation(['stats']);
  const { state, word, charStates, reset } = useGame();
  const [modalData, setModalData] = useState<ModalData>({ word, state });
  const [isOpen, setIsOpen] = useState(state !== GameStatus.Playing);
  const [isExited, setIsExited] = useState(true);
  const { data } = useWordData(word);

  useEffect(() => {
    if (isOpen && modalData.word !== word) {
      setIsOpen(false);
    }

    if (isExited) {
      setModalData({ word, state });
    }
  }, [isOpen, isExited, state, word, modalData.word]);

  useEffect(() => {
    if (modalData.state !== GameStatus.Playing) {
      setIsOpen(true);
    }
  }, [modalData.state]);

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
        {modalData.state === GameStatus.Won
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
                  {modalData.word?.map((char, i) => (
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
                        state={charStates[char]}
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
            <Button variant="contained" fullWidth onClick={reset}>
              {t('stats:tryAgain')}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
