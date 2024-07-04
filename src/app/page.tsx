"use client";

import { quizData } from "@/constdata/Questions";
import { useEffect, useState } from "react";
import ResultsPage from "./components/ResultsPage";
import QuizCard from "./components/QuizCard";
import ProgressBar from "./components/ProgressBar";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [[currentQuestion, direction], setCurrentQuestion] = useState([0, 0]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const { currentQuestion, userAnswers } = JSON.parse(savedState);
      setCurrentQuestion([currentQuestion, 0]);
      setUserAnswers(userAnswers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify({ currentQuestion, userAnswers })
    );
  }, [currentQuestion, userAnswers]);

  const handleNextQuestion = (level: number) => {
    setUserAnswers([...userAnswers, level]);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion([currentQuestion + 1, 1]);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion([currentQuestion - 1, -1]);
      setUserAnswers(userAnswers.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion([0, 0]);
    setUserAnswers([]);
    setShowResults(false);
    localStorage.removeItem("quizState");
  };
  const calculateScore = () => {
    const totalPossibleScore = quizData.length * 3;
    const userScore = userAnswers.reduce((sum, answer) => sum + answer, 0);
    return (userScore / totalPossibleScore) * 100;
  };
  if (showResults) {
    return (
      <ResultsPage
        userAnswers={userAnswers}
        onRestart={resetQuiz}
        score={calculateScore()}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 mx-auto max-w-[600px] my-[100px]">
      <ProgressBar current={currentQuestion + 1} total={quizData.length} />
      <div className="flex flex-col gap-1 justify-start items-start">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          HTML5 Quiz
        </h1>
        <p className="text-center text-xl text-gray-600 dark:text-gray-300">
          Test your knowledge of HTML5 with this interactive quiz!
        </p>
      </div>
      <div className="flex gap-20 relative">
        <AnimatePresence>
          <QuizCard
            key={currentQuestion}
            question={quizData[currentQuestion]}
            onNext={handleNextQuestion}
            direction={direction}
          />
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-center mt-[400px]">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="bg-blue-300 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200 hover:bg-blue-600"
        >
          Previous
        </button>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Question <strong>{currentQuestion + 1}</strong> of{" "}
          <strong>{quizData.length}</strong>
        </p>
        <button
          onClick={() => handleNextQuestion(0)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-600"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
