import { EVENT } from '../../data/event';
import { cn } from '../../lib/cn';

/** The New Church mark, as it sits in the corner of the event artwork. */
export function BrandMark({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img
        src="/brand/the-new-icon-gold.png"
        alt=""
        aria-hidden
        className="h-6 w-6 object-contain opacity-85 sm:h-7 sm:w-7"
      />
      {showWordmark ? (
        <span className="font-sans text-[0.54rem] font-medium uppercase leading-tight tracking-mega text-ink-600">
          The
          <br />
          New
        </span>
      ) : (
        <span className="sr-only">{EVENT.brand}</span>
      )}
    </div>
  );
}

/**
 * "NXTCON26" set the way the artwork sets it: heavy sans for the word,
 * gold for the year.
 */
export function NxtconLockup({
  className,
  yearClassName,
}: {
  className?: string;
  yearClassName?: string;
}) {
  return (
    <span className={cn('font-sans font-semibold uppercase tracking-[0.06em]', className)}>
      NXTCON
      <span className={cn('gold-text font-display font-semibold', yearClassName)}>26</span>
    </span>
  );
}
