interface Props {
  currentLang: 'en' | 'es';
  label: string;
  langNames: { en: string; es: string };
  targetPath: string;
}

export default function LanguageSelector({ currentLang, label, langNames, targetPath }: Props) {
  return (
    <a
      href={targetPath}
      className="btn btn-ghost btn-sm border text-[0.8rem] no-underline"
      style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)', background: 'transparent' }}
      aria-label={label}
    >
      {currentLang === 'en' ? langNames.es : langNames.en}
    </a>
  );
}
