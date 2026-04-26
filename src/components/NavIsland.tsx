import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import type { Lang } from '@/i18n/utils';

interface NavTranslations {
  language: { toggle: string };
  theme: { toggle: string };
}

interface Props {
  lang: Lang;
  base: string;
  nextLangName: string;
  targetPath: string;
  translation: NavTranslations;
}

export default function Nav({ lang, base, nextLangName, targetPath, translation }: Props) {
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
            label={translation.language.toggle}
            nextLangName={nextLangName}
            targetPath={targetPath}
          />
          <ThemeSelector label={translation.theme.toggle} />
        </div>
      </div>
    </nav>
  );
}
