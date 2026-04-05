interface Props {
  label: string;
}

export default function ThemeSelector({ label }: Props) {
  return (
    <button
      data-toggle-theme="dark,light"
      data-act-class="ACTIVECLASS"
      className="btn btn-ghost btn-sm border"
      style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)', background: 'transparent' }}
      aria-label={label}
    >
      {/* Moon: visible in light mode */}
      <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
      {/* Sun: visible in dark mode */}
      <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    </button>
  );
}
