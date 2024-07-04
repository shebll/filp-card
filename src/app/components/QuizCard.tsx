// app/QuizCard.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizCardProps {
  question: {
    title: string;
    question: string;
    answer: string;
    explanation: string;
  };
  onNext: (level: number) => void;
  direction: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onNext, direction }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  useEffect(() => {
    setIsFlipped(false);
    setSelectedLevel(null);
  }, [question]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    setTimeout(() => onNext(level), 300);
  };

  return (
    <motion.div
      key={question.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full shrink-0 absolute top-0 left-0 max-w-2xl mx-auto h-80 perspective cursor-grab"
    >
      <div
        className={`w-full h-full relative preserve-3d transition-transform duration-500 ease-in-out ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleFlip}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {question.title}
            </h2>
            <p
              className="text-center text-xl text-gray-600 dark:text-gray-300 select-text"
              onClick={(e) => e.stopPropagation()}
            >
              {question.question}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Click to reveal answer
            </p>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-xl shadow-lg p-8 h-full flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">
              Answer
            </h2>
            <div className="flex-grow overflow-y-auto">
              <p
                className="text-center text-xl text-blue-600 dark:text-blue-300 mb-4 select-text"
                onClick={(e) => e.stopPropagation()}
              >
                {question.answer}
              </p>
              <p
                className="text-sm text-blue-500 dark:text-blue-400 select-text"
                onClick={(e) => e.stopPropagation()}
              >
                {question.explanation}
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              {[0, 1, 2, 3].map((level) => (
                <div key={level} className="relative group">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLevelSelect(level);
                    }}
                    className={`px-3 py-2 w-10 h-10 rounded-full transition-colors duration-200 ${
                      selectedLevel === level
                        ? "bg-blue-500 text-white"
                        : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                    }`}
                  >
                    {level}
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {level === 0
                      ? "Didn't know it"
                      : level === 1
                      ? "Maybe saw this question"
                      : level === 2
                      ? "Knew the question"
                      : "Got it correct"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    // </AnimatePresence>
  );
};

export default QuizCard;
