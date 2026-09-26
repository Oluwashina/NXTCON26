import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChessPiece } from '../components/ChessPiece';
import { Button } from '../components/ui/Button';
import { LineReveal, Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';
import { PIECES } from '../data/pieces';
import type { PieceId } from '../types';

interface ReflectionScreenProps {
  piece: PieceId;
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const LIMIT = 220;

export function ReflectionScreen({
  piece,
  value,
  onChange,
  onContinue,
  onBack,
}: ReflectionScreenProps) {
  const field = useRef<HTMLTextAreaElement>(null);
  const data = PIECES[piece];
  const hasAnswer = value.trim().length > 0;

  return (
    <Screen className="py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 h-[46vh] w-[46vh] -translate-y-1/2 opacity-[0.07]"
      >
        <ChessPiece piece={piece} tone="ivory" />
      </div>

      <div className="relative">
        <Reveal delay={0.1}>
          <span className="eyebrow">Reflection</span>
        </Reveal>

        <LineReveal
          lines={['Every piece', 'has a purpose.']}
          delay={0.3}
          className="display ivory-text mt-6 text-[clamp(2.2rem,10vw,4.4rem)] font-medium"
        />

        <Reveal delay={0.9} className="mt-8 max-w-lg">
          <p className="font-sans text-[0.86rem] font-light leading-relaxed text-ivory-400">
            The {data.name.toLowerCase()} is only powerful when it moves. Yours included.
          </p>
        </Reveal>

        <Reveal delay={1.1} className="mt-12">
          <h2 className="font-editorial text-[clamp(1.5rem,6.5vw,2.4rem)] italic leading-tight text-ivory">
            What move have you been postponing?
          </h2>
        </Reveal>

        <Reveal delay={1.3} className="mt-7">
          <div
            className="group relative border border-ivory/12 bg-ivory/[0.02] transition-colors duration-500 focus-within:border-gold/60 hover:border-ivory/25"
            onClick={() => field.current?.focus()}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gold transition-transform duration-700 ease-cinema group-focus-within:scale-y-100"
            />
            <textarea
              ref={field}
              value={value}
              maxLength={LIMIT}
              onChange={(event) => onChange(event.target.value)}
              rows={4}
              placeholder="Write it here. Only you will see it."
              aria-label="What move have you been postponing?"
              className="w-full resize-none bg-transparent px-5 py-5 font-editorial text-[1.1rem] italic leading-relaxed text-ivory outline-none placeholder:text-ivory/25 sm:px-7 sm:py-6 sm:text-[1.25rem]"
            />
            <div className="flex items-center justify-between border-t border-ivory/10 px-5 py-3 sm:px-7">
              <p className="eyebrow text-ivory/25">Never saved · never sent</p>
              <p className="font-display text-[0.7rem] text-ivory/30">
                {value.length}/{LIMIT}
              </p>
            </div>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasAnswer ? 1 : 0, height: hasAnswer ? 'auto' : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-6 font-sans text-[0.8rem] font-light leading-relaxed text-gold/70">
            Then that is your next move. Hold on to it.
          </p>
        </motion.div>

        <Reveal delay={1.5} className="mt-11 flex items-center justify-between gap-4">
          <Button variant="quiet" size="sm" onClick={onBack}>
            &larr; My result
          </Button>
          <Button variant="solid" size="lg" arrow onClick={onContinue}>
            My next move
          </Button>
        </Reveal>
      </div>
    </Screen>
  );
}
