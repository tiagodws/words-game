import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';

const resources = {
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
