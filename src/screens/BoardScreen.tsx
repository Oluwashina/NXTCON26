import { useState } from 'react';
import { ChessBoard, type Placement } from '../components/ChessBoard';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';
import { ALL_PIECES } from '../data/pieces';
import { moveHints } from '../lib/board';
import { cn } from '../lib/cn';
import type { PieceId } from '../types';

const PLACEMENTS: Placement[] = [
  { piece: 'pawn', square: 'c2' },
  { piece: 'knight', square: 'e4' },
  { piece: 'bishop', square: 'g6' },
  { piece: 'rook', square: 'a5' },
  { piece: 'queen', square: 'd7' },
  { piece: 'king', square: 'f2' },
];

const SQUARE_BY_PIECE = PLACEMENTS.reduce<Record<string, string>>(
  (acc, { piece, square }) => ({ ...acc, [piece]: square }),
  {},
);

interface BoardScreenProps {
  onBegin: () => void;
  onBack: () => void;
}

export function BoardScreen({ onBegin, onBack }: BoardScreenProps) {
  const [active, setActive] = useState<PieceId | null>(null);
  const hints = active ? moveHints(active, SQUARE_BY_PIECE[active]) : [];

  return (
    <Screen wide center={false} className="justify-center py-16">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        {/* Board */}
        <Reveal delay={0.15} duration={1.3} y={24} className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
            <ChessBoard
              placements={PLACEMENTS}
              hints={hints}
              activePiece={active}
              onPieceHover={setActive}
              onPieceSelect={(piece) => setActive((current) => (current === piece ? null : piece))}
              interactive
              perspective
              showCoordinates
            />
            <p className="eyebrow mt-9 text-center text-ivory/30 lg:mt-10">
              Touch a piece to watch it move
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal delay={0.1}>
            <span className="eyebrow">The board</span>
          </Reveal>

          <Reveal delay={0.25} duration={1.3}>
            <h2 className="display ivory-text mt-5 text-[clamp(2rem,8.5vw,3.6rem)] font-medium">
              Every piece
              <br />
              moves
              <span className="font-display italic"> differently.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.45} className="mt-8 h-px w-full hairline" />

          <ul className="mt-7 space-y-1">
            {ALL_PIECES.map((piece, index) => {
              const isActive = active === piece.id;
              return (
                <Reveal key={piece.id} delay={0.55 + index * 0.08} y={12} as="li">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(piece.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(piece.id)}
                    onBlur={() => setActive(null)}
                    onClick={() =>
                      setActive((current) => (current === piece.id ? null : piece.id))
                    }
                    className={cn(
                      'ring-focus group flex w-full items-baseline gap-3 py-2 text-left transition-all duration-500 ease-cinema sm:gap-4',
                      isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                    )}
                  >
                    <span
                      className={cn(
                        'h-px shrink-0 transition-all duration-500 ease-cinema',
                        isActive ? 'w-8 bg-gold' : 'w-3 bg-ivory/30',
                      )}
                    />
                    <span className="font-sans text-[0.78rem] font-light leading-relaxed sm:text-[0.86rem]">
                      <span
                        className={cn(
                          'font-medium uppercase tracking-widest transition-colors duration-500',
                          isActive ? 'text-gold-light' : 'text-ivory',
                        )}
                      >
                        The {piece.name}
                      </span>
                      <span className="text-ivory-400"> {piece.movement}.</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={1.15} className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button variant="solid" size="lg" arrow onClick={onBegin} className="sm:w-auto">
              Begin the experience
            </Button>
            <Button variant="quiet" size="sm" onClick={onBack}>
              &larr; Back
            </Button>
          </Reveal>
        </div>
      </div>
    </Screen>
  );
}
