import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizTypeEnum, DifficultyEnum, Question } from "../../../types/types";

interface QuestionItemProps {
  question: Question;
  showAnswers: boolean;
  onDelete: () => void;
  onEdit: (updatedQuestion: Partial<Question>) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  showAnswers,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [userAnswer, setUserAnswer] = useState<string | string[]>("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    onEdit(editedQuestion);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedQuestion(question);
    setIsEditing(false);
  };

  const checkAnswer = () => {
    const correctAnswers = question.answers
      .filter((a) => a.is_correct)
      .map((a) => a.answer);
    if (Array.isArray(userAnswer)) {
      const isCorrect =
        userAnswer.length === correctAnswers.length &&
        userAnswer.every((answer) => correctAnswers.includes(answer));
      setFeedback(isCorrect ? "Correct!" : "Try again");
    } else {
      const isCorrect = correctAnswers.includes(userAnswer);
      setFeedback(isCorrect ? "Correct!" : "Try again");
    }
  };

  const renderAnswers = () => {
    switch (question.type) {
      case QuizTypeEnum.TRUE_FALSE:
        return (
          <div className="space-y-2">
            {["True", "False"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );
      case QuizTypeEnum.MCQ:
      case QuizTypeEnum.MMCQ:
        return (
          <div className="space-y-2">
            {question.answers.map((answer) => (
              <label key={answer.id} className="flex items-center space-x-2">
                <input
                  type={
                    question.type === QuizTypeEnum.MCQ ? "radio" : "checkbox"
                  }
                  name={`question-${question.id}`}
                  value={answer.answer}
                  onChange={(e) => {
                    if (question.type === QuizTypeEnum.MCQ) {
                      setUserAnswer(e.target.value);
                    } else {
                      const newAnswer = Array.isArray(userAnswer)
                        ? userAnswer
                        : [];
                      if (e.target.checked) {
                        setUserAnswer([...newAnswer, e.target.value]);
                      } else {
                        setUserAnswer(
                          newAnswer.filter((a) => a !== e.target.value)
                        );
                      }
                    }
                  }}
                  className={`${
                    question.type === QuizTypeEnum.MCQ
                      ? "form-radio"
                      : "form-checkbox"
                  } h-5 w-5 text-blue-600 dark:text-blue-400`}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {answer.answer}
                </span>
              </label>
            ))}
          </div>
        );
      case QuizTypeEnum.SHORT_ANSWER:
      case QuizTypeEnum.OPEN_ENDED:
        return (
          <textarea
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            rows={3}
            placeholder="Enter your answer here"
            onChange={(e) => setUserAnswer(e.target.value)}
          ></textarea>
        );
    }
  };

  const renderEditForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">
          Question:
        </label>
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          value={editedQuestion.question}
          onChange={(e) =>
            setEditedQuestion({ ...editedQuestion, question: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">
          Explanation:
        </label>
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          value={editedQuestion.explanation}
          onChange={(e) =>
            setEditedQuestion({
              ...editedQuestion,
              explanation: e.target.value,
            })
          }
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Points:
          </label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            value={editedQuestion.points}
            onChange={(e) =>
              setEditedQuestion({
                ...editedQuestion,
                points: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Time Limit (seconds):
          </label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            value={editedQuestion.time_limit || ""}
            onChange={(e) =>
              setEditedQuestion({
                ...editedQuestion,
                time_limit: parseInt(e.target.value) || null,
              })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Difficulty:
          </label>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            value={editedQuestion.difficulty}
            onChange={(e) =>
              setEditedQuestion({
                ...editedQuestion,
                difficulty: e.target.value as DifficultyEnum,
              })
            }
          >
            {Object.values(DifficultyEnum).map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {renderEditAnswers()}
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors dark:bg-green-500 dark:hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors dark:bg-red-500 dark:hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderEditAnswers = () => {
    switch (editedQuestion.type) {
      case QuizTypeEnum.TRUE_FALSE:
        return (
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Correct Answer:
            </label>
            {editedQuestion.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  checked={answer.is_correct}
                  onChange={() => {
                    const newAnswers = [...editedQuestion.answers];
                    newAnswers.forEach((a, i) => (a.is_correct = i === index));
                    setEditedQuestion({
                      ...editedQuestion,
                      answers: newAnswers,
                    });
                  }}
                  className={`form-radio h-5 w-5 `}
                />
                <span className="text-gray-700 dark:text-gray-200">
                  {answer.answer}
                </span>
              </div>
            ))}
          </div>
        );
      case QuizTypeEnum.MCQ:
      case QuizTypeEnum.MMCQ:
        return (
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Answers:
            </label>
            {editedQuestion.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type={
                    editedQuestion.type === QuizTypeEnum.MCQ
                      ? "radio"
                      : "checkbox"
                  }
                  checked={answer.is_correct}
                  onChange={() => {
                    const newAnswers = [...editedQuestion.answers];
                    if (editedQuestion.type === QuizTypeEnum.MCQ) {
                      newAnswers.forEach(
                        (a, i) => (a.is_correct = i === index)
                      );
                    } else {
                      newAnswers[index].is_correct =
                        !newAnswers[index].is_correct;
                    }
                    setEditedQuestion({
                      ...editedQuestion,
                      answers: newAnswers,
                    });
                  }}
                  className={`${
                    editedQuestion.type === QuizTypeEnum.MCQ
                      ? "form-radio"
                      : "form-checkbox"
                  } h-5 w-5 text-blue-600 dark:text-blue-400`}
                />
                <input
                  type="text"
                  value={answer.answer}
                  onChange={(e) => {
                    const newAnswers = [...editedQuestion.answers];
                    newAnswers[index].answer = e.target.value;
                    setEditedQuestion({
                      ...editedQuestion,
                      answers: newAnswers,
                    });
                  }}
                  className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
            ))}
          </div>
        );
      case QuizTypeEnum.SHORT_ANSWER:
      case QuizTypeEnum.OPEN_ENDED:
        return (
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Correct Answer:
            </label>
            <input
              type="text"
              value={editedQuestion.answers[0].answer || ""}
              onChange={(e) => {
                const newAnswers = [
                  {
                    id: editedQuestion.answers[0].id,
                    answer: e.target.value,
                    is_correct: true,
                    question_id: question.id,
                    created_at: editedQuestion.answers[0].created_at,
                    updated_at: new Date().toLocaleDateString(),
                  },
                ];
                setEditedQuestion({ ...editedQuestion, answers: newAnswers });
              }}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isEditing ? (
        renderEditForm()
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {question.question}
            </h3>
            <div className="space-x-2">
              <button
                onClick={handleEdit}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          {renderAnswers()}
          <button
            onClick={checkAnswer}
            className="mt-4 px-3 py-1 rounded-md  bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-3 rounded-lg ${
                  feedback === "Correct!"
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(showAnswers || feedback === "Correct!") &&
              question.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg"
                >
                  <div className="">
                    <strong>Answers:</strong>{" "}
                    {question.answers
                      .filter((a) => a.is_correct)
                      .map((i) => (
                        <p key={i.id}> {i.answer} </p>
                      ))}
                  </div>
                  <strong>Explanation:</strong> {question.explanation}
                </motion.div>
              )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

export default QuestionItem;
