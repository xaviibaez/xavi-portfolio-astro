import { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';

interface NavTranslations {
  nav: { home: string; blog: string; projects: string };
  language: { toggle: string; en: string; es: string };
  theme: { toggle: string; light: string; dark: string; blue: string; green: string };
}

interface Props {
  lang: 'en' | 'es';
  base: string;
  t: NavTranslations;
  targetPath: string;
}

export default function Nav({ lang, base, t, targetPath }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center gap-8">
        <a href={`${base}/`} className="flex items-center gap-1.5 no-underline font-bold text-[1.1rem] shrink-0">
          <span className="font-mono text-accent">{'{}'}</span>
          <span className="text-fg">xavi.dev</span>
        </a>

        <div className="hidden sm:flex gap-1 flex-1">
          {[
            { href: `${base}/`, label: t.nav.home },
            { href: `${base}/blog`, label: t.nav.blog },
            { href: `${base}/projects`, label: t.nav.projects },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-lg text-sm no-underline transition-colors duration-150 text-fg-muted hover:text-fg hover:bg-bg-card-hover"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <LanguageSelector
            currentLang={lang}
            label={t.language.toggle}
            langNames={{ en: t.language.en, es: t.language.es }}
            targetPath={targetPath}
          />
          <ThemeSelector
            label={t.theme.toggle}
          />
        </div>

        <button
          className="sm:hidden flex flex-col gap-1 bg-transparent border-none cursor-pointer p-1.5 rounded-md"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="block w-5 h-0.5 rounded-sm transition-all duration-200 bg-fg" />
          <span className="block w-5 h-0.5 rounded-sm transition-all duration-200 bg-fg" />
          <span className="block w-5 h-0.5 rounded-sm transition-all duration-200 bg-fg" />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="flex flex-col px-6 pb-4 pt-3 gap-1 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {[
            { href: `${base}/`, label: t.nav.home },
            { href: `${base}/blog`, label: t.nav.blog },
            { href: `${base}/projects`, label: t.nav.projects },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2 rounded-lg text-[0.9rem] no-underline transition-all duration-150 text-fg-muted hover:text-fg hover:bg-bg-card-hover"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
