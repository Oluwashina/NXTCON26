import { EVENT } from '../data/event';
import { PIECES } from '../data/pieces';
import { displayFirstName } from './playerName';
import { buildShareUrl } from './url';
import type { PieceId } from '../types';

export function buildShareMessage(piece: PieceId, playerName = ''): string {
  const { name, glyph } = PIECES[piece];
  const first = displayFirstName(playerName);
  const result = first
    ? `Apparently, ${first} is a ${name.toUpperCase()} ${glyph}`
    : `Apparently, I'm a ${name.toUpperCase()} ${glyph}`;

  return [
    `I just discovered my chess piece through ${EVENT.name}.`,
    '',
    result,
    '',
    "What's your move?",
    '',
    `Discover yours at ${EVENT.name}.`,
  ].join('\n');
}

/** Short one-liner for the clipboard / invite flows. */
export function buildInviteMessage(): string {
  return [
    `${EVENT.name} — ${EVENT.themeDisplay}`,
    `${EVENT.dateLabel} · ${EVENT.timeLabel}`,
    EVENT.addressOneLine,
    '',
    "First, discover your chess piece. What's your move?",
  ].join('\n');
}

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Opens Instagram. The app cannot receive a prefilled caption from the web. */
export function openInstagram(): void {
  window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
}

export type ShareOutcome = 'shared' | 'copied' | 'dismissed' | 'failed';

interface NativeShareInput {
  title: string;
  text: string;
  url: string;
  file?: File | null;
}

function canShareFiles(files: File[]): boolean {
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  return typeof nav.canShare === 'function' && nav.canShare({ files });
}

/**
 * Tries the Web Share API (with the result card image when the platform allows
 * files), and falls back to the clipboard everywhere else.
 */
export async function shareNatively({
  title,
  text,
  url,
  file,
}: NativeShareInput): Promise<ShareOutcome> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      if (file && canShareFiles([file])) {
        await navigator.share({ title, text: `${text}\n\n${url}`, files: [file] });
      } else {
        await navigator.share({ title, text, url });
      }
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'dismissed';
      // Fall through to the clipboard path.
    }
  }

  return (await copyText(`${text}\n\n${url}`)) ? 'copied' : 'failed';
}

export async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall back to the legacy path below.
  }

  try {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export function buildFullShareText(
  piece: PieceId,
  playerName = '',
): { text: string; url: string } {
  return { text: buildShareMessage(piece, playerName), url: buildShareUrl() };
}

/** Minimal .ics so "Get event details" works with no backend. */
export function buildCalendarFile(): Blob {
  const toIcs = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The New Church//NXTCON26//EN',
    'BEGIN:VEVENT',
    `UID:nxtcon26-${Date.now()}@thenewchurch`,
    `DTSTAMP:${toIcs(new Date().toISOString())}`,
    `DTSTART:${toIcs(EVENT.startsAt)}`,
    `DTEND:${toIcs(EVENT.endsAt)}`,
    `SUMMARY:${EVENT.name} — ${EVENT.themeDisplay}`,
    `LOCATION:${EVENT.addressOneLine}`,
    `DESCRIPTION:${EVENT.invitation.join(' ')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Give Safari a beat before revoking.
  window.setTimeout(() => URL.revokeObjectURL(href), 1000);
}
