import { Keyframes, keyframes } from '@emotion/react';
import { Theme, useTheme } from '@mui/material';
import { Box, darken } from '@mui/system';
import { FC, useEffect, useState } from 'react';
import { Char } from '../../hooks/game/char';
import { Text } from '../text';

export type CellState =
  | 'default'
  | 'correct'
  | 'incorrect'
  | 'hint'
  | 'invalid'
  | 'disabled';

type CharCellProps = {
  char?: Char;
  state?: CellState;
  isFocused?: boolean;
  onClick?: () => void;
};

const bgColorMap: Record<CellState, (theme: Theme) => string> = {
  default: (theme: Theme) => theme.palette.background.default,
  correct: (theme: Theme) => theme.palette.success.main,
  incorrect: (theme: Theme) => theme.palette.grey[800],
  hint: (theme: Theme) => theme.palette.info.main,
  invalid: (theme: Theme) => theme.palette.background.default,
  disabled: (theme: Theme) => theme.palette.grey[900],
};

const borderColorMap: Record<CellState, (theme: Theme) => string> = {
  default: (theme: Theme) => theme.palette.divider,
  correct: (theme: Theme) => darken(bgColorMap.correct(theme), 0.2),
  incorrect: (theme: Theme) => darken(bgColorMap.incorrect(theme), 0.2),
  hint: (theme: Theme) => darken(bgColorMap.hint(theme), 0.2),
  invalid: (theme: Theme) => theme.palette.divider,
  disabled: (theme: Theme) => darken(bgColorMap.disabled(theme), 0.2),
};

const useStateColors = (state: CellState) => {
  const theme = useTheme();
  return {
    bgcolor: bgColorMap[state](theme),
    borderColor: borderColorMap[state](theme),
  };
};

const jump = keyframes(`
from, to {
  transform: translate3d(0,0,0);
}

50% {
  transform: translate3d(0, -10px, 0);
}
`);

const blink = keyframes(`
from, to {
  transform: scale(1);
}

50% {
  transform: scale(1.05);
}
`);

export const CharCell: FC<CharCellProps> = (props) => {
  const { char, isFocused, state = 'default', onClick } = props;
  const { bgcolor, borderColor } = useStateColors(state);
  const [animation, setAnimation] = useState<Keyframes>();

  useEffect(() => {
    if (state === 'invalid') {
      setAnimation(jump);
      return;
    }

    if (state === 'default' && char) {
      setAnimation(blink);
      return;
    }
  }, [state, char]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor,
        borderRadius: 0,
        borderWidth: 2,
        borderBottomWidth: isFocused ? 6 : undefined,
        width: '100%',
        aspectRatio: '1',
        bgcolor,
        transition: 'all 0.2s',
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'default',
        animation: animation ? `${animation} 400ms` : undefined,
      }}
      onClick={onClick}
      onAnimationEnd={() => setAnimation(undefined)}
    >
      <Text fontWeight="800" fontSize="200%">
        {char?.toUpperCase()}
      </Text>
    </Box>
  );
};
