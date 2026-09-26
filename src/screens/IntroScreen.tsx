import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { EVENT } from '../data/event';
import { BrandMark, NxtconLockup } from '../components/ui/Brand';
import { Button } from '../components/ui/Button';
import { LineReveal, Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';

interface IntroScreenProps {
  onBegin: () => void;
}

export function IntroScreen({ onBegin }: IntroScreenProps) {
  return (
    <Screen className="h-screen max-h-screen overflow-hidden" center={false}>
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <motion.img
          src="/brand/nxtcon26-poster.png"
          alt=""
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1.14, opacity: 1 }}
          transition={{ duration: 22, ease: 'linear' }}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.48)_0%,rgba(5,5,5,0.16)_38%,rgba(5,5,5,0.55)_70%,#050505_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(72%_58%_at_50%_42%,transparent_16%,rgba(0,0,0,0.38)_82%,#000_100%)]" />
      </div>

      <div className="relative z-10">
        <header className="flex items-start justify-between">
          <Reveal delay={0.2} y={-8}>
            <BrandMark />
          </Reveal>
          <Reveal delay={0.35} y={-8} className="text-right">
            <span className="eyebrow block">An interactive experience</span>
          </Reveal>
        </header>

        <div className="flex flex-col items-center pb-40 pt-[12vh] text-center sm:pb-44 sm:pt-[14vh]">
          <Reveal delay={0.5} duration={1.5}>
            <NxtconLockup className="text-[clamp(1.05rem,4.2vw,1.7rem)] tracking-[0.28em] text-ivory" />
          </Reveal>

          <Reveal delay={0.85} duration={1.2} className="mx-auto mt-5 h-px w-12 hairline-gold" />

          <LineReveal
            lines={['Everyone has a move.']}
            delay={1.15}
            className="display mt-6 hidden text-[clamp(1.8rem,5vw,3.3rem)] text-ivory-300/90 sm:block"
          />
          <LineReveal
            lines={['Everyone', 'has a move.']}
            delay={1.15}
            stagger={0.16}
            className="display mt-6 text-[clamp(1.85rem,8vw,3.3rem)] text-ivory-300/90 sm:hidden"
          />

          <LineReveal
            lines={["What's your move?"]}
            delay={1.55}
            className="display ivory-text mt-2 hidden text-[clamp(2.8rem,7vw,5.4rem)] font-medium italic sm:block"
          />
          <LineReveal
            lines={["What's your", 'move?']}
            delay={1.55}
            stagger={0.14}
            className="display ivory-text mt-2 text-[clamp(2.3rem,11vw,4.6rem)] font-medium italic sm:hidden"
          />

          <Reveal delay={1.85} duration={1.2} className="mx-auto mt-6 max-w-sm">
            <p className="text-balance font-sans text-[0.76rem] font-light leading-relaxed text-ivory-300 sm:text-[0.88rem]">
              Discover the chess piece that reflects how you move, think and lead.
            </p>
          </Reveal>
        </div>
      </div>

      {createPortal(
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-black via-black/90 to-transparent pt-20">
          <div className="pointer-events-auto mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center sm:px-8">
            <Button variant="solid" size="lg" arrow onClick={onBegin}>
              Discover your piece
            </Button>
            <p className="eyebrow mt-3 text-ivory/35">{EVENT.brand}</p>
          </div>
        </div>,
        document.body,
      )}
    </Screen>
  );
}
