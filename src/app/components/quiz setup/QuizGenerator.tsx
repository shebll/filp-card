import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import QuizHeader from "./QuizHeader";
import QuestionList from "./QuestionList";
import { fetchQuestions, fetchQuiz } from "@/api/api";
import { Question, Quiz } from "@/types/types";
import QuizSettingsSheet from "./QuizSettings";

const QuizGenerator: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const [fetchedQuiz, fetchedQuestions] = await Promise.all([
          fetchQuiz("1"),
          fetchQuestions(),
        ]);
        setQuiz(fetchedQuiz);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error loading quiz data:", error);
      }
    };
    loadQuizData();
  }, []);

  const handleShowAnswers = () => setShowAnswers(!showAnswers);
  const handleSettingsOpen = () => setIsSettingsOpen(true);
  const handleSettingsClose = () => setIsSettingsOpen(false);

  const handleQuizSettingsChange = (updatedSettings: Partial<Quiz>) => {
    setQuiz((prevQuiz) => ({ ...prevQuiz, ...updatedSettings } as Quiz));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-200 dark:bg-[#1b212e] min-h-screen max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" rounded-lg overflow-hidden"
      >
        <QuizHeader
          onShowAnswers={handleShowAnswers}
          onOpenSettings={handleSettingsOpen}
          showAnswers={showAnswers}
        />
        <QuestionList
          questions={questions}
          showAnswers={showAnswers}
          onQuestionDelete={(questionId) => {
            // Handle question deletion
          }}
          onQuestionEdit={(questionId, updatedQuestion) => {
            // Handle question edit
          }}
        />
        <QuizSettingsSheet
          isOpen={isSettingsOpen}
          onClose={handleSettingsClose}
          quizSettings={quiz}
          onSettingsChange={handleQuizSettingsChange}
        />
      </motion.div>
    </div>
  );
};

export default QuizGenerator;
