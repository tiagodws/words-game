import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Dialog as MuiDialog,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      TransitionProps={{ onExited: onInvisible }}
      fullScreen={fullScreen}
      PaperProps={{ elevation: 8 }}
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
              px: 2,
            }}
          >
            <Grid item xs={1}></Grid>

            <Grid
              item
              xs={10}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {title}
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

      <DialogContent sx={{ padding: 0 }}>
        <Box
          sx={{
            px: 3,
            py: 3,
            display: 'flex',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          {children}
        </Box>
      </DialogContent>
    </MuiDialog>
  );
};
