import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Optional so <Reveal /> can also animate in bare rules and dividers. */
  children?: ReactNode;
  /** Seconds before the reveal starts. */
  delay?: number;
  duration?: number;
  /** Travel distance in px. Use 0 for a pure fade. */
  y?: number;
  blur?: boolean;
  as?: ElementType;
  className?: string;
}

/**
 * The house reveal: a slow blurred rise. Used for nearly every block of copy so
 * the whole experience shares one rhythm.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 1.1,
  y = 16,
  blur = true,
  as = 'div',
  className,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as as 'div'] ?? motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

interface LineRevealProps {
  /** Each string becomes its own line with a staggered reveal. */
  lines: string[];
  delay?: number;
  stagger?: number;
  className?: string;
  lineClassName?: string;
}

/** Stacked lines that rise one after another from behind a mask. */
export function LineReveal({
  lines,
  delay = 0,
  stagger = 0.16,
  className,
  lineClassName,
}: LineRevealProps) {
  return (
    <div className={cn(className)}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: delay + index * stagger,
              duration: 1.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn('block', lineClassName)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
