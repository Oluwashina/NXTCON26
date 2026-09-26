import { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { LineReveal, Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';
import { isPlayerNameValid, normalizePlayerName } from '../lib/playerName';

interface NameScreenProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function NameScreen({ value, onChange, onContinue, onBack }: NameScreenProps) {
  const field = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const valid = isPlayerNameValid(value);

  const submit = () => {
    if (!valid) {
      setTouched(true);
      field.current?.focus();
      return;
    }
    onChange(normalizePlayerName(value));
    onContinue();
  };

  return (
    <Screen className="py-16">
      <Reveal delay={0.08}>
        <span className="eyebrow">Before your first move</span>
      </Reveal>

      <LineReveal
        lines={['What should', 'we call you?']}
        delay={0.22}
        className="display ivory-text mt-6 text-[clamp(2.2rem,10vw,4.2rem)] font-medium"
      />

      <Reveal delay={0.75} className="mt-8 max-w-md">
        <p className="font-sans text-[0.86rem] font-light leading-relaxed text-ink-500">
          Your name appears on your result and share card.
        </p>
      </Reveal>

      <Reveal delay={0.95} className="mt-10">
        <div
          className="group relative border border-ink/12 bg-white/90 transition-colors duration-500 focus-within:border-gold/60 hover:border-ink/20 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.15)]"
          onClick={() => field.current?.focus()}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gold transition-transform duration-700 ease-cinema group-focus-within:scale-y-100"
          />
          <input
            ref={field}
            type="text"
            value={value}
            autoComplete="given-name"
            autoCapitalize="words"
            enterKeyHint="go"
            maxLength={32}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submit();
            }}
            onBlur={() => setTouched(true)}
            placeholder="Your first name"
            aria-label="Your name"
            aria-invalid={touched && !valid}
            className="w-full bg-transparent px-5 py-5 font-display text-[1.35rem] uppercase tracking-[0.12em] text-ink outline-none placeholder:font-sans placeholder:text-[0.9rem] placeholder:normal-case placeholder:tracking-normal placeholder:text-ink/30 sm:px-7 sm:py-6 sm:text-[1.55rem]"
          />
        </div>
        {touched && !valid ? (
          <p className="eyebrow mt-4 text-gold/70">Enter a name to continue</p>
        ) : null}
      </Reveal>

      <Reveal delay={1.15} className="mt-11 flex items-center justify-between gap-4">
        <Button variant="quiet" size="sm" onClick={onBack}>
          &larr; Back
        </Button>
        <Button variant="solid" size="lg" arrow onClick={submit}>
          Enter the board
        </Button>
      </Reveal>
    </Screen>
  );
}
