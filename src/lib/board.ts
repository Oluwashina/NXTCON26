import type { PieceId } from '../types';

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

export interface Coord {
  /** 0 = file a, 7 = file h. */
  col: number;
  /** 0 = rank 8 (top row), 7 = rank 1. */
  row: number;
}

export function toCoord(square: string): Coord {
  const col = FILES.indexOf(square[0] as (typeof FILES)[number]);
  const row = 8 - Number(square[1]);
  return { col, row };
}

export function toSquare({ col, row }: Coord): string {
  return `${FILES[col]}${8 - row}`;
}

export function onBoard({ col, row }: Coord): boolean {
  return col >= 0 && col < 8 && row >= 0 && row < 8;
}

/** True when the square should be rendered as a light square. */
export function isLightSquare(col: number, row: number): boolean {
  return (col + row) % 2 === 0;
}

const KNIGHT_JUMPS: Coord[] = [
  { col: 1, row: 2 },
  { col: 2, row: 1 },
  { col: 2, row: -1 },
  { col: 1, row: -2 },
  { col: -1, row: -2 },
  { col: -2, row: -1 },
  { col: -2, row: 1 },
  { col: -1, row: 2 },
];

const DIAGONALS: Coord[] = [
  { col: 1, row: 1 },
  { col: 1, row: -1 },
  { col: -1, row: 1 },
  { col: -1, row: -1 },
];

const STRAIGHTS: Coord[] = [
  { col: 1, row: 0 },
  { col: -1, row: 0 },
  { col: 0, row: 1 },
  { col: 0, row: -1 },
];

function ray(from: Coord, directions: Coord[], distance: number): string[] {
  const out: string[] = [];
  directions.forEach((dir) => {
    for (let step = 1; step <= distance; step += 1) {
      const next = { col: from.col + dir.col * step, row: from.row + dir.row * step };
      if (!onBoard(next)) break;
      out.push(toSquare(next));
    }
  });
  return out;
}

/**
 * Squares a piece could travel to from `square`, on an empty board.
 * Rays are capped so the hint pattern stays legible rather than flooding the board.
 */
export function moveHints(piece: PieceId, square: string, maxDistance = 4): string[] {
  const from = toCoord(square);

  switch (piece) {
    case 'pawn':
      return [{ col: from.col, row: from.row - 1 }]
        .filter(onBoard)
        .map(toSquare);
    case 'knight':
      return KNIGHT_JUMPS.map((jump) => ({
        col: from.col + jump.col,
        row: from.row + jump.row,
      }))
        .filter(onBoard)
        .map(toSquare);
    case 'bishop':
      return ray(from, DIAGONALS, maxDistance);
    case 'rook':
      return ray(from, STRAIGHTS, maxDistance);
    case 'queen':
      return ray(from, [...STRAIGHTS, ...DIAGONALS], Math.min(maxDistance, 3));
    case 'king':
      return ray(from, [...STRAIGHTS, ...DIAGONALS], 1);
    default:
      return [];
  }
}
