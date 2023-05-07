import CloseIcon from '@mui/icons-material/Close';
import {
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Dialog as MuiDialog,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { Text } from '../text';

type DialogProps = {
  title?: string;
  isOpen?: boolean;
  children?: ReactNode;
  onClose?: () => void;
  onInvisible?: () => void;
};

export const Dialog: FC<DialogProps> = (props) => {
  const { title, isOpen = false, children, onClose, onInvisible } = props;

  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      TransitionProps={{ onExited: onInvisible }}
      PaperProps={{ sx: { p: 1 } }}
    >
      {!!title && (
        <DialogTitle>
          <Grid
            container
            spacing={1}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
            }}
          >
            <Grid item xs={1}></Grid>

            <Grid
              item
              xs={10}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Text variant="h3">{title}</Text>
            </Grid>

            <Grid item xs={1}>
              {onClose && (
                <IconButton color="secondary" onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};
