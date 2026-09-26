import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'solid' | 'outline' | 'quiet' | 'gold';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  solid:
    'bg-ivory text-ink border border-ivory hover:bg-white hover:border-white shadow-[0_18px_50px_-24px_rgba(242,239,231,0.7)]',
  gold:
    'border border-gold/70 bg-gradient-to-b from-gold-light/95 to-gold text-ink hover:from-white hover:to-gold-light shadow-[0_18px_50px_-24px_rgba(198,161,91,0.9)]',
  outline:
    'border border-ivory/25 text-ivory hover:border-gold/70 hover:text-gold-light bg-ivory/[0.03] hover:bg-ivory/[0.07]',
  quiet: 'border border-transparent text-ivory-400 hover:text-ivory',
};

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-[0.62rem] tracking-widest',
  md: 'px-6 py-3.5 text-[0.68rem] tracking-widest',
  lg: 'px-8 py-4 text-[0.7rem] tracking-mega sm:px-10 sm:py-[1.15rem]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Renders a trailing arrow that nudges on hover. */
  arrow?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'outline',
  size = 'md',
  arrow = false,
  icon,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'ring-focus group relative inline-flex items-center justify-center gap-3 overflow-hidden',
        'touch-manipulation font-sans font-medium uppercase',
        'transition-all duration-500 ease-cinema active:scale-[0.985]',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
    >
      {/* Light sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-[900ms] ease-cinema group-hover:left-full group-hover:opacity-100"
      />
      {icon ? <span className="relative shrink-0">{icon}</span> : null}
      <span className="relative">{children}</span>
      {arrow ? (
        <span
          aria-hidden
          className="relative translate-x-0 text-[1.05em] leading-none transition-transform duration-500 ease-cinema group-hover:translate-x-1.5"
        >
          &rarr;
        </span>
      ) : null}
    </button>
  );
}
