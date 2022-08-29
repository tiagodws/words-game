import TagManager from 'react-gtm-module';
import { isDevEnv } from '../../utils/is-dev-env';

const tagManagerArgs = {
  gtmId: 'GTM-PKJ3XD6',
};

export const initTracking = () => {
  if (!isDevEnv()) {
    TagManager.initialize(tagManagerArgs);
  }
};
