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
import { useTranslation } from 'react-i18next';
import { GameState, useGame, Word } from '../../hooks/game';
import { CharCell } from '../char-cell';
import { Text } from '../text';
import { useWordDefinition } from './use-word-definition';

type ModalData = {
  word: Word;
  state: GameState;
};

export const ResultModal: FC = () => {
  const { t } = useTranslation(['stats']);
  const { state, word, charStates, reset } = useGame();
  const [modalData, setModalData] = useState<ModalData>({ word, state });
  const [isOpen, setIsOpen] = useState(state !== GameState.Playing);
  const [isExited, setIsExited] = useState(true);
  const { definition, source } = useWordDefinition(word.join(''));

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
                  {modalData.word.map((char, i) => (
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

              <Grid item>
                <Text textAlign="center">
                  {definition ? (
                    t('stats:wordDefinition', { definition })
                  ) : (
                    <Skeleton />
                  )}
                </Text>
              </Grid>
            </Grid>
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
