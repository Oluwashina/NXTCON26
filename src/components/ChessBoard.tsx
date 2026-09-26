import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FILES, RANKS, isLightSquare, toCoord } from '../lib/board';
import { cn } from '../lib/cn';
import type { PieceId } from '../types';
import { ChessPiece, type PieceTone } from './ChessPiece';

export interface Placement {
  piece: PieceId;
  square: string;
  tone?: PieceTone;
}

interface ChessBoardProps {
  placements?: Placement[];
  /** Squares lit with a soft gold wash — used for move hints. */
  hints?: string[];
  activePiece?: PieceId | null;
  onPieceHover?: (piece: PieceId | null) => void;
  onPieceSelect?: (piece: PieceId) => void;
  interactive?: boolean;
  showCoordinates?: boolean;
  /** Slight 3D rake, as if the board recedes into the room. */
  perspective?: boolean;
  /** Shorter tilt-in when the board first appears on flow screens. */
  perspectiveSnap?: boolean;
  className?: string;
  overlay?: ReactNode;
}

const CELL = 12.5;

export function ChessBoard({
  placements = [],
  hints = [],
  activePiece = null,
  onPieceHover,
  onPieceSelect,
  interactive = false,
  showCoordinates = false,
  perspective = false,
  perspectiveSnap = false,
  className,
  overlay,
}: ChessBoardProps) {
  const hintSet = new Set(hints);
  const boardTilt = perspectiveSnap
    ? { rotateX: 11, scale: 0.98 }
    : perspective
      ? { rotateX: 11, scale: 0.98 }
      : undefined;

  return (
    <div
      className={cn(
        'relative aspect-square w-full select-none',
        perspective && '[perspective:1400px]',
        className,
      )}
    >
      <motion.div
        initial={
          perspectiveSnap
            ? { opacity: 0, rotateX: 16, scale: 0.94, y: 12 }
            : false
        }
        animate={
          boardTilt
            ? { opacity: 1, rotateX: boardTilt.rotateX, scale: boardTilt.scale, y: 0 }
            : { opacity: 1 }
        }
        transition={
          perspectiveSnap
            ? { duration: 0.58, ease: [0.16, 1, 0.3, 1] }
            : perspective
              ? { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
              : undefined
        }
        style={{ transformPerspective: perspective ? 1400 : undefined }}
        className={cn(
          'relative h-full w-full overflow-hidden',
          'shadow-[0_40px_120px_-40px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.08)]',
        )}
      >
        {/* Squares */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {RANKS.map((rank, row) =>
            FILES.map((file, col) => {
              const square = `${file}${rank}`;
              const light = isLightSquare(col, row);
              return (
                <div
                  key={square}
                  className={cn(
                    'relative',
                    light ? 'board-square-light' : 'board-square-dark',
                  )}
                >
                  {hintSet.has(square) ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <span
                        className={cn(
                          'block h-[22%] w-[22%] rounded-full',
                          light
                            ? 'bg-gold-deep/70 shadow-[0_0_10px_rgba(148,115,58,0.5)]'
                            : 'bg-gold-light/85 shadow-[0_0_14px_rgba(228,199,140,0.55)]',
                        )}
                      />
                    </motion.span>
                  ) : null}
                </div>
              );
            }),
          )}
        </div>

        {/* Lighting pass over the board */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_8%,rgba(255,248,229,0.16),transparent_62%),linear-gradient(to_bottom,transparent_45%,rgba(0,0,0,0.5))]"
        />
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-70"
        />

        {/* Pieces */}
        <div className="absolute inset-0">
          {placements.map(({ piece, square, tone }) => {
            const { col, row } = toCoord(square);
            const isActive = activePiece === piece;
            const dimmed = activePiece !== null && !isActive;

            const content = (
              <ChessPiece
                piece={piece}
                tone={tone ?? (isLightSquare(col, row) ? 'ink' : 'ivory')}
                shadow
                title={piece}
                className={cn(
                  'transition-[filter,opacity] duration-700 ease-cinema',
                  isActive && 'drop-shadow-[0_0_18px_rgba(228,199,140,0.45)]',
                  dimmed && 'opacity-35',
                )}
              />
            );

            return (
              <motion.div
                key={piece}
                layout
                initial={false}
                animate={{ left: `${col * CELL}%`, top: `${row * CELL}%` }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                className="absolute"
                style={{ width: `${CELL}%`, height: `${CELL}%` }}
              >
                <div className="relative grid h-full w-full place-items-center p-[7%]">
                  {interactive ? (
                    <button
                      type="button"
                      onMouseEnter={() => onPieceHover?.(piece)}
                      onMouseLeave={() => onPieceHover?.(null)}
                      onFocus={() => onPieceHover?.(piece)}
                      onBlur={() => onPieceHover?.(null)}
                      onClick={() => onPieceSelect?.(piece)}
                      aria-label={`${piece} — see how it moves`}
                      className="ring-focus h-full w-full cursor-pointer transition-transform duration-500 ease-cinema hover:-translate-y-[6%] hover:scale-[1.08] focus-visible:-translate-y-[6%]"
                    >
                      {content}
                    </button>
                  ) : (
                    content
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {overlay}
      </motion.div>

      {showCoordinates ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-6 left-0 right-0 grid grid-cols-8 text-center font-sans text-[0.55rem] uppercase tracking-widest text-ink/35"
          >
            {FILES.map((file) => (
              <span key={file}>{file}</span>
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-5 bottom-0 top-0 grid grid-rows-8 items-center font-sans text-[0.55rem] tracking-widest text-ink/35"
          >
            {RANKS.map((rank) => (
              <span key={rank}>{rank}</span>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
