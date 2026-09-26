export type PieceId = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';

export interface Piece {
  id: PieceId;
  /** Display name, e.g. "Knight". */
  name: string;
  /** Archetype title, e.g. "The Unconventional". */
  title: string;
  /** One-word strength, e.g. "Perspective". */
  strength: string;
  /** Imperative call to action, e.g. "Think Differently". */
  move: string;
  /** How the piece travels the board — used on the board screen. */
  movement: string;
  /** Long-form reveal copy. Each entry is a paragraph. */
  description: string[];
  /** First-person line used on the shareable card. */
  shareLine: string;
  /** Unicode glyph, kept for share text only (never rendered as UI). */
  glyph: string;
}

export interface QuizOption {
  /** Stable letter label shown in the UI. */
  label: string;
  text: string;
  /** The piece this answer awards a point to. */
  piece: PieceId;
}

export interface QuizQuestion {
  id: number;
  /** Short editorial label above the scenario. */
  context: string;
  prompt: string;
  options: QuizOption[];
}

/** answers[i] is the chosen option index for questions[i], or null if unanswered. */
export type AnswerSheet = (number | null)[];

export interface ScoreResult {
  winner: PieceId;
  scores: Record<PieceId, number>;
  /** Pieces ranked high to low, after tie-breaks. */
  ranking: PieceId[];
  /** True when the top score was shared and a tie-break decided the winner. */
  wasTie: boolean;
}
