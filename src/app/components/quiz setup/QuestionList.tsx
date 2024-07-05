import React from "react";
import { motion } from "framer-motion";
import QuestionItem from "./QuestionItem";
import { Question } from "@/types/types";

interface QuestionListProps {
  questions: Question[];
  showAnswers: boolean;
  onQuestionDelete: (questionId: string) => void;
  onQuestionEdit: (
    questionId: string,
    updatedQuestion: Partial<Question>
  ) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  showAnswers,
  onQuestionDelete,
  onQuestionEdit,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 "
    >
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          showAnswers={showAnswers}
          onDelete={() => onQuestionDelete(question.id)}
          onEdit={(updatedQuestion) =>
            onQuestionEdit(question.id, updatedQuestion)
          }
        />
      ))}
    </motion.div>
  );
};

export default QuestionList;
