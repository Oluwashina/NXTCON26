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
  /** Shorter motion for form / flow screens after a page change. */
  snappy?: boolean;
  /** When false, only the parent screen fades out (avoids stacked exit delays). */
  animateExit?: boolean;
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
  snappy = false,
  animateExit = true,
  as = 'div',
  className,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as as 'div'] ?? motion.div;
  const move = snappy ? Math.min(y, 8) : y;
  const useBlur = snappy ? false : blur;
  const moveDuration = snappy ? Math.min(duration, 0.42) : duration;
  const exitDuration = snappy ? 0.06 : 0.12;

  return (
    <MotionTag
      initial={{ opacity: 0, y: move, filter: useBlur ? 'blur(10px)' : 'blur(0px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={
        animateExit
          ? {
              opacity: 0,
              y: snappy ? 0 : -6,
              filter: 'blur(0px)',
              transition: { duration: exitDuration, delay: 0, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      transition={{ delay, duration: moveDuration, ease: [0.16, 1, 0.3, 1] }}
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
  snappy?: boolean;
}

/** Stacked lines that rise one after another from behind a mask. */
export function LineReveal({
  lines,
  delay = 0,
  stagger = 0.16,
  className,
  lineClassName,
  snappy = false,
}: LineRevealProps) {
  const lineDuration = snappy ? 0.44 : 1.25;
  const lineStagger = snappy ? 0.05 : stagger;
  return (
    <div className={cn(className)}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: delay + index * lineStagger,
              duration: lineDuration,
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
