import type { QuizQuestion } from '../types';

/**
 * Seven scenarios. Every option awards exactly one point to one piece, and every
 * question offers all six pieces exactly once, so no piece is structurally favoured.
 */
export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    context: 'Opening',
    prompt: 'You walk into a room where nobody knows what to do. What do you naturally do?',
    options: [
      { label: 'A', text: 'Take charge and create direction.', piece: 'king' },
      { label: 'B', text: 'Observe first and understand what is happening.', piece: 'bishop' },
      { label: 'C', text: 'Start helping wherever I am needed.', piece: 'pawn' },
      { label: 'D', text: 'Look for a solution nobody else has noticed.', piece: 'knight' },
      { label: 'E', text: 'Create a structured plan.', piece: 'rook' },
      { label: 'F', text: 'Get everyone moving together.', piece: 'queen' },
    ],
  },
  {
    id: 2,
    context: 'The blocked line',
    prompt: "You are faced with a problem and the obvious solution doesn't work. What do you do?",
    options: [
      { label: 'A', text: 'Try a completely different approach.', piece: 'knight' },
      { label: 'B', text: 'Step back and look at the bigger picture.', piece: 'bishop' },
      { label: 'C', text: 'Break the problem into smaller steps.', piece: 'pawn' },
      { label: 'D', text: 'Stay with it until I find a solution.', piece: 'rook' },
      { label: 'E', text: 'Find someone who can help me solve it.', piece: 'queen' },
      { label: 'F', text: 'Take control and make a decision.', piece: 'king' },
    ],
  },
  {
    id: 3,
    context: 'The unwritten rule',
    prompt: "Someone tells you, 'That's not how it's normally done.' You…",
    options: [
      { label: 'A', text: 'Ask why.', piece: 'pawn' },
      { label: 'B', text: 'Look for another route.', piece: 'knight' },
      { label: 'C', text: 'Consider whether the existing method actually works.', piece: 'bishop' },
      { label: 'D', text: 'Stick with what has proven reliable.', piece: 'rook' },
      { label: 'E', text: 'Think about how the change affects everyone.', piece: 'queen' },
      { label: 'F', text: 'Make the call and move forward.', piece: 'king' },
    ],
  },
  {
    id: 4,
    context: 'The weight of a decision',
    prompt: 'When you have to make an important decision, what matters most?',
    options: [
      { label: 'A', text: "Seeing possibilities others don't see.", piece: 'knight' },
      { label: 'B', text: 'Having enough information.', piece: 'bishop' },
      { label: 'C', text: 'Knowing the people involved are protected.', piece: 'king' },
      { label: 'D', text: 'Having a clear plan.', piece: 'rook' },
      { label: 'E', text: 'Being able to adapt.', piece: 'queen' },
      { label: 'F', text: 'Knowing the decision moves everyone forward.', piece: 'pawn' },
    ],
  },
  {
    id: 5,
    context: 'In your own words',
    prompt: 'Which statement sounds most like you?',
    options: [
      { label: 'A', text: '“There is always another way.”', piece: 'knight' },
      { label: 'B', text: '“I need to understand the bigger picture.”', piece: 'bishop' },
      { label: 'C', text: '“Someone has to build the foundation.”', piece: 'pawn' },
      { label: 'D', text: '“People need someone they can depend on.”', piece: 'rook' },
      { label: 'E', text: '“I can adapt to almost any situation.”', piece: 'queen' },
      { label: 'F', text: '“Someone has to make the final call.”', piece: 'king' },
    ],
  },
  {
    id: 6,
    context: 'Your edge',
    prompt: 'Your greatest strength is most likely…',
    options: [
      { label: 'A', text: 'Unconventional thinking.', piece: 'knight' },
      { label: 'B', text: 'Vision.', piece: 'bishop' },
      { label: 'C', text: 'Consistency.', piece: 'pawn' },
      { label: 'D', text: 'Stability.', piece: 'rook' },
      { label: 'E', text: 'Influence and adaptability.', piece: 'queen' },
      { label: 'F', text: 'Leadership.', piece: 'king' },
    ],
  },
  {
    id: 7,
    context: 'Endgame',
    prompt: 'If your life were a chessboard right now, what would you most want to do?',
    options: [
      { label: 'A', text: 'Make an unexpected move.', piece: 'knight' },
      { label: 'B', text: 'See the situation differently.', piece: 'bishop' },
      { label: 'C', text: 'Take the first step.', piece: 'pawn' },
      { label: 'D', text: 'Stand firm.', piece: 'rook' },
      { label: 'E', text: 'Expand my influence.', piece: 'queen' },
      { label: 'F', text: 'Lead with purpose.', piece: 'king' },
    ],
  },
];

export const TOTAL_MOVES = QUESTIONS.length;
