import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './components/theme';
import { Main } from './pages';

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
