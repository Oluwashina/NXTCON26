import { cn } from '../../lib/cn';

type BackdropVariant = 'hall' | 'void' | 'chamber';

interface BackdropProps {
  variant?: BackdropVariant;
  className?: string;
}

/**
 * The room the whole experience happens in: marble walls, a receding
 * chessboard floor and a single overhead key light.
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
      {variant === 'hall' ? <CheckeredFloor /> : null}

      {variant === 'chamber' ? (
        <>
          <CheckeredFloor className="opacity-[0.22]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_45%,rgba(198,161,91,0.09),transparent_70%)]" />
        </>
      ) : null}

      {/* Faint column light shafts */}
      <div className="absolute inset-0 animate-breathe bg-[linear-gradient(97deg,transparent_18%,rgba(255,247,226,0.045)_20%,transparent_23%),linear-gradient(84deg,transparent_71%,rgba(255,247,226,0.035)_73%,transparent_76%)]" />
    </div>
  );
}

function CheckeredFloor({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-1/2 h-[52vh] w-[420vw] -translate-x-1/2 opacity-[0.34]',
        '[transform-origin:bottom_center] [transform:perspective(520px)_rotateX(74deg)]',
        className,
      )}
      style={{
        backgroundImage:
          'repeating-conic-gradient(#0a0b0d 0% 25%, #cdc7b7 0% 50%)',
        backgroundSize: '7.2rem 7.2rem',
        maskImage:
          'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 42%, transparent 78%)',
        WebkitMaskImage:
          'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 42%, transparent 78%)',
      }}
    />
  );
}
