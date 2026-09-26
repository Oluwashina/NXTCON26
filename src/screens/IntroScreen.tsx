import { motion } from 'framer-motion';
import { EVENT } from '../data/event';
import { BrandMark, NxtconLockup } from '../components/ui/Brand';
import { Button } from '../components/ui/Button';
import { LineReveal, Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';
import { ChessPiece } from '../components/ChessPiece';

interface IntroScreenProps {
  onBegin: () => void;
}

export function IntroScreen({ onBegin }: IntroScreenProps) {
  return (
    <Screen className="overflow-hidden">
      {/* Two silhouettes standing in the hall, echoing the artwork */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-2 opacity-[0.13] sm:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-[34vh] w-[34vh] -translate-x-[18%] translate-y-[14%]"
        >
          <ChessPiece piece="knight" tone="ivory" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-[30vh] w-[30vh] translate-x-[16%] translate-y-[16%]"
        >
          <ChessPiece piece="bishop" tone="gold" />
        </motion.div>
      </div>

      <header className="absolute left-5 right-5 top-0 flex items-start justify-between safe-t sm:left-8 sm:right-8">
        <Reveal delay={0.2} y={-8}>
          <BrandMark />
        </Reveal>
        <Reveal delay={0.35} y={-8} className="text-right">
          <span className="eyebrow block">An interactive experience</span>
        </Reveal>
      </header>

      <div className="relative pb-14 pt-24 text-center">
        <Reveal delay={0.5} duration={1.6}>
          <NxtconLockup className="text-[0.95rem] tracking-[0.42em] text-ivory/80 xs:text-base" />
        </Reveal>

        <Reveal delay={0.9} duration={1.4} className="mx-auto mt-7 h-px w-16 hairline-gold" />

        <LineReveal
          lines={['Everyone', 'has a move.']}
          delay={1.15}
          stagger={0.22}
          className="display mt-8 text-[clamp(2.6rem,13vw,6rem)] text-ivory-300/85"
        />

        <LineReveal
          lines={["What's your", 'move?']}
          delay={1.95}
          stagger={0.22}
          className="display ivory-text mt-3 text-[clamp(3.3rem,17vw,8.5rem)] font-medium italic"
        />

        <Reveal delay={2.9} duration={1.5} className="mx-auto mt-10 max-w-sm">
          <p className="text-balance font-sans text-[0.8rem] font-light leading-relaxed text-ivory-400 sm:text-sm">
            Discover the chess piece that reflects how you move, think and lead.
          </p>
        </Reveal>

        <Reveal delay={3.3} duration={1.2} className="mt-11">
          <Button variant="solid" size="lg" arrow onClick={onBegin}>
            Discover your piece
          </Button>
        </Reveal>

        <Reveal delay={3.9} duration={1.4} className="mt-9">
          <p className="eyebrow text-ivory/30">
            {EVENT.brand} &nbsp;·&nbsp; Seven moves &nbsp;·&nbsp; Six pieces
          </p>
        </Reveal>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4, duration: 1.4 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 safe-b"
      >
        <span className="block h-10 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
      </motion.div>
    </Screen>
  );
}
