import { en } from './en';
import { es } from './es';

export const languages = {
  en,
  es,
} as const;

export type Lang = keyof typeof languages;

export function useTranslations(lang: Lang) {
  return languages[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return 'en';
}

export function getOtherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}
