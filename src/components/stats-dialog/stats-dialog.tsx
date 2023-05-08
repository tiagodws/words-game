import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../dialog';
import { Stats } from './stats';

type StatsDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

export const StatsDialog: FC<StatsDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation('stats');

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={t('statsTitle')}>
      <Stats />
    </Dialog>
  );
};
