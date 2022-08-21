import { Container as MuiContainer, SxProps } from '@mui/material';
import { FC, ReactNode } from 'react';

type ContainerProps = {
  children?: ReactNode;
  sx?: SxProps;
};

export const Container: FC<ContainerProps> = ({ children, sx }) => {
  return (
    <MuiContainer maxWidth={'md'} sx={{ position: 'relative', ...sx }}>
      {children}
    </MuiContainer>
  );
};
