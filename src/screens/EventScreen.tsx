import { EventCTA } from '../components/EventCTA';
import { BrandMark, NxtconLockup } from '../components/ui/Brand';
import { Button } from '../components/ui/Button';
import { LineReveal, Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';
import { EVENT } from '../data/event';
import { PIECES } from '../data/pieces';
import { useCountdown } from '../hooks/useCountdown';
import type { PieceId } from '../types';

interface EventScreenProps {
  piece: PieceId;
  onRestart: () => void;
  onBack: () => void;
}

export function EventScreen({ piece, onRestart, onBack }: EventScreenProps) {
  const countdown = useCountdown(EVENT.startsAt);
  const data = PIECES[piece];

  return (
    <Screen center={false} wide className="justify-center py-16">
      <Reveal delay={0.1} className="text-center">
        <span className="eyebrow">The invitation</span>
      </Reveal>

      <LineReveal
        lines={["Your move", "doesn't end here."]}
        delay={0.3}
        className="display ivory-text mt-6 text-center text-[clamp(2.1rem,9.5vw,4.6rem)] font-medium"
      />

      <Reveal delay={0.7} className="mx-auto mt-10 h-px w-full max-w-md hairline-gold sm:mt-14">
        <span className="sr-only"> </span>
      </Reveal>

      {/* Event block */}
      <div className="mt-10 grid items-center gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
        <div className="text-center lg:text-left">
          <Reveal delay={0.8}>
            <NxtconLockup className="block text-[clamp(2.4rem,11vw,4.6rem)] tracking-[0.04em] text-ivory" />
          </Reveal>

          <Reveal delay={0.95}>
            <p className="display mt-3 text-[clamp(1.2rem,5.4vw,2.1rem)] tracking-[0.12em] text-gold-light/90">
              {EVENT.themeDisplay}
            </p>
          </Reveal>

          <Reveal delay={1.05} className="mt-9 space-y-6">
            <div>
              <p className="eyebrow text-ivory/30">When</p>
              <p className="mt-2 font-sans text-[0.92rem] font-light uppercase tracking-widest text-ivory">
                {EVENT.dateLabel} &middot; {EVENT.timeShort}
              </p>
            </div>
            <div>
              <p className="eyebrow text-ivory/30">Where</p>
              <address className="mt-2 font-sans text-[0.85rem] font-light not-italic leading-relaxed text-ivory-200">
                {EVENT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </Reveal>

          <Reveal delay={1.15} className="mt-10">
            <div className="h-px w-full hairline" />
            <div className="mt-6 space-y-1.5">
              {EVENT.invitation.map((line) => (
                <p
                  key={line}
                  className="font-editorial text-[1.15rem] italic leading-snug text-ivory-200 sm:text-[1.3rem]"
                >
                  {line}
                </p>
              ))}
            </div>
          </Reveal>

          {!countdown.elapsed ? (
            <Reveal delay={1.25} className="mt-11">
              <p className="eyebrow text-ivory/30">Time until the first move</p>
              <div className="mt-4 flex justify-center gap-6 lg:justify-start sm:gap-9">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hrs' },
                  { value: countdown.minutes, label: 'Min' },
                  { value: countdown.seconds, label: 'Sec' },
                ].map((unit) => (
                  <div key={unit.label} className="text-center lg:text-left">
                    <p className="font-display text-[1.7rem] leading-none text-ivory sm:text-[2.1rem]">
                      {String(unit.value).padStart(2, '0')}
                    </p>
                    <p className="mt-1.5 font-sans text-[0.5rem] font-medium uppercase tracking-mega text-ivory/30">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* Poster */}
        <Reveal delay={0.9} y={26} className="mx-auto w-full max-w-[20rem] lg:max-w-none">
          <div className="relative border border-ivory/15 p-2.5 shadow-[0_50px_120px_-60px_rgba(0,0,0,1)]">
            <img
              src="/brand/nxtcon26-poster.png"
              alt={`${EVENT.name} — ${EVENT.themeDisplay} event artwork`}
              loading="lazy"
              className="w-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-2.5 bg-[linear-gradient(115deg,transparent_42%,rgba(255,255,255,0.08)_50%,transparent_58%)]"
            />
          </div>
          <p className="eyebrow mt-5 text-center text-ivory/25">
            You move like the {data.name.toLowerCase()} &mdash; come and use it
          </p>
        </Reveal>
      </div>

      {/* Actions */}
      <Reveal delay={1.35} className="mx-auto mt-16 w-full max-w-xl">
        <EventCTA piece={piece} />
      </Reveal>

      <Reveal delay={1.5} className="mt-16">
        <div className="h-px w-full hairline" />
        <footer className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <BrandMark />
          <div className="flex items-center gap-4">
            <a
              href={EVENT.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors duration-500 hover:text-gold-light"
            >
              @thenewchurch
            </a>
            <span aria-hidden className="h-3 w-px bg-ivory/15" />
            <Button variant="quiet" size="sm" onClick={onRestart}>
              Start over
            </Button>
          </div>
        </footer>
        <div className="mt-8 flex justify-center">
          <Button variant="quiet" size="sm" onClick={onBack}>
            &larr; Back to my reflection
          </Button>
        </div>
      </Reveal>
    </Screen>
  );
}
