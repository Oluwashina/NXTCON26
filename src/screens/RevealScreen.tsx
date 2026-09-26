import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ResultReveal } from '../components/ResultReveal';
import { ResultCard } from '../components/ResultCard';
import { ShareButtons } from '../components/ShareButtons';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';
import { PIECES } from '../data/pieces';
import { TOTAL_MOVES } from '../data/questions';
import { cn } from '../lib/cn';
import type { PieceId, ScoreResult } from '../types';

interface RevealScreenProps {
  piece: PieceId;
  playerName?: string;
  /** Absent for shared links, where only the piece is known. */
  score?: ScoreResult | null;
  /** Skips the calculating sequence (deep-linked results). */
  instant?: boolean;
  onContinue: () => void;
  onRetake: () => void;
}

export function RevealScreen({
  piece,
  playerName = '',
  score = null,
  instant = false,
  onContinue,
  onRetake,
}: RevealScreenProps) {
  const [revealed, setRevealed] = useState(instant);
  const data = PIECES[piece];
  const beat = (late: number) => (instant ? Math.min(0.35, late * 0.12) : late);

  return (
    <Screen center={false} className="justify-center py-14">
      <ResultReveal
        piece={piece}
        playerName={playerName}
        instant={instant}
        onRevealed={() => setRevealed(true)}
      />

      <AnimatePresence>
        {revealed ? (
          <div key="body">
            {/* Strength / Move */}
            <Reveal delay={beat(2.0)} className="mt-12 sm:mt-14">
              <dl className="grid grid-cols-2 divide-x divide-ink/10 border-y border-ink/10">
                <Stat label="Strength" value={data.strength} />
                <Stat label="Your move" value={data.move} accent />
              </dl>
            </Reveal>

            {/* Description */}
            <Reveal delay={beat(2.25)} className="mx-auto mt-11 max-w-xl space-y-5 text-center">
              {data.description.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    'text-pretty',
                    index === 0
                      ? 'font-editorial text-[1.3rem] italic leading-snug text-ink-800 sm:text-[1.6rem]'
                      : 'font-sans text-[0.88rem] font-light leading-relaxed text-ink-600 sm:text-[0.95rem]',
                    index === data.description.length - 1 &&
                      'font-sans text-[0.62rem] font-medium uppercase not-italic tracking-mega text-gold/80 sm:text-[0.68rem]',
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {score ? (
              <Reveal delay={beat(2.5)} className="mt-14">
                <BoardReadout score={score} />
              </Reveal>
            ) : null}

            {/* Share card */}
            <Reveal delay={beat(2.65)} className="mt-16">
              <div className="text-center">
                <span className="eyebrow">Your card</span>
                <div className="mx-auto mt-6 h-px w-10 hairline" />
              </div>
              <div className="mt-8">
                <ResultCard piece={piece} playerName={playerName} />
              </div>
              <div className="mx-auto mt-8 max-w-sm">
                <ShareButtons piece={piece} playerName={playerName} />
              </div>
            </Reveal>

            {/* Onward */}
            <Reveal delay={beat(2.85)} className="mt-16 flex flex-col items-center gap-5">
              <div className="h-px w-full hairline" />
              <Button variant="solid" size="lg" arrow onClick={onContinue}>
                Every piece has a purpose
              </Button>
              <Button variant="quiet" size="sm" onClick={onRetake}>
                Play the {TOTAL_MOVES} moves again
              </Button>
            </Reveal>
          </div>
        ) : null}
      </AnimatePresence>
    </Screen>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="px-4 py-5 text-center sm:px-6 sm:py-6">
      <dt className="eyebrow">{label}</dt>
      <dd
        className={cn(
          'mt-2.5 font-display text-[1.05rem] uppercase leading-tight tracking-[0.1em] sm:text-[1.25rem]',
          accent ? 'gold-text' : 'text-ink-800',
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function BoardReadout({ score }: { score: ScoreResult }) {
  const max = Math.max(...Object.values(score.scores), 1);

  return (
    <div>
      <div className="text-center">
        <span className="eyebrow">Your board</span>
        <div className="mx-auto mt-6 h-px w-10 hairline" />
      </div>

      <ul className="mx-auto mt-7 max-w-md space-y-3">
        {score.ranking.map((id, index) => {
          const value = score.scores[id];
          return (
            <li key={id} className="flex items-center gap-4">
              <span
                className={cn(
                  'w-[5.5rem] shrink-0 font-sans text-[0.58rem] font-medium uppercase tracking-widest',
                  index === 0 ? 'text-gold-deep' : 'text-ink/50',
                )}
              >
                {PIECES[id].name}
              </span>
              <span className="relative h-px flex-1 bg-ink/10">
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 block transition-[width] duration-[1400ms] ease-cinema',
                    index === 0 ? 'bg-gold' : 'bg-ink/35',
                  )}
                  style={{ width: `${(value / max) * 100}%` }}
                />
              </span>
              <span className="w-6 shrink-0 text-right font-display text-[0.75rem] text-ink/50">
                {value}
              </span>
            </li>
          );
        })}
      </ul>

      {score.wasTie ? (
        <p className="eyebrow mt-6 text-center text-ink/45">
          Tie resolved by your final move
        </p>
      ) : null}
    </div>
  );
}
