import { Container as MuiContainer } from '@mui/material';
import { FC, ReactNode } from 'react';

type ContainerProps = {
  children?: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <MuiContainer maxWidth={'xl'} sx={{ position: 'relative' }}>
      {children}
    </MuiContainer>
  );
};
