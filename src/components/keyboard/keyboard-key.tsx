import { alpha, Button, darken, lighten, Theme, useTheme } from '@mui/material';
import { CSSProperties, FC, ReactNode } from 'react';
import { Text } from '../text';

export type KeyState = 'default' | 'correct' | 'incorrect' | 'hint';

export type KeyboardKeyProps = {
  label: string;
  state?: KeyState;
  icon?: ReactNode;
  fontSize?: CSSProperties['fontSize'];
  onClick?: () => void;
};

const bgColorMap: Record<KeyState, (theme: Theme) => string> = {
  default: (theme: Theme) => theme.palette.grey[600],
  correct: (theme: Theme) => theme.palette.success.main,
  incorrect: (theme: Theme) => theme.palette.grey[800],
  hint: (theme: Theme) => theme.palette.warning.main,
};

const borderColorMap: Record<KeyState, (theme: Theme) => string> = {
  default: (theme: Theme) => lighten(bgColorMap.default(theme), 0.7),
  correct: (theme: Theme) => darken(bgColorMap.correct(theme), 0.2),
  incorrect: (theme: Theme) => darken(bgColorMap.incorrect(theme), 0.2),
  hint: (theme: Theme) => darken(bgColorMap.hint(theme), 0.2),
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
  const { label, state = 'default', icon, fontSize, onClick } = props;
  const { bgcolor, borderColor, color } = useStateColors(state);

  return (
    <Button
      onClick={onClick}
      sx={(theme) => ({
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
        boxShadow: `2px 2px ${theme.palette.common.black}`,
        '&:hover': {
          bgcolor: darken(bgcolor, 0.2),
        },
      })}
    >
      {icon ? (
        icon
      ) : (
        <Text fontSize={fontSize} color={color}>
          {label?.toUpperCase()}
        </Text>
      )}
    </Button>
  );
};
