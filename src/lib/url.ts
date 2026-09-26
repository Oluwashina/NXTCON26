import { isPieceId } from '../data/pieces';
import type { PieceId } from '../types';

const PARAM = 'piece';

/** Reads ?piece=knight from the current location. Returns null when absent/invalid. */
export function readPieceFromUrl(): PieceId | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get(PARAM);
  if (!isPieceId(raw)) return null;
  return raw.toLowerCase() as PieceId;
}

/** Link to the experience entry — no query params, so recipients start fresh. */
export function buildShareUrl(): string {
  if (typeof window === 'undefined') return '/';
  const url = new URL(window.location.href);
  url.hash = '';
  url.search = '';
  return url.toString();
}

/** Reflects the result in the address bar without adding history entries. */
export function syncPieceToUrl(piece: PieceId | null): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (piece) url.searchParams.set(PARAM, piece);
  else url.searchParams.delete(PARAM);
  window.history.replaceState(null, '', url.toString());
}
