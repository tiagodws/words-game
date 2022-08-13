import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = Pick<
  MuiLinkProps,
  'children' | 'target' | 'variant' | 'color'
> & {
  href?: string;
  disabled?: boolean;
};

export const Link: FC<LinkProps> = (props) => {
  const { color = 'text.primary', href = '#', disabled, ...rest } = props;
  const isExternal = href.includes('://');

  if (isExternal) {
    return <MuiLink color={color} href={disabled ? '#' : href} {...rest} />;
  }

  return (
    <MuiLink
      color={color}
      to={disabled ? '#' : href}
      component={RouterLink}
      {...rest}
    />
  );
};
