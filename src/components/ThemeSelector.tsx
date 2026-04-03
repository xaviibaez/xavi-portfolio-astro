import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'xavi-theme';

const SWATCHES: Record<string, string> = {
  light: 'linear-gradient(135deg, #f8f8f8 50%, #6366f1 50%)',
  dark: 'linear-gradient(135deg, #1a1a1a 50%, #818cf8 50%)',
  blue: 'linear-gradient(135deg, #e8f0fe 50%, #2563eb 50%)',
  green: 'linear-gradient(135deg, #ecfdf5 50%, #059669 50%)',
};

interface Props {
  label: string;
  themes: { light: string; dark: string; blue: string; green: string };
}

export default function ThemeSelector({ label, themes }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('light');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'light';
    setActiveTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    setActiveTheme(theme);
    setIsOpen(false);
  }

  const themeEntries = Object.entries(themes) as [keyof typeof themes, string][];

  return (
    <div ref={ref} className="relative" title={label}>
      <button
        className="btn btn-ghost btn-sm border"
        style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)', background: 'transparent' }}
        aria-label={label}
        onClick={(e) => { e.stopPropagation(); setIsOpen((o) => !o); }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 flex flex-col gap-1 p-1.5 rounded-xl border z-50 min-w-[130px]"
          style={{ top: 'calc(100% + 0.5rem)', backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: '0 8px 24px var(--shadow)' }}
          role="menu"
          aria-label={label}
        >
          {themeEntries.map(([key, name]) => (
            <button
              key={key}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border-none text-[0.8rem] cursor-pointer w-full text-left transition-colors duration-150 ${activeTheme === key ? 'bg-bg-card-hover' : 'hover:bg-bg-card-hover'}`}
              style={{ background: activeTheme === key ? 'var(--bg-card-hover)' : 'transparent', color: 'var(--fg)' }}
              role="menuitem"
              onClick={() => applyTheme(key)}
            >
              <span
                className="rounded-full border shrink-0"
                style={{ background: SWATCHES[key], borderColor: 'var(--border)', width: 18, height: 18 }}
              />
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
