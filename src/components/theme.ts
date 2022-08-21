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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& textarea': {
            resize: 'vertical',
          },
        },
      },
      defaultProps: {
        minRows: 5,
        maxRows: 5,
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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
          lineHeight: '32px',
          '*+&': {
            marginTop: '16px',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1rem',
          fontWeight: 500,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          legend: {
            overflow: 'hidden',
          },
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          '&:before': {
            height: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          border: 'none',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 200,
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
    },
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#dddddd',
    },
    success: {
      main: '#43aa8b',
    },
    error: {
      main: '#EA1313',
    },
    warning: {
      main: '#f9c74f',
    },
    info: {
      main: '#277da1',
    },
    background: {
      default: '#767676',
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
