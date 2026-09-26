import { motion } from 'framer-motion';
import { cn } from '../lib/cn';

interface QuizProgressProps {
  /** 1-based. */
  current: number;
  total: number;
  /** Which moves already have an answer, for the tick marks. */
  answered: boolean[];
  onJump?: (index: number) => void;
  className?: string;
}

const pad = (value: number) => String(value).padStart(2, '0');

/** "MOVE 03 / 07" with a row of move ticks instead of a progress bar. */
export function QuizProgress({
  current,
  total,
  answered,
  onJump,
  className,
}: QuizProgressProps) {
  return (
    <div className={cn('flex items-center gap-5', className)}>
      <p className="flex shrink-0 items-baseline gap-2 font-sans uppercase">
        <span className="text-[0.55rem] font-medium tracking-mega text-ivory/40">Move</span>
        <span className="relative inline-flex items-baseline">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="gold-text font-display text-[1.35rem] font-semibold leading-none"
          >
            {pad(current)}
          </motion.span>
          <span className="ml-1.5 font-display text-[0.8rem] leading-none text-ivory/35">
            / {pad(total)}
          </span>
        </span>
      </p>

      <div className="flex flex-1 items-center gap-[3px] sm:gap-1.5">
        {Array.from({ length: total }, (_, index) => {
          const isCurrent = index === current - 1;
          const isAnswered = answered[index];
          const reachable = isAnswered || index < current - 1;

          return (
            <button
              key={index}
              type="button"
              disabled={!onJump || !reachable}
              onClick={() => onJump?.(index)}
              aria-label={`Move ${pad(index + 1)}`}
              aria-current={isCurrent || undefined}
              className={cn(
                'ring-focus group relative h-5 flex-1 min-w-0',
                reachable && onJump ? 'cursor-pointer' : 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'absolute left-0 right-0 top-1/2 block -translate-y-1/2 transition-all duration-700 ease-cinema',
                  isCurrent
                    ? 'h-[2px] bg-gold'
                    : isAnswered
                      ? 'h-px bg-ivory/55 group-hover:bg-gold-light'
                      : 'h-px bg-ivory/15',
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
