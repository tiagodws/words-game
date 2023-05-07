import CloseIcon from '@mui/icons-material/Close';
import {
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Dialog as MuiDialog,
} from '@mui/material';
import { FC, ReactNode } from 'react';

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
    >
      {!!title && (
        <DialogTitle>
          <Grid
            container
            spacing={1}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <Grid
              item
              sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}
            >
              {title}
            </Grid>

            {onClose && (
              <Grid item>
                <IconButton color="secondary" onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </DialogTitle>
      )}

      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};
