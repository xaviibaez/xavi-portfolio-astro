import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';

interface NavTranslations {
  language: { toggle: string; en: string; es: string };
  theme: { toggle: string };
}

interface Props {
  lang: 'en' | 'es';
  base: string;
  translation: NavTranslations;
  targetPath: string;
}

export default function Nav({ lang, base, translation, targetPath }: Props) {
  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
        <a href={`${base}/`} className="flex items-center gap-1.5 no-underline font-bold text-[1.1rem] shrink-0">
          <span className="font-mono text-accent">{'{}'}</span>
          <span className="text-fg">xavi.dev</span>
        </a>

        <div className="flex items-center gap-2 ml-auto">
          <LanguageSelector
            currentLang={lang}
            label={translation.language.toggle}
            langNames={{ en: translation.language.en, es: translation.language.es }}
            targetPath={targetPath}
          />
          <ThemeSelector label={translation.theme.toggle} />
        </div>
      </div>
    </nav>
  );
}
