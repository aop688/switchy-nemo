import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en';
import ja from './lang/ja';
import zh from './lang/zh';

export const DEFAULT_LOCALE = 'en';
export const LOCALE_LIST = ['en', 'ja', 'zh'];

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

export const resources = {
  zh: {
    translation: {
      ...zh
    }
  },
  ja: {
    translation: {
      ...ja
    }
  },
  en: {
    translation: {
      ...en
    }
  }
} as const;

void i18n.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  returnNull: false,
  resources
});

export function setLocale(locale: string): string {
  void i18n.changeLanguage(locale);
  document.documentElement.setAttribute('lang', locale);
  localStorage.setItem('locale', locale);
  return locale;
}

(() => {
  const defaultLocale = localStorage.getItem('locale') || DEFAULT_LOCALE;
  setLocale(defaultLocale);
})();

export default i18n;
