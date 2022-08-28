import { Box } from '@mui/material';
import { FC } from 'react';
import { CharCell, CharCellProps } from '../char-cell';

export const BoardCell: FC<CharCellProps & { cellSize: number }> = ({
  cellSize,
  ...props
}) => (
  <Box sx={{ m: `${cellSize * 0.05}px` }}>
    <CharCell {...props} />
  </Box>
);
