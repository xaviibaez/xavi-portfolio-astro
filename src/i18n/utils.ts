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

/** Returns the URL prefix for a given lang: '/es' or '' */
export function getLangBase(lang: Lang): string {
  return lang === 'es' ? '/es' : '';
}

/** Returns the equivalent path in the other language */
export function getAlternatePath(currentPath: string, currentLang: Lang): string {
  if (currentLang === 'en') {
    return currentPath === '/' ? '/es' : `/es${currentPath}`;
  }
  return currentPath.replace(/^\/es/, '') || '/';
}

/** Returns the OG locale string for a given lang */
export function getOgLocale(lang: Lang): string {
  return lang === 'es' ? 'es_ES' : 'en_US';
}
