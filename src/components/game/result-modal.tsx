import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameState, useGame } from '../../hooks/game';
import { CharCell } from '../char-cell';
import { Text } from '../text';

export const ResultModal: FC = () => {
  const { t } = useTranslation(['stats']);
  const { state, word, charStates, reset } = useGame();
  const [isModalOpen, setIsModalOpen] = useState(state !== GameState.Playing);

  useEffect(() => {
    setIsModalOpen(state !== GameState.Playing);
  }, [state]);

  return isModalOpen ? (
    <Dialog open>
      <DialogTitle textAlign="center">
        {state === GameState.Won ? t('stats:titleWon') : t('stats:titleLost')}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={4}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item xs={12}>
            <Text textAlign="center">{t('stats:theWordWas')}</Text>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 1,
              }}
            >
              {word.map((char, i) => (
                <Box
                  key={i}
                  sx={{
                    mx: '2px',
                    height: 36,
                    width: 36,
                  }}
                >
                  <CharCell
                    state={charStates[char]}
                    char={char}
                    fontSize={16}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={reset}>
              {t('stats:tryAgain')}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  ) : null;
};
