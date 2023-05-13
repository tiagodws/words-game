import { Shadows } from '@mui/material';

export const shadows: Shadows = [
  'none',
  ...Array.from(new Array(24)).map((_, i) => `${2 + i}px ${2 + i}px #333333`),
] as Shadows;
