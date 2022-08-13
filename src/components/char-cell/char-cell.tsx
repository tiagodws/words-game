import { Box } from '@mui/system';
import { FC } from 'react';
import { Text } from '../text';
import { Char } from './char';

export type CharCellProps = {
  char?: Char;
  state?: 'empty' | 'correct' | 'incorrect' | 'hint';
  isFocused?: boolean;
  onClick?: () => void;
};

const colorMap = {
  empty: 'background.default',
  correct: 'success.main',
  incorrect: 'grey.800',
  hint: 'info.main',
};

export const CharCell: FC<CharCellProps> = (props) => {
  const { char, isFocused, state = 'empty', onClick } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: 'divider',
        borderRadius: 0,
        borderWidth: 4,
        borderBottomWidth: isFocused ? 12 : undefined,
        width: 96,
        height: 96,
        bgcolor: colorMap[state],
        transition: 'all 0.2s',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <Text fontSize={40} fontWeight="800">
        {char?.toUpperCase()}
      </Text>
    </Box>
  );
};
