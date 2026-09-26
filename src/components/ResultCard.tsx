import { EVENT } from '../data/event';
import { PIECES } from '../data/pieces';
import { cardIsA } from '../lib/personalize';
import { cn } from '../lib/cn';
import type { PieceId } from '../types';
import { ChessPiece } from './ChessPiece';
import { NxtconLockup } from './ui/Brand';

interface ResultCardProps {
  piece: PieceId;
  playerName?: string;
  className?: string;
}

/** The on-screen twin of the downloadable PNG. Fixed 4:5, built to be screenshot. */
export function ResultCard({ piece, playerName = '', className }: ResultCardProps) {
  const data = PIECES[piece];

  return (
    <figure
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden',
        'result-card-dark grain',
        'shadow-[0_50px_120px_-50px_rgba(0,0,0,1)]',
        className,
      )}
    >
      {/* Chessboard floor */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[26%] opacity-30"
        style={{
          backgroundImage: 'repeating-conic-gradient(#0a0b0d 0% 25%, #cdc7b7 0% 50%)',
          backgroundSize: '2.6rem 2.6rem',
          maskImage: 'linear-gradient(to top, #000 10%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to top, #000 10%, transparent 95%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(62%_44%_at_50%_2%,rgba(255,246,224,0.16),transparent_66%)]"
      />
      <div aria-hidden className="absolute inset-[3.5%] border border-ivory/15" />

      <div className="relative flex h-full flex-col items-center px-7 py-[7%] text-center">
        <p className="font-sans text-[0.44rem] font-medium uppercase tracking-mega text-ivory-500">
          {EVENT.brand}
        </p>
        <NxtconLockup className="mt-2 text-[0.8rem] tracking-[0.28em] text-ivory" />
        <span className="mt-3 h-px w-14 hairline-gold" />

        <div className="my-auto flex w-full flex-col items-center">
          <div className="h-[7.5rem] w-[7.5rem] xs:h-[8.5rem] xs:w-[8.5rem]">
            <ChessPiece piece={piece} tone="gold" shadow title={data.name} />
          </div>

          <p className="mt-4 font-sans text-[0.46rem] font-medium uppercase tracking-mega text-ivory-500">
            {cardIsA(playerName)}
          </p>
          <p className="display ivory-text -mt-0.5 text-[2.9rem] font-medium leading-none xs:text-[3.3rem]">
            {data.name}
          </p>
          <p className="mt-1.5 font-sans text-[0.5rem] font-medium uppercase tracking-mega text-gold">
            {data.title}
          </p>

          <span className="mt-4 h-px w-20 hairline" />

          <p className="mt-4 max-w-[15rem] text-balance font-editorial text-[0.98rem] italic leading-snug text-ivory-200">
            &ldquo;{data.shareLine}&rdquo;
          </p>
        </div>

        <p className="font-display text-[0.68rem] uppercase tracking-[0.28em] text-ivory">
          KNIGHT AND BISHOP
        </p>
        <p className="mt-1.5 font-sans text-[0.44rem] font-medium uppercase tracking-mega text-ivory-500">
          {EVENT.dateShort} &middot; {EVENT.timeShort}
        </p>
      </div>
      <figcaption className="sr-only">
        {`${EVENT.name} result card — ${cardIsA(playerName)} ${data.name}, ${data.title}.`}
      </figcaption>
    </figure>
  );
}
