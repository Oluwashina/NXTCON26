import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PieceDefs } from './components/ChessPiece';
import { Backdrop } from './components/ui/Backdrop';
import { BoardScreen } from './screens/BoardScreen';
import { EventScreen } from './screens/EventScreen';
import { IntroScreen } from './screens/IntroScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ReflectionScreen } from './screens/ReflectionScreen';
import { RevealScreen } from './screens/RevealScreen';
import { emptyAnswerSheet, isComplete, scoreQuiz } from './lib/scoring';
import { readPieceFromUrl, syncPieceToUrl } from './lib/url';
import type { AnswerSheet, PieceId, ScoreResult } from './types';

type Stage = 'intro' | 'board' | 'quiz' | 'reveal' | 'reflection' | 'event';

const BACKDROP: Record<Stage, 'hall' | 'void' | 'chamber'> = {
  intro: 'void',
  board: 'chamber',
  quiz: 'void',
  reveal: 'chamber',
  reflection: 'void',
  event: 'hall',
};

export default function App() {
  const deepLinked = useMemo(() => readPieceFromUrl(), []);

  const [stage, setStage] = useState<Stage>(deepLinked ? 'reveal' : 'intro');
  const [answers, setAnswers] = useState<AnswerSheet>(emptyAnswerSheet);
  const [score, setScore] = useState<ScoreResult | null>(null);
  const [sharedPiece, setSharedPiece] = useState<PieceId | null>(deepLinked);
  const [reflection, setReflection] = useState('');

  const piece = score?.winner ?? sharedPiece;

  // Each stage starts at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [stage]);

  const handleAnswer = useCallback((questionIndex: number, optionIndex: number) => {
    setAnswers((current) => {
      const next = [...current];
      next[questionIndex] = optionIndex;
      return next;
    });
  }, []);

  const handleQuizComplete = useCallback((sheet?: AnswerSheet) => {
    const finalSheet = sheet ?? answers;
    if (!isComplete(finalSheet)) return;
    const result = scoreQuiz(finalSheet);
    setAnswers(finalSheet);
    setScore(result);
    setSharedPiece(null);
    syncPieceToUrl(result.winner);
    setStage('reveal');
  }, [answers]);

  const handleRetake = useCallback(() => {
    setAnswers(emptyAnswerSheet());
    setScore(null);
    setSharedPiece(null);
    setReflection('');
    syncPieceToUrl(null);
    setStage('quiz');
  }, []);

  const handleRestart = useCallback(() => {
    setAnswers(emptyAnswerSheet());
    setScore(null);
    setSharedPiece(null);
    setReflection('');
    syncPieceToUrl(null);
    setStage('intro');
  }, []);

  return (
    <>
      <PieceDefs />
      <Backdrop variant={BACKDROP[stage]} />

      <main className="relative">
        <AnimatePresence mode="sync">
          {stage === 'intro' ? (
            <IntroScreen key="intro" onBegin={() => setStage('board')} />
          ) : null}

          {stage === 'board' ? (
            <BoardScreen
              key="board"
              onBegin={() => setStage('quiz')}
              onBack={() => setStage('intro')}
            />
          ) : null}

          {stage === 'quiz' ? (
            <QuizScreen
              key="quiz"
              answers={answers}
              onAnswer={handleAnswer}
              onComplete={handleQuizComplete}
              onExit={() => setStage('board')}
            />
          ) : null}

          {stage === 'reveal' && piece ? (
            <RevealScreen
              key="reveal"
              piece={piece}
              score={score}
              instant={score === null}
              onContinue={() => setStage('reflection')}
              onRetake={handleRetake}
            />
          ) : null}

          {stage === 'reflection' && piece ? (
            <ReflectionScreen
              key="reflection"
              piece={piece}
              value={reflection}
              onChange={setReflection}
              onContinue={() => setStage('event')}
              onBack={() => setStage('reveal')}
            />
          ) : null}

          {stage === 'event' && piece ? (
            <EventScreen
              key="event"
              piece={piece}
              onRestart={handleRestart}
              onBack={() => setStage('reflection')}
            />
          ) : null}
        </AnimatePresence>
      </main>
    </>
  );
}
