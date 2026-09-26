import { motion } from 'framer-motion';
import { cn } from '../lib/cn';

interface QuizOptionProps {
  label: string;
  text: string;
  selected: boolean;
  /** Another option in this question is selected. */
  dimmed: boolean;
  index: number;
  onSelect: () => void;
}

export function QuizOption({
  label,
  text,
  selected,
  dimmed,
  index,
  onSelect,
}: QuizOptionProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 0.28 + index * 0.075, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          'ring-focus group relative flex min-h-[3.25rem] w-full items-start gap-4 overflow-hidden border px-4 py-3.5 text-left',
          'select-none touch-manipulation transition-all duration-500 ease-cinema sm:gap-5 sm:px-6 sm:py-[1.15rem]',
          selected
            ? 'border-gold/70 bg-gold/[0.09] shadow-[inset_0_0_40px_-18px_rgba(228,199,140,0.45)]'
            : 'border-ink/12 bg-white/80 hover:border-ink/25 hover:bg-white shadow-[0_8px_28px_-22px_rgba(0,0,0,0.12)]',
          dimmed && !selected && 'opacity-45',
        )}
      >
        {/* Gold edge that slides in on hover */}
        <span
          aria-hidden
          className={cn(
            'absolute inset-y-0 left-0 w-px origin-top bg-gold transition-transform duration-700 ease-cinema',
            selected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100',
          )}
        />

        <span
          className={cn(
            'mt-[0.1rem] shrink-0 font-display text-[0.92rem] font-medium leading-none transition-colors duration-500',
            selected ? 'text-gold-deep' : 'text-ink/35 group-hover:text-ink/60',
          )}
        >
          {label}
        </span>

        <span
          className={cn(
            'font-sans text-[0.86rem] font-light leading-snug transition-colors duration-500 sm:text-[0.95rem]',
            selected ? 'text-ink' : 'text-ink-600 group-hover:text-ink-800',
          )}
        >
          {text}
        </span>

        {/* Selection mark */}
        <span
          aria-hidden
          className={cn(
            'ml-auto mt-[0.15rem] shrink-0 text-gold-light transition-all duration-500 ease-cinema',
            selected ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0',
          )}
        >
          &#9679;
        </span>
      </button>
    </motion.li>
  );
}
