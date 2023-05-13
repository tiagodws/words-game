import WifiOffIcon from '@mui/icons-material/WifiOff';
import { Alert, Box, Chip } from '@mui/material';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../link';
import { Text } from '../text';
import { useWordData } from './use-word-data';

type WordMeaningProps = {
  word: string;
};

export const WordMeaning: FC<WordMeaningProps> = (props) => {
  const { word } = props;
  const { t } = useTranslation('result');
  const { data, isPaused } = useWordData(word);

  return isPaused ? (
    <Alert color="info" icon={<WifiOffIcon fontSize="small" />}>
      {t('wordDefinitionOfflineAlert')}
    </Alert>
  ) : (
    <>
      {data?.meaning && (
        <Text textAlign="center" component="div">
          {data?.meaning?.partOfSpeech && (
            <Chip
              label={data?.meaning?.partOfSpeech}
              size="small"
              sx={{ mr: 1 }}
            />
          )}

          {t('wordDefinition', {
            definition: data.meaning?.definition,
          })}
        </Text>
      )}

      {data?.source && (
        <Box sx={{ mt: 1 }}>
          <Text
            textAlign="center"
            variant="caption"
            color="secondary"
            fontSize="0.5rem"
          >
            <Trans
              i18nKey="result:wordDefinitionSource"
              values={{ source: data.source }}
              components={[<Link href={data.source} target="_blank" />]}
            />
          </Text>
        </Box>
      )}
    </>
  );
};
