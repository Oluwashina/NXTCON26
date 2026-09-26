import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface ScreenProps {
  children: ReactNode;
  className?: string;
  /** Centres content vertically; turn off for long, scrolling screens. */
  center?: boolean;
  /** Widens the content column. */
  wide?: boolean;
}

/** A single stage of the experience. Handles page transitions and safe areas. */
export function Screen({ children, className, center = true, wide = false }: ScreenProps) {
  return (
    <motion.section
      transformTemplate={() => 'none'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col px-5 sm:px-8',
        'safe-t safe-b',
        center && 'justify-center',
        className,
      )}
    >
      <div className={cn('mx-auto flex h-full min-h-0 w-full flex-col', wide ? 'max-w-6xl' : 'max-w-3xl')}>
        {children}
      </div>
    </motion.section>
  );
}
