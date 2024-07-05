import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizHeaderProps {
  onShowAnswers: () => void;
  onOpenSettings: () => void;
  showAnswers: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  onShowAnswers,
  onOpenSettings,
  showAnswers,
}) => {
  const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 bg-gray-100 dark:bg-[#1f2937] z-10 p-6 mb-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-end gap-4 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowAnswers}
          className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold transition-colors hover:bg-blue-700"
        >
          {showAnswers ? "Hide Answers" : "Show Answers"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="px-3 py-1 rounded-md bg-gray-600 text-white font-semibold transition-colors hover:bg-gray-700"
        >
          Settings
        </motion.button>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlayMenuOpen(!isPlayMenuOpen)}
            className="px-3 py-1 rounded-md bg-green-600 text-white font-semibold transition-colors hover:bg-green-700"
          >
            Play
          </motion.button>
          <AnimatePresence>
            {isPlayMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold">Play Quiz</h3>
                  <p className="text-sm text-gray-600">
                    Test your knowledge with interactive questions
                  </p>
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold">Play Flash Cards</h3>
                  <p className="text-sm text-gray-600">
                    Review key concepts with flash cards
                  </p>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default QuizHeader;
