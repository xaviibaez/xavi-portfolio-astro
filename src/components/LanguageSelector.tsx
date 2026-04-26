interface Props {
  label: string;
  nextLangName: string;
  targetPath: string;
}

export default function LanguageSelector({ label, nextLangName, targetPath }: Props) {
  return (
    <a
      href={targetPath}
      className="btn btn-ghost btn-sm border text-[0.8rem] no-underline"
      style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)', background: 'transparent' }}
      aria-label={label}
    >
      {nextLangName}
    </a>
  );
}
