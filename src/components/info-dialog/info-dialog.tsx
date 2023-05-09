import { Box, Divider, Grid } from '@mui/material';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CharCell } from '../char-cell';
import { Dialog } from '../dialog';
import { Text } from '../text';

type InfoDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

export const InfoDialog: FC<InfoDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation('about');

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={t('aboutTitle')}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Text variant="h4">{t('howToTitle')}</Text>
            </Grid>

            <Grid item xs={12}>
              <Text variant="body2">{t('howToDescription')}</Text>
            </Grid>

            <Grid item xs={12} component="ul">
              <Text variant="body2" component="li">
                {t('howToRuleLength')}
              </Text>
              <Text variant="body2" component="li">
                {t('howToRuleRepeated')}
              </Text>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Text variant="h4">{t('exampleTitle')}</Text>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {'WORDS'.split('').map((char, i) => (
                      <Box
                        key={i}
                        sx={{
                          mx: '2px',
                          height: 36,
                          width: 36,
                        }}
                      >
                        <CharCell
                          value={char}
                          state={
                            (char === 'O' && 'correct') ||
                            (char === 'D' && 'hint') ||
                            'incorrect'
                          }
                          fontSize={16}
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} component="ul" sx={{ listStyle: 'none' }}>
                  <Text variant="body2" component="li">
                    <Trans
                      i18nKey="about:correctExample"
                      components={{
                        char: (
                          <CharCell
                            width={36}
                            value={'O'}
                            state={'correct'}
                            fontSize={16}
                          />
                        ),
                      }}
                    />
                  </Text>

                  <Text variant="body2" component="li">
                    <Trans
                      i18nKey="about:hintExample"
                      components={{
                        char: (
                          <CharCell
                            width={36}
                            value={'D'}
                            state={'hint'}
                            fontSize={16}
                          />
                        ),
                      }}
                    />
                  </Text>

                  <Text variant="body2" component="li">
                    <Trans
                      i18nKey="about:incorrectExample"
                      components={{
                        char: (
                          <>
                            <CharCell
                              width={36}
                              value={'W'}
                              state={'incorrect'}
                              fontSize={16}
                            />
                            <Box sx={{ mx: '4px', display: 'inline-block' }}>
                              <CharCell
                                width={36}
                                value={'R'}
                                state={'incorrect'}
                                fontSize={16}
                              />
                            </Box>
                            <CharCell
                              width={36}
                              value={'S'}
                              state={'incorrect'}
                              fontSize={16}
                            />
                          </>
                        ),
                      }}
                    />
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
