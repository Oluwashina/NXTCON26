import type { PieceId } from '../types';

/**
 * Minimal, editorial chess silhouettes drawn as raw path data so the exact same
 * geometry can be rendered as SVG in the DOM and as a Path2D on a <canvas>
 * (used by the downloadable result card).
 *
 * All paths share one coordinate space: viewBox 0 0 100 132, piece standing on
 * the baseline at y = 129.
 */
export interface PiecePath {
  d: string;
  /** Subpaths that punch holes (bishop mitre slit, knight eye) need even-odd. */
  rule?: 'evenodd';
}

export const PIECE_VIEWBOX = { width: 100, height: 132 } as const;

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0 Z`;

const BASE_WIDE: PiecePath[] = [
  { d: 'M28 100 C28 109 21 111 18 121 H82 C79 111 72 109 72 100 Z' },
  { d: 'M13 121 H87 V129 H13 Z' },
];

const BASE_SLIM: PiecePath[] = [
  { d: 'M33 100 C33 109 26 111 23 121 H77 C74 111 67 109 67 100 Z' },
  { d: 'M18 121 H82 V129 H18 Z' },
];

export const PIECE_PATHS: Record<PieceId, PiecePath[]> = {
  pawn: [
    { d: circle(50, 40, 15) },
    { d: 'M34 55 H66 L62 68 H38 Z' },
    { d: 'M42 68 C42 80 41 90 40 100 H60 C59 90 58 80 58 68 Z' },
    ...BASE_SLIM,
  ],
  knight: [
    {
      d:
        'M19 64 L33 43 C35 39 37 34 37 28 L45 34 L51 17 L58 31 C72 37 81 50 81 66 ' +
        'C81 80 77 89 75 100 H40 C40 89 34 81 27 76 C22 72 19 68 19 64 Z ' +
        'M33 47 L37 45 L39 49 L35 51 Z',
      rule: 'evenodd',
    },
    ...BASE_WIDE,
  ],
  bishop: [
    { d: circle(50, 17, 5.5) },
    {
      d:
        'M50 24 C63 32 70 46 68 62 H32 C30 46 37 32 50 24 Z ' +
        'M56 33 L63 45 L60 47 L53 35 Z',
      rule: 'evenodd',
    },
    { d: 'M29 62 H71 L67 72 H33 Z' },
    { d: 'M37 72 C37 84 36 92 35 100 H65 C64 92 63 84 63 72 Z' },
    ...BASE_WIDE,
  ],
  rook: [
    { d: 'M29 28 H38.5 V38 H45.2 V28 H54.8 V38 H61.5 V28 H71 V50 H29 Z' },
    { d: 'M27 50 H73 L68 60 H32 Z' },
    { d: 'M36 60 C36 76 35 88 34 100 H66 C65 88 64 76 64 60 Z' },
    ...BASE_WIDE,
  ],
  queen: [
    { d: 'M22 36 L29 52 L36 26 L43 48 L50 18 L57 48 L64 26 L71 52 L78 36 L73 64 H27 Z' },
    { d: circle(22, 31, 5) },
    { d: circle(36, 21, 5) },
    { d: circle(50, 13, 5.5) },
    { d: circle(64, 21, 5) },
    { d: circle(78, 31, 5) },
    { d: 'M25 64 H75 L70 74 H30 Z' },
    { d: 'M34 74 C34 85 32 93 31 100 H69 C68 93 66 85 66 74 Z' },
    ...BASE_WIDE,
  ],
  king: [
    { d: 'M45.5 6 H54.5 V17 H65 V26 H54.5 V38 H45.5 V26 H35 V17 H45.5 Z' },
    { d: 'M23 42 L30 64 H70 L77 42 L64 55 L56 43 H44 L36 55 Z' },
    { d: 'M26 64 H74 L69 74 H31 Z' },
    { d: 'M35 74 C35 85 33 93 32 100 H68 C67 93 65 85 65 74 Z' },
    ...BASE_WIDE,
  ],
};
