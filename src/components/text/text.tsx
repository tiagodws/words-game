import { Typography } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import { forwardRef } from 'react';

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
  textAlign?: CSSProperties['textAlign'];
};

export const Text = forwardRef<HTMLSpanElement | null, TextProps>(
  ({ children, ...props }, ref) => {
    return (
      <Typography
        ref={ref}
        {...props}
        sx={{ textShadow: '1px 1px 2px #33333399' }}
      >
        {children}
      </Typography>
    );
  }
);
