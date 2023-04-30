import { isDevEnv } from './is-dev-env';

export const isDebugging = (): boolean => {
  return isDevEnv() || !!localStorage.getItem('isDebugging');
};
