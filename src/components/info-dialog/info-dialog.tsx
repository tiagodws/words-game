import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../dialog';

type InfoDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

export const InfoDialog: FC<InfoDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="How to play">
      {
        'Content Content Content Content Content Content Content Content Content Content Content Content Content Content '
      }
    </Dialog>
  );
};
