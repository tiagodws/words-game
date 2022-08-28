import { Box } from '@mui/material';
import { FC } from 'react';
import { KeyboardKey, KeyboardKeyProps } from './keyboard-key';

export type KeyboardCellProps = {
  size: number;
  cellWidth: number;
  cellHeight: number;
} & KeyboardKeyProps;

export const KeyboardCell: FC<KeyboardCellProps> = ({
  size,
  cellHeight,
  cellWidth,
  ...props
}) => {
  return (
    <Box
      sx={{
        gridColumn: `span ${size}`,
        mx: `${cellWidth * 0.05}px`,
        my: `${cellWidth * 0.05}px`,
      }}
    >
      <KeyboardKey {...props} />
    </Box>
  );
};
