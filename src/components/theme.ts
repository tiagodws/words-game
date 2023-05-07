import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
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
    MuiTypography: {
      styleOverrides: {
        root: {
          whiteSpace: 'pre-wrap',
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
          boxShadow: `3px 3px #333333`,
          borderRadius: '8px',
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
  palette: {
    text: {
      primary: '#F5F5F5',
      secondary: '#CCCCCC',
      disabled: '#CCCCCC88',
    },
    primary: {
      main: '#25557e',
    },
    secondary: {
      main: '#dddddd',
    },
    success: {
      main: '#43aa8b',
    },
    warning: {
      main: '#f4a261',
    },
    info: {
      main: '#25557e',
    },
    background: {
      default: '#767676',
      paper: '#767676',
    },
    common: {
      black: '#333333',
      white: '#F5F5F5',
    },
    divider: '#F5F5F5',
  },
  typography: {
    fontFamily: 'Azeret Mono',
    fontWeightRegular: 400,
    fontWeightBold: 600,
    h1: {
      fontSize: '4rem',
      fontWeight: 'normal',
    },
    h2: {
      fontSize: '2.4rem',
      fontWeight: 'normal',
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
  },
});
