import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

export const theme = createTheme({
  palette,
  typography,
  shadows,
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '12px 24px',
        },
        sizeSmall: {
          padding: '4px 12px',
          borderRadius: '8px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: 'color 100ms ease',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: '2px solid #AAAAAA',
        },
        paperFullScreen: {
          border: 'none',
          boxShadow: `none`,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(51, 51, 51, 0.95)',
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
          fontWeight: 'bold',
          marginBottom: '0.5em',
        },
      },
    },
  },
});
