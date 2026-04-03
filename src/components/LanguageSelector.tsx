import { useState, useEffect, useRef } from 'react';

interface Props {
  currentLang: 'en' | 'es';
  label: string;
  langNames: { en: string; es: string };
  targetPath: string;
}

export default function LanguageSelector({ currentLang, label, langNames, targetPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const enHref = currentLang === 'en' ? '#' : targetPath;
  const esHref = currentLang === 'es' ? '#' : targetPath;

  return (
    <div ref={ref} className="relative">
      <button
        className="btn btn-ghost btn-sm border gap-1.5 text-[0.8rem]"
        style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)', background: 'transparent' }}
        aria-label={label}
        onClick={(e) => { e.stopPropagation(); setIsOpen((o) => !o); }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 flex flex-col gap-1 p-1.5 rounded-xl border z-50 min-w-[120px]"
          style={{ top: 'calc(100% + 0.5rem)', backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: '0 8px 24px var(--shadow)' }}
        >
          <a
            href="/"
            className={`block px-2.5 py-2 rounded-lg text-[0.8rem] no-underline transition-colors duration-150 ${currentLang === 'en' ? 'font-semibold' : ''}`}
            style={{ color: currentLang === 'en' ? 'var(--accent)' : 'var(--fg)', backgroundColor: currentLang === 'en' ? 'var(--bg-card-hover)' : 'transparent' }}
            onClick={() => setIsOpen(false)}
          >
            {langNames.en}
          </a>
          <a
            href="/es"
            className={`block px-2.5 py-2 rounded-lg text-[0.8rem] no-underline transition-colors duration-150 ${currentLang === 'es' ? 'font-semibold' : ''}`}
            style={{ color: currentLang === 'es' ? 'var(--accent)' : 'var(--fg)', backgroundColor: currentLang === 'es' ? 'var(--bg-card-hover)' : 'transparent' }}
            onClick={() => setIsOpen(false)}
          >
            {langNames.es}
          </a>
        </div>
      )}
    </div>
  );
}
