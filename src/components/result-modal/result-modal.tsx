import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { GameState, useGame, Word } from '../../hooks/game';
import { CharCell } from '../char-cell';
import { Link } from '../link';
import { Text } from '../text';
import { useWordData } from './use-word-data';

type ModalData = {
  word?: Word;
  state: GameState;
};

export const ResultModal: FC = () => {
  const { t } = useTranslation(['stats']);
  const { state, word, charStates, reset } = useGame();
  const [modalData, setModalData] = useState<ModalData>({ word, state });
  const [isOpen, setIsOpen] = useState(state !== GameState.Playing);
  const [isExited, setIsExited] = useState(true);
  const { data, source } = useWordData(word);

  useEffect(() => {
    if (isOpen && modalData.word !== word) {
      setIsOpen(false);
    }

    if (isExited) {
      setModalData({ word, state });
    }
  }, [isOpen, isExited, state, word, modalData.word]);

  useEffect(() => {
    if (modalData.state !== GameState.Playing) {
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
        {modalData.state === GameState.Won
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
            <Text textAlign="center">
              {data ? (
                t('stats:wordDefinition', {
                  definition: data.meaning.definition,
                })
              ) : (
                <Skeleton />
              )}
            </Text>

            <Text
              textAlign="center"
              variant="caption"
              color="secondary"
              fontSize="0.5rem"
            >
              {source ? (
                <Trans
                  i18nKey="stats:wordDefinitionSource"
                  values={{ source }}
                  components={[<Link href={source} />]}
                />
              ) : (
                <Skeleton />
              )}
            </Text>
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
