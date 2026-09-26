import { motion } from 'framer-motion';
import { QuizOption } from './QuizOption';
import type { QuizQuestion as Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
  /** 1 when moving forward through the quiz, -1 when going back. */
  direction: number;
}

export function QuizQuestion({
  question,
  selected,
  onSelect,
  direction,
}: QuizQuestionProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: direction * 34, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: direction * -34, filter: 'blur(10px)' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="eyebrow text-gold/70">{question.context}</p>

      <h2 className="display mt-4 text-balance text-[clamp(1.5rem,6.4vw,2.6rem)] font-normal normal-case text-ivory sm:mt-5">
        {question.prompt}
      </h2>

      <div className="mt-7 h-px w-full hairline sm:mt-9" />

      <ul className="mt-5 space-y-2 sm:mt-7 sm:space-y-2.5">
        {question.options.map((option, index) => (
          <QuizOption
            key={option.label}
            index={index}
            label={option.label}
            text={option.text}
            selected={selected === index}
            dimmed={selected !== null}
            onSelect={() => onSelect(index)}
          />
        ))}
      </ul>
    </motion.div>
  );
}
