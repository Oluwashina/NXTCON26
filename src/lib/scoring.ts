import { QUESTIONS } from '../data/questions';
import { PIECE_ORDER } from '../data/pieces';
import type { AnswerSheet, PieceId, ScoreResult } from '../types';

/**
 * Final, fixed fallback order. Thematic to NXTCON26 ("Knight and Bishop") and
 * intentionally hard-coded so the same answers always produce the same piece.
 */
const TIE_BREAK_ORDER: PieceId[] = ['knight', 'bishop', 'queen', 'king', 'rook', 'pawn'];

export function emptyAnswerSheet(): AnswerSheet {
  return QUESTIONS.map(() => null);
}

export function emptyScores(): Record<PieceId, number> {
  return PIECE_ORDER.reduce(
    (acc, id) => ({ ...acc, [id]: 0 }),
    {} as Record<PieceId, number>,
  );
}

export function tallyScores(answers: AnswerSheet): Record<PieceId, number> {
  const scores = emptyScores();

  answers.forEach((choice, index) => {
    if (choice === null) return;
    const option = QUESTIONS[index]?.options[choice];
    if (option) scores[option.piece] += 1;
  });

  return scores;
}

/** Index of the first question where this piece was chosen, or Infinity. */
function firstChosenAt(answers: AnswerSheet, piece: PieceId): number {
  for (let i = 0; i < answers.length; i += 1) {
    const choice = answers[i];
    if (choice === null) continue;
    if (QUESTIONS[i]?.options[choice]?.piece === piece) return i;
  }
  return Number.POSITIVE_INFINITY;
}

/** The piece chosen on the last answered question — the user's most recent move. */
function lastMovePiece(answers: AnswerSheet): PieceId | null {
  for (let i = answers.length - 1; i >= 0; i -= 1) {
    const choice = answers[i];
    if (choice === null) continue;
    return QUESTIONS[i]?.options[choice]?.piece ?? null;
  }
  return null;
}

/**
 * Deterministic comparator, applied in strict order:
 *   1. higher score wins
 *   2. the piece played on the final answered move wins
 *   3. the piece committed to earliest wins
 *   4. fixed TIE_BREAK_ORDER
 */
function buildComparator(answers: AnswerSheet, scores: Record<PieceId, number>) {
  const finalMove = lastMovePiece(answers);

  return (a: PieceId, b: PieceId): number => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];

    if (finalMove === a && finalMove !== b) return -1;
    if (finalMove === b && finalMove !== a) return 1;

    const firstA = firstChosenAt(answers, a);
    const firstB = firstChosenAt(answers, b);
    if (firstA !== firstB) return firstA - firstB;

    return TIE_BREAK_ORDER.indexOf(a) - TIE_BREAK_ORDER.indexOf(b);
  };
}

export function scoreQuiz(answers: AnswerSheet): ScoreResult {
  const scores = tallyScores(answers);
  const ranking = [...PIECE_ORDER].sort(buildComparator(answers, scores));
  const top = scores[ranking[0]];
  const wasTie = ranking.filter((id) => scores[id] === top).length > 1;

  return { winner: ranking[0], scores, ranking, wasTie };
}

export function isComplete(answers: AnswerSheet): boolean {
  return answers.every((choice) => choice !== null);
}

export function answeredCount(answers: AnswerSheet): number {
  return answers.filter((choice) => choice !== null).length;
}
