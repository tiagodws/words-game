import { Alert, Snackbar } from '@mui/material';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { SnackOptions } from './snack';
import { SnacksContext } from './snacks-context';

type SnacksProviderProps = {
  children?: ReactNode;
};

type Snack = {
  text: string;
  variant: SnackOptions['variant'];
};

export const SnacksProvider: FC<SnacksProviderProps> = ({ children }) => {
  const [current, setCurrent] = useState<Snack>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(!!current), [current]);

  const showSnack = useCallback((text: string, options: SnackOptions) => {
    setCurrent({ text, variant: options.variant });
  }, []);

  return (
    <SnacksContext.Provider value={{ showSnack }}>
      <Snackbar
        key={current?.text}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isVisible}
        autoHideDuration={2000}
        onClose={() => setIsVisible(false)}
      >
        <Alert severity={current?.variant}>{current?.text}</Alert>
      </Snackbar>
      {children}
    </SnacksContext.Provider>
  );
};
