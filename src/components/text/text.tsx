import { Typography } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import { FC } from 'react';

type TextProps = {
  children: React.ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption';
  color?: string;
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
};

export const Text: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Typography {...props} sx={{ textShadow: '0px 0px 2px #33333355' }}>
      {children}
    </Typography>
  );
};
