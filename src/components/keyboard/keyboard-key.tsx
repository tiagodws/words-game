import { Box, darken, Theme, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Text } from '../text';

export type KeyState = 'default' | 'correct' | 'incorrect' | 'hint';

type KeyboardKeyProps = {
  label: string;
  state?: KeyState;
  icon?: ReactNode;
  lockAspectRatio?: boolean;
  onClick?: () => void;
};

const bgColorMap: Record<KeyState, (theme: Theme) => string> = {
  default: (theme: Theme) => theme.palette.grey[700],
  correct: (theme: Theme) => theme.palette.success.main,
  incorrect: (theme: Theme) => theme.palette.grey[900],
  hint: (theme: Theme) => theme.palette.info.main,
};

const useStateColors = (state: KeyState) => {
  const theme = useTheme();
  return {
    bgcolor: bgColorMap[state](theme),
  };
};

export const KeyboardKey: FC<KeyboardKeyProps> = (props) => {
  const { label, state = 'default', icon, lockAspectRatio, onClick } = props;
  const { bgcolor } = useStateColors(state);

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 0.5,
        backgroundColor: 'grey.700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0.5,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        bgcolor,
        width: '100%',
        height: '100%',
        aspectRatio: lockAspectRatio ? '1 / 1.3' : undefined,
        userSelect: 'none',
        '&:hover': {
          bgcolor: darken(bgcolor, 0.2),
        },
      }}
    >
      {icon ? icon : <Text>{label?.toUpperCase()}</Text>}
    </Box>
  );
};
