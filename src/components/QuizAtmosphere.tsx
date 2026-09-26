import { AnimatePresence, motion } from 'framer-motion';
import { QUESTIONS } from '../data/questions';
import type { AnswerSheet, PieceId } from '../types';
import { ChessBoard, type Placement } from './ChessBoard';
import { ChessPiece } from './ChessPiece';

/** Home squares — a quiet opening formation. */
const HOME: Record<PieceId, string> = {
  pawn: 'e2',
  knight: 'b1',
  bishop: 'c1',
  rook: 'a1',
  queen: 'd1',
  king: 'e1',
};

/**
 * Where each piece travels after it is chosen, one square per move.
 * Paths follow legal-looking travel so the board feels like it is playing back.
 */
const PATHS: Record<PieceId, string[]> = {
  pawn: ['e3', 'e4', 'e5', 'e6', 'e7', 'd6', 'e8'],
  knight: ['c3', 'e4', 'f6', 'd5', 'e7', 'g6', 'h8'],
  bishop: ['a3', 'e7', 'h4', 'f6', 'c3', 'a1', 'g7'],
  rook: ['a4', 'd4', 'd8', 'h8', 'h2', 'a2', 'a8'],
  queen: ['d4', 'g4', 'g7', 'c7', 'c3', 'f3', 'd8'],
  king: ['e2', 'f2', 'f3', 'g3', 'g2', 'f1', 'e1'],
};

interface QuizAtmosphereProps {
  answers: AnswerSheet;
  /** The piece chosen on the current move, if any. */
  echo: PieceId | null;
  moveIndex: number;
}

function placementsFor(answers: AnswerSheet, echo: PieceId | null, moveIndex: number): Placement[] {
  const ids: PieceId[] = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

  return ids.map((id) => {
    const lastPick = answers.reduce<number | null>((found, choice, index) => {
      if (choice === null) return found;
      return QUESTIONS[index]?.options[choice]?.piece === id ? index : found;
    }, null);

    const shouldMove = echo === id || lastPick !== null;
    const step = echo === id ? moveIndex : (lastPick ?? 0);

    return {
      piece: id,
      square: shouldMove ? PATHS[id][step % PATHS[id].length] : HOME[id],
      tone: echo === id ? 'gold' : undefined,
    };
  });
}

/**
 * The board watching you play. A faint piece blooms when you choose,
 * and the corresponding silhouette slides to a new square.
 */
export function QuizAtmosphere({ answers, echo, moveIndex }: QuizAtmosphereProps) {
  const placements = placementsFor(answers, echo, moveIndex);
  const hint = echo ? [PATHS[echo][moveIndex % PATHS[echo].length]] : [];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {echo ? (
          <motion.div
            key={`${echo}-${moveIndex}`}
            initial={{ opacity: 0, scale: 0.86, filter: 'blur(24px)' }}
            animate={{ opacity: 0.1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(16px)' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-[8%] top-[12%] h-[56vh] w-[56vh] sm:-right-[4%]"
          >
            <ChessPiece piece={echo} tone="gold" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute bottom-10 right-8 hidden w-44 opacity-40 lg:block">
        <ChessBoard
          placements={placements}
          hints={hint}
          activePiece={echo}
          perspective
        />
      </div>
    </div>
  );
}
