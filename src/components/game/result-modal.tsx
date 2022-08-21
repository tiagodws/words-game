import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { GameState, useGame } from '../../hooks/game';
import { Text } from '../text';

export const ResultModal: FC = () => {
  const { state, word, reset } = useGame();
  const [isModalOpen, setIsModalOpen] = useState(state !== GameState.Playing);

  useEffect(() => {
    setIsModalOpen(state !== GameState.Playing);
  }, [state]);

  return isModalOpen ? (
    <Dialog open>
      <DialogTitle textAlign="center">
        {state === GameState.Won ? 'Parabéns!' : 'Errooooou!'}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item xs={12}>
            <Text textAlign="center">A palavra era:</Text>
            <Text textAlign="center" fontWeight="bold" fontSize="1.5rem">
              {word.join('')}
            </Text>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={reset}>
              Tentar novamente
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  ) : null;
};
