import { en } from './en';
import { es } from './es';
import { ca } from './ca';

export const languages = {
  en,
  es,
  ca,
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

/** Returns the URL prefix for a given lang: '/es', '/ca', or '' */
export function getLangBase(lang: Lang): string {
  if (lang === 'en') return '';
  return `/${lang}`;
}

/** Returns the equivalent path in the target language */
export function getPathForLang(currentPath: string, currentLang: Lang, targetLang: Lang): string {
  const basePath =
    currentLang === 'en'
      ? currentPath
      : currentPath.replace(new RegExp(`^/${currentLang}`), '') || '/';

  if (targetLang === 'en') return basePath || '/';
  return basePath === '/' ? `/${targetLang}` : `/${targetLang}${basePath}`;
}

const langCycle: Record<Lang, Lang> = { en: 'es', es: 'ca', ca: 'en' };

/** Returns the next language in the cycle: en → es → ca → en */
export function getNextLang(lang: Lang): Lang {
  return langCycle[lang];
}

/** Returns the OG locale string for a given lang */
export function getOgLocale(lang: Lang): string {
  if (lang === 'es') return 'es_ES';
  if (lang === 'ca') return 'ca_ES';
  return 'en_US';
}
