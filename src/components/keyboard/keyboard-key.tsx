import { alpha, Box, darken, lighten, Theme, useTheme } from '@mui/material';
import { CSSProperties, FC, MouseEvent, ReactNode, TouchEvent } from 'react';
import { Text } from '../text';

export type KeyState = 'default' | 'correct' | 'incorrect' | 'hint';

export type KeyboardKeyProps = {
  label: string;
  state?: KeyState;
  icon?: ReactNode;
  fontSize?: CSSProperties['fontSize'];
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onTouchStart?: (event: TouchEvent<HTMLElement>) => void;
  onTouchEnd?: (event: TouchEvent<HTMLElement>) => void;
};

const bgColorMap: Record<KeyState, (theme: Theme) => string> = {
  default: (theme: Theme) => theme.palette.grey[500],
  correct: (theme: Theme) => theme.palette.success.main,
  incorrect: (theme: Theme) => theme.palette.grey[800],
  hint: (theme: Theme) => theme.palette.warning.main,
};

const borderColorMap: Record<KeyState, (theme: Theme) => string> = {
  default: (theme: Theme) => lighten(bgColorMap.default(theme), 0.7),
  correct: (theme: Theme) => darken(bgColorMap.correct(theme), 0.4),
  incorrect: (theme: Theme) => darken(bgColorMap.incorrect(theme), 0.4),
  hint: (theme: Theme) => darken(bgColorMap.hint(theme), 0.4),
};

const fontColorMap: Record<KeyState, (theme: Theme) => string> = {
  default: (theme: Theme) => theme.palette.text.primary,
  correct: (theme: Theme) => theme.palette.text.primary,
  incorrect: (theme: Theme) => alpha(theme.palette.text.primary, 0.3),
  hint: (theme: Theme) => theme.palette.text.primary,
};

const useStateColors = (state: KeyState) => {
  const theme = useTheme();
  return {
    bgcolor: bgColorMap[state](theme),
    borderColor: borderColorMap[state](theme),
    color: fontColorMap[state](theme),
  };
};

export const KeyboardKey: FC<KeyboardKeyProps> = (props) => {
  const {
    label,
    state = 'default',
    icon,
    fontSize,
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
  } = props;
  const { bgcolor, borderColor, color } = useStateColors(state);

  return (
    <Box
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      sx={{
        p: 0,
        minWidth: 0,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0.5,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        bgcolor,
        borderStyle: 'solid',
        borderColor,
        borderWidth: 1,
        width: '100%',
        height: '100%',
        userSelect: 'none',
        '&:hover': {
          bgcolor: darken(bgcolor, 0.2),
        },
        boxShadow: 1,
      }}
    >
      {icon ? (
        icon
      ) : (
        <Text fontSize={fontSize} color={color}>
          {label?.toUpperCase()}
        </Text>
      )}
    </Box>
  );
};
