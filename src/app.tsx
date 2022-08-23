import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './components/theme';
import { SnacksProvider } from './hooks/use-snacks';
import { Main } from './pages';
import { queryClient } from './react-query';

export const App: FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <SnacksProvider>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </SnacksProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
