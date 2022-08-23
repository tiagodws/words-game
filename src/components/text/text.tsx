import { Typography } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import { forwardRef } from 'react';

type TextProps = {
  children?: React.ReactNode;
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
  component?: 'div' | 'span' | 'p';
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  textAlign?: CSSProperties['textAlign'];
};

export const Text = forwardRef<HTMLSpanElement | null, TextProps>(
  ({ children, component = 'p', ...props }, ref) => {
    return (
      <Typography
        ref={ref}
        sx={{ textShadow: '1px 1px 2px #33333399' }}
        component={component}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
