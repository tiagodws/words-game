import { Keyframes, keyframes } from '@emotion/react';
import { Theme, useTheme } from '@mui/material';
import { Box, darken, lighten } from '@mui/system';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { Char } from '../../hooks/game/char';
import { Text } from '../text';

export type CellState =
  | 'default'
  | 'correct'
  | 'incorrect'
  | 'hint'
  | 'invalid'
  | 'disabled';

export type CharCellProps = {
  char?: Char;
  state?: CellState;
  isFocused?: boolean;
  fontSize?: CSSProperties['fontSize'];
  onClick?: () => void;
};

const bgColorMap: Record<CellState, (theme: Theme) => string> = {
  default: (theme: Theme) => lighten(theme.palette.background.default, 0.1),
  correct: (theme: Theme) => theme.palette.success.main,
  incorrect: (theme: Theme) => theme.palette.grey[800],
  hint: (theme: Theme) => theme.palette.info.main,
  invalid: (theme: Theme) => theme.palette.background.default,
  disabled: (theme: Theme) => darken(theme.palette.background.default, 0.2),
};

const borderColorMap: Record<CellState, (theme: Theme) => string> = {
  default: (theme: Theme) => lighten(bgColorMap.default(theme), 0.7),
  correct: (theme: Theme) => darken(bgColorMap.correct(theme), 0.2),
  incorrect: (theme: Theme) => darken(bgColorMap.incorrect(theme), 0.2),
  hint: (theme: Theme) => darken(bgColorMap.hint(theme), 0.2),
  invalid: (theme: Theme) => bgColorMap.invalid(theme),
  disabled: (theme: Theme) => darken(bgColorMap.disabled(theme), 0.1),
};

const fontColorMap: Record<CellState, (theme: Theme) => string> = {
  default: (theme: Theme) => theme.palette.text.primary,
  correct: (theme: Theme) => theme.palette.text.primary,
  incorrect: (theme: Theme) => theme.palette.text.primary,
  hint: (theme: Theme) => theme.palette.text.primary,
  invalid: (theme: Theme) => theme.palette.text.primary,
  disabled: (theme: Theme) => theme.palette.text.primary,
};

const useStateColors = (state: CellState) => {
  const theme = useTheme();
  return {
    bgcolor: bgColorMap[state](theme),
    borderColor: borderColorMap[state](theme),
    color: fontColorMap[state](theme),
  };
};

const invalid = keyframes(`
from, to {
  transform: translate3d(0,0,0);
}

50% {
  transform: translate3d(0, -10px, 0);
}
`);

const fill = keyframes(`
from, to {
  transform: scale(1);
}

50% {
  transform: scale(0.95);
}
`);

const erase = keyframes(`
from, to {
  transform: scale(1);
}

50% {
  transform: scale(0.95);
}
`);

export const CharCell: FC<CharCellProps> = (props) => {
  const { char, isFocused, state = 'default', fontSize, onClick } = props;
  const { bgcolor, borderColor, color } = useStateColors(state);
  const [animation, setAnimation] = useState<Keyframes>();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (state === 'invalid') {
      setAnimation(invalid);
      return;
    }

    if (state === 'default' && char) {
      setAnimation(fill);
      return;
    }

    if (isDirty && state === 'default' && !char) {
      setAnimation(erase);
      return;
    }
  }, [state, char, isDirty]);

  useEffect(() => {
    if (char && !isDirty) {
      setIsDirty(true);
    }
  }, [char, isDirty]);

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0.5,
        borderStyle: 'solid',
        borderColor,
        borderWidth: 2,
        height: '100%',
        width: '100%',
        bgcolor,
        transition: 'all 0.2s',
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'default',
        animation: animation ? `${animation} 400ms` : undefined,
        boxShadow: `2px 2px ${theme.palette.common.black}`,
      })}
      onClick={onClick}
      onAnimationEnd={() => setAnimation(undefined)}
    >
      <Text fontWeight="bold" fontSize={fontSize} color={color}>
        {char?.toUpperCase()}
      </Text>
    </Box>
  );
};
