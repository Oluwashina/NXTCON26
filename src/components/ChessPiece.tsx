import { PIECE_PATHS, PIECE_VIEWBOX } from '../data/pieceArt';
import { cn } from '../lib/cn';
import type { PieceId } from '../types';

export type PieceTone = 'ivory' | 'ink' | 'gold' | 'current';

const TONE_FILL: Record<PieceTone, string> = {
  ivory: 'url(#piece-ivory)',
  ink: 'url(#piece-ink)',
  gold: 'url(#piece-gold)',
  current: 'currentColor',
};

interface ChessPieceProps {
  piece: PieceId;
  tone?: PieceTone;
  className?: string;
  /** Adds a soft cast shadow beneath the piece, as if lit from above. */
  shadow?: boolean;
  title?: string;
}

/**
 * A single chess silhouette. Gradients live in <PieceDefs /> (mounted once at the
 * app root) so many pieces can share them without duplicating <defs>.
 */
export function ChessPiece({
  piece,
  tone = 'ivory',
  className,
  shadow = false,
  title,
}: ChessPieceProps) {
  return (
    <svg
      viewBox={`0 0 ${PIECE_VIEWBOX.width} ${PIECE_VIEWBOX.height}`}
      className={cn('h-full w-full', className)}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {shadow ? (
        <ellipse cx="50" cy="128" rx="34" ry="4.5" fill="url(#piece-shadow)" />
      ) : null}
      <g fill={TONE_FILL[tone]}>
        {PIECE_PATHS[piece].map((path, index) => (
          <path key={index} d={path.d} fillRule={path.rule} />
        ))}
      </g>
    </svg>
  );
}

/** Shared gradient definitions. Mount exactly once. */
export function PieceDefs() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0" focusable="false">
      <defs>
        <linearGradient id="piece-ivory" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="46%" stopColor="#efebe0" />
          <stop offset="100%" stopColor="#a9a396" />
        </linearGradient>
        <linearGradient id="piece-ink" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#3a3d42" />
          <stop offset="48%" stopColor="#1a1c1f" />
          <stop offset="100%" stopColor="#07080a" />
        </linearGradient>
        <linearGradient id="piece-gold" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#fff2cf" />
          <stop offset="34%" stopColor="#e4c78c" />
          <stop offset="68%" stopColor="#c6a15b" />
          <stop offset="100%" stopColor="#8c6a30" />
        </linearGradient>
        <radialGradient id="piece-shadow">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
