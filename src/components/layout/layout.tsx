import { Box } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Header } from './header';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current?.scrollTo) {
      ref.current.scrollTo(0, 0);
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: (theme) => theme.palette.background.default,
        }}
        ref={ref}
      >
        <Header />

        <Box component={'main'} sx={{ flex: 1, overflow: 'hidden' }}>
          {children}
        </Box>
      </Box>
    </>
  );
};
