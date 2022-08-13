import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
