const base = 'h-3.5 w-3.5 shrink-0';

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={base} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base} aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.4 1.26 4.83L2 22l5.34-1.4a9.93 9.93 0 0 0 4.7 1.2c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.8.82-3-.19-.31a8.17 8.17 0 1 1 6.87 3.82Zm4.5-6.1c-.25-.13-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.78.96-.14.17-.28.19-.53.06a6.7 6.7 0 0 1-1.96-1.21 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.39.11-.52.11-.11.25-.3.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2s.86 2.33.98 2.49c.12.16 1.68 2.7 4.09 3.68 2.4.98 2.4.65 2.84.61.43-.04 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={base} aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="1.5" />
      <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={base} aria-hidden>
      <path d="M12 3.5v11M12 14.5 7.5 10M12 14.5 16.5 10" strokeLinecap="round" />
      <path d="M4.5 18.5h15" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={base} aria-hidden>
      <path d="M12 21s7-6.13 7-11a7 7 0 1 0-14 0c0 4.87 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={base} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="15" rx="1.5" />
      <path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" strokeLinecap="round" />
    </svg>
  );
}

export function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={base} aria-hidden>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
      <path d="M16 5.6a3.5 3.5 0 0 1 0 5.8M18 20a6.4 6.4 0 0 0-1.6-4.2" strokeLinecap="round" />
    </svg>
  );
}
