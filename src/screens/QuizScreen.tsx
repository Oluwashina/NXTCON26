import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { QuizAtmosphere } from '../components/QuizAtmosphere';
import { QuizProgress } from '../components/QuizProgress';
import { QuizQuestion } from '../components/QuizQuestion';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { Screen } from '../components/ui/Screen';
import { QUESTIONS, TOTAL_MOVES } from '../data/questions';
import type { AnswerSheet, PieceId } from '../types';

interface QuizScreenProps {
  answers: AnswerSheet;
  onAnswer: (questionIndex: number, optionIndex: number) => void;
  onComplete: (sheet?: AnswerSheet) => void;
  onExit: () => void;
}

/** Pause after a tap so the selection is visible before the question slides away. */
const ADVANCE_DELAY = 480;

export function QuizScreen({ answers, onAnswer, onComplete, onExit }: QuizScreenProps) {
  const [index, setIndex] = useState(() => {
    const firstUnanswered = answers.findIndex((answer) => answer === null);
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });
  const [direction, setDirection] = useState(1);
  const [echo, setEcho] = useState<PieceId | null>(null);
  const advanceTimer = useRef<number | null>(null);

  const question = QUESTIONS[index];
  const selected = answers[index];
  const isLast = index === TOTAL_MOVES - 1;

  const clearTimer = () => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      clearTimer();
      setDirection(nextIndex > index ? 1 : -1);
      setIndex(nextIndex);
    },
    [index],
  );

  const goForward = useCallback(() => {
    if (isLast) {
      onComplete();
      return;
    }
    goTo(index + 1);
  }, [goTo, index, isLast, onComplete]);

  const handleSelect = (optionIndex: number) => {
    const chosen = question.options[optionIndex]?.piece ?? null;
    setEcho(chosen);
    onAnswer(index, optionIndex);

    const nextSheet: AnswerSheet = [...answers];
    nextSheet[index] = optionIndex;

    clearTimer();
    advanceTimer.current = window.setTimeout(() => {
      if (isLast) {
        onComplete(nextSheet);
        return;
      }
      goTo(index + 1);
    }, ADVANCE_DELAY);
  };

  const handleBack = () => {
    if (index === 0) {
      onExit();
      return;
    }
    goTo(index - 1);
  };

  // Keyboard play: A–F (or 1–6) to answer, arrows to navigate.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const letter = event.key.toUpperCase();
      const byLetter = question.options.findIndex((option) => option.label === letter);
      const byNumber = Number(event.key) - 1;
      const target =
        byLetter >= 0 ? byLetter : byNumber >= 0 && byNumber < question.options.length ? byNumber : -1;

      if (target >= 0) {
        event.preventDefault();
        handleSelect(target);
        return;
      }
      if (event.key === 'ArrowRight' && selected !== null) {
        event.preventDefault();
        goForward();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <Screen className="py-14">
      <QuizAtmosphere answers={answers} echo={echo} moveIndex={index} />

      <Reveal delay={0.05} y={-10} className="relative z-10">
        <QuizProgress
          current={index + 1}
          total={TOTAL_MOVES}
          answered={answers.map((answer) => answer !== null)}
          onJump={goTo}
        />
      </Reveal>

      <div className="relative z-10 mt-10 sm:mt-14">
        <AnimatePresence mode="wait" initial={false}>
          <QuizQuestion
            key={question.id}
            question={question}
            selected={selected}
            onSelect={handleSelect}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-9 flex items-center justify-between gap-4 sm:mt-11">
        <Button variant="quiet" size="sm" onClick={handleBack}>
          &larr; {index === 0 ? 'The board' : 'Previous'}
        </Button>

        <Button
          variant={selected === null ? 'outline' : 'solid'}
          size="md"
          arrow
          disabled={selected === null}
          onClick={goForward}
        >
          {isLast ? 'Reveal my piece' : 'Next move'}
        </Button>
      </div>

      <p className="relative z-10 eyebrow mt-7 hidden text-ink/35 sm:block">
        Tip — press A to F to make your move
      </p>
    </Screen>
  );
}
