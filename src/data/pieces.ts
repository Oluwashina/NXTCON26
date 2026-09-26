import type { Piece, PieceId } from '../types';

export const PIECE_ORDER: PieceId[] = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

export const PIECES: Record<PieceId, Piece> = {
  pawn: {
    id: 'pawn',
    name: 'Pawn',
    title: 'The Builder',
    strength: 'Consistency',
    move: 'Start',
    movement: 'starts small and keeps moving',
    description: [
      'You are not waiting for the perfect conditions. You move with what is already in your hand.',
      'Where others are still deciding, you have already taken the first step — and then the next one. You understand that foundations are laid quietly, one square at a time, long before anyone notices what is being built.',
      'Your strength is consistency.',
    ],
    shareLine: 'I start small and keep moving.',
    glyph: '♟',
  },
  knight: {
    id: 'knight',
    name: 'Knight',
    title: 'The Unconventional',
    strength: 'Perspective',
    move: 'Think Differently',
    movement: 'takes an unexpected route',
    description: [
      "You don't always take the obvious route.",
      "You see possibilities where others see limitations, and you're comfortable approaching problems from a different angle. When the straight line is blocked, you are already moving around it.",
      'Your strength is perspective.',
    ],
    shareLine: "I don't always take the obvious route.",
    glyph: '♞',
  },
  bishop: {
    id: 'bishop',
    name: 'Bishop',
    title: 'The Visionary',
    strength: 'Vision',
    move: 'See Beyond',
    movement: 'sees across the board',
    description: [
      'You see across the board.',
      'While others are reacting to the square in front of them, you are reading the whole diagonal — where this is going, what it means, who it affects. You think in distance, not in inches.',
      'Your strength is vision.',
    ],
    shareLine: 'I see across the board.',
    glyph: '♝',
  },
  rook: {
    id: 'rook',
    name: 'Rook',
    title: 'The Foundation',
    strength: 'Stability',
    move: 'Stand Firm',
    movement: 'stands firm',
    description: [
      'You are the one people lean on when everything else is moving.',
      'You bring structure to confusion and steadiness to pressure. You are not easily moved, and that is precisely why others are able to move at all.',
      'Your strength is stability.',
    ],
    shareLine: 'I am the one people lean on.',
    glyph: '♜',
  },
  queen: {
    id: 'queen',
    name: 'Queen',
    title: 'The Influencer',
    strength: 'Range',
    move: 'Create Impact',
    movement: 'moves with range',
    description: [
      'You move in every direction — and the whole board feels it.',
      'You adapt to the room without losing yourself in it. Your presence changes the temperature of a space, and your reach extends far past the square you are standing on.',
      'Your strength is range.',
    ],
    shareLine: 'I move in every direction.',
    glyph: '♛',
  },
  king: {
    id: 'king',
    name: 'King',
    title: 'The Leader',
    strength: 'Purpose',
    move: 'Lead With Purpose',
    movement: 'protects what matters',
    description: [
      'You protect what matters.',
      'You may not make the loudest move, but you make the deciding one. You carry the weight of the outcome, and you measure every step by what it costs the people you are responsible for.',
      'Your strength is purpose.',
    ],
    shareLine: 'I protect what matters.',
    glyph: '♚',
  },
};

export const ALL_PIECES: Piece[] = PIECE_ORDER.map((id) => PIECES[id]);

export function isPieceId(value: string | null | undefined): value is PieceId {
  return !!value && (PIECE_ORDER as string[]).includes(value.toLowerCase());
}
