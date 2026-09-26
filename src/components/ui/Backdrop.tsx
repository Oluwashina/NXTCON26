import { cn } from '../../lib/cn';

type BackdropVariant = 'hall' | 'void' | 'chamber';

interface BackdropProps {
  variant?: BackdropVariant;
  className?: string;
}

/**
 * Light editorial hall: cream marble, soft daylight, chess floor as accent only.
 */
export function Backdrop({ variant = 'hall', className }: BackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'marble grain vignette keylight pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      {(variant === 'hall' || variant === 'chamber') && (
        <CheckeredFloor className={variant === 'chamber' ? 'opacity-[0.2]' : 'opacity-[0.26]'} />
      )}

      {variant === 'chamber' ? (
        <div className="absolute inset-0 bg-[radial-gradient(55%_38%_at_50%_42%,rgba(198,161,91,0.07),transparent_72%)]" />
      ) : null}

      <div className="absolute inset-0 animate-breathe bg-[linear-gradient(97deg,transparent_18%,rgba(255,255,255,0.55)_20%,transparent_23%),linear-gradient(84deg,transparent_71%,rgba(255,255,255,0.4)_73%,transparent_76%)]" />
    </div>
  );
}

function CheckeredFloor({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-1/2 h-[42vh] w-[420vw] -translate-x-1/2',
        '[transform-origin:bottom_center] [transform:perspective(520px)_rotateX(74deg)]',
        className,
      )}
      style={{
        backgroundImage:
          'repeating-conic-gradient(#0a0b0d 0% 25%, #e6e1d5 0% 50%)',
        backgroundSize: '7.2rem 7.2rem',
        maskImage:
          'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 38%, transparent 72%)',
        WebkitMaskImage:
          'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 38%, transparent 72%)',
      }}
    />
  );
}
