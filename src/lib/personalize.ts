import { displayFirstName } from './playerName';

/** Eyebrow above the piece on reveal, e.g. "Alex, you are the". */
export function revealLeadIn(playerName: string): string {
  const first = displayFirstName(playerName);
  return first ? `${first}, you are the` : 'You are the';
}

/** Card subhead above the piece name, e.g. "Alex is a". */
export function cardIsA(playerName: string): string {
  const first = displayFirstName(playerName);
  return first ? `${first.toUpperCase()} IS A` : 'I AM A';
}
