// app/ResultsPage.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";
import { quizData } from "@/constdata/Questions";

interface ResultsPageProps {
  userAnswers: number[];
  onRestart: () => void;
  score: number;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  userAnswers,
  onRestart,
  score,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score >= 50) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [score]);

  const circleVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: score / 100,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const getConfidenceText = (level: number) => {
    switch (level) {
      case 0:
        return "Didn't know it";
      case 1:
        return "Maybe saw this question";
      case 2:
        return "Knew the question";
      case 3:
        return "Got it correct";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 relative overflow-hidden">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Quiz Results
      </h1>

      <div className="flex justify-center mb-12">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="10"
              strokeLinecap="round"
              initial="hidden"
              animate="visible"
              variants={circleVariants}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-800 dark:text-white">
              {score.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {score >= 50 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-green-500 dark:text-green-400">
            Congratulations! Great job!
          </h2>
        </motion.div>
      )}

      <div className="max-w-3xl mx-auto space-y-6">
        {quizData.map((question, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
              Question {index + 1}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {question.question}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your confidence:
                </p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {getConfidenceText(userAnswers[index])}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Correct answer:
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {question.answer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            onRestart();
          }}
          className="bg-green-500 text-white px-8 py-3 rounded-lg text-xl font-semibold transition-colors duration-200 hover:bg-green-600"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
