const MAX_LEN = 32;

/** Trim and collapse whitespace; never persisted remotely. */
export function normalizePlayerName(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').slice(0, MAX_LEN);
}

export function isPlayerNameValid(raw: string): boolean {
  return normalizePlayerName(raw).length >= 1;
}

/** First name for headlines; falls back to empty when absent. */
export function displayFirstName(full: string): string {
  const normalized = normalizePlayerName(full);
  if (!normalized) return '';
  const first = normalized.split(' ')[0] ?? normalized;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

/** Uppercase first name for the share card. */
export function cardNameLabel(full: string): string {
  const first = displayFirstName(full);
  return first ? first.toUpperCase() : '';
}
