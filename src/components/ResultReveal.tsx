import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PIECES } from '../data/pieces';
import { cn } from '../lib/cn';
import type { PieceId } from '../types';
import { ChessBoard, type Placement } from './ChessBoard';
import { ChessPiece } from './ChessPiece';

/** Four board states the pieces travel through while the score is tallied. */
const FRAMES: Placement[][] = [
  [
    { piece: 'pawn', square: 'c2' },
    { piece: 'knight', square: 'e4' },
    { piece: 'bishop', square: 'g6' },
    { piece: 'rook', square: 'a5' },
    { piece: 'queen', square: 'd7' },
    { piece: 'king', square: 'f2' },
  ],
  [
    { piece: 'pawn', square: 'c3' },
    { piece: 'knight', square: 'f6' },
    { piece: 'bishop', square: 'e4' },
    { piece: 'rook', square: 'a2' },
    { piece: 'queen', square: 'd4' },
    { piece: 'king', square: 'g2' },
  ],
  [
    { piece: 'pawn', square: 'c4' },
    { piece: 'knight', square: 'd5' },
    { piece: 'bishop', square: 'c6' },
    { piece: 'rook', square: 'h2' },
    { piece: 'queen', square: 'g4' },
    { piece: 'king', square: 'g1' },
  ],
  [
    { piece: 'pawn', square: 'c5' },
    { piece: 'knight', square: 'b4' },
    { piece: 'bishop', square: 'f3' },
    { piece: 'rook', square: 'h7' },
    { piece: 'queen', square: 'd1' },
    { piece: 'king', square: 'f1' },
  ],
];

const FRAME_MS = 680;
const CALCULATING_MS = 3600;

interface ResultRevealProps {
  piece: PieceId;
  /** Jump straight to the revealed state — used for ?piece= deep links. */
  instant?: boolean;
  onRevealed?: () => void;
}

export function ResultReveal({ piece, instant = false, onRevealed }: ResultRevealProps) {
  const [revealed, setRevealed] = useState(instant);
  const [frame, setFrame] = useState(0);
  const notified = useRef(instant);

  useEffect(() => {
    if (revealed) return;

    const ticker = window.setInterval(() => setFrame((value) => value + 1), FRAME_MS);
    const finish = window.setTimeout(() => setRevealed(true), CALCULATING_MS);

    return () => {
      window.clearInterval(ticker);
      window.clearTimeout(finish);
    };
  }, [revealed]);

  useEffect(() => {
    if (!revealed || notified.current) return;
    notified.current = true;
    onRevealed?.();
  }, [onRevealed, revealed]);

  const data = PIECES[piece];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="calculating"
            role="status"
            aria-live="polite"
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(18px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setRevealed(true)}
            className="flex min-h-[70svh] cursor-pointer flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[20rem] opacity-70 blur-[1px] sm:max-w-sm"
            >
              <ChessBoard placements={FRAMES[frame % FRAMES.length]} perspective />
              {/* Scanning light */}
              <motion.span
                aria-hidden
                initial={{ top: '-8%' }}
                animate={{ top: '104%' }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-x-0 h-[14%] bg-gradient-to-b from-transparent via-gold-light/25 to-transparent"
              />
            </motion.div>

            <div className="mt-11 text-center">
              <p className="eyebrow text-ivory/70">
                Calculating your move
                <Ellipsis />
              </p>
              <p className="mt-4 font-editorial text-sm italic text-ivory/30">
                Seven moves. Six pieces. One of them is you.
              </p>
              <p className="eyebrow mt-6 text-ivory/25">Tap to reveal</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Hero piece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.78, filter: 'blur(22px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[8.5rem] w-[8.5rem] xs:h-[10rem] xs:w-[10rem] sm:h-[12rem] sm:w-[12rem]"
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl"
              />
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-gold/35"
              />
              <ChessPiece piece={piece} tone="gold" shadow className="relative" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow mt-10 text-ivory/45"
            >
              You are the
            </motion.p>

            <span className="mt-1 block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.95, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="display ivory-text block text-[clamp(3.4rem,20vw,9rem)] font-medium"
              >
                {data.name}
              </motion.span>
            </span>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 h-px w-36 hairline-gold"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-sans text-[0.66rem] font-medium uppercase tracking-mega text-gold sm:text-[0.72rem]"
            >
              {data.title}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Ellipsis() {
  return (
    <span aria-hidden className="ml-1 inline-flex gap-[0.15em]">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.22 }}
          className={cn('inline-block')}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}
