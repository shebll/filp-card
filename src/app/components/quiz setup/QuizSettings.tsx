import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quiz, QuizTypeEnum, DifficultyEnum } from "@/types/types";

interface QuizSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  quizSettings: Quiz | null;
  onSettingsChange: (updatedSettings: Partial<Quiz>) => void;
}

const QuizSettingsSheet: React.FC<QuizSettingsSheetProps> = ({
  isOpen,
  onClose,
  quizSettings,
  onSettingsChange,
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  if (!isOpen || !quizSettings) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    onSettingsChange({ [name]: newValue });
  };

  const SettingSection: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => {
    const isOpen = openSection === title;

    return (
      <div className="border-b border-gray-200 dark:border-gray-700">
        <button
          className="w-full py-4 px-2 flex justify-between items-center text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          onClick={() => setOpenSection(isOpen ? null : title)}
        >
          <span className="font-medium">{title}</span>
          <span>{isOpen ? "▲" : "▼"}</span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const inputClass =
    "w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent";
  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const checkboxLabelClass =
    "flex items-center text-sm text-gray-700 dark:text-gray-300";

  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-80 bg-gray-50 dark:bg-gray-900 shadow-lg overflow-y-auto z-[11]"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Quiz Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="mt-4">
        <SettingSection title="General Settings">
          <label className={labelClass}>
            Title:
            <input
              type="text"
              name="title"
              value={quizSettings.title}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Description:
            <textarea
              name="description"
              value={quizSettings.description}
              onChange={handleChange}
              className={inputClass}
              rows={3}
            />
          </label>
          <label className={labelClass}>
            Language:
            <input
              type="text"
              name="language"
              value={quizSettings.language}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Type:
            <select
              name="type"
              value={quizSettings.type}
              onChange={handleChange}
              className={inputClass}
            >
              {Object.values(QuizTypeEnum).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Difficulty:
            <select
              name="difficulty"
              value={quizSettings.difficulty}
              onChange={handleChange}
              className={inputClass}
            >
              {Object.values(DifficultyEnum).map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Topic:
            <input
              type="text"
              name="topic"
              value={quizSettings.topic}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Subtopics:
            <input
              type="text"
              name="subtopics"
              value={quizSettings.subtopics.join(", ")}
              onChange={(e) =>
                onSettingsChange({ subtopics: e.target.value.split(", ") })
              }
              className={inputClass}
            />
          </label>
        </SettingSection>

        <SettingSection title="Behavior Settings">
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              name="hide_correct_answers"
              checked={quizSettings.hide_correct_answers}
              onChange={handleChange}
              className="mr-2"
            />
            Hide Correct Answers
          </label>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              name="has_flash_cards"
              checked={quizSettings.has_flash_cards}
              onChange={handleChange}
              className="mr-2"
            />
            Has Flash Cards
          </label>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              name="has_preview"
              checked={quizSettings.has_preview}
              onChange={handleChange}
              className="mr-2"
            />
            Has Preview
          </label>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              name="has_multiple_attempts"
              checked={quizSettings.has_multiple_attempts}
              onChange={handleChange}
              className="mr-2"
            />
            Has Multiple Attempts
          </label>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              name="hide_description"
              checked={quizSettings.hide_description}
              onChange={handleChange}
              className="mr-2"
            />
            Hide Description
          </label>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              name="hide_final_report"
              checked={quizSettings.hide_final_report}
              onChange={handleChange}
              className="mr-2"
            />
            Hide Final Report
          </label>
          <label className={labelClass}>
            Quiz Time Limit (minutes):
            <input
              type="number"
              name="quiz_time_limit"
              value={quizSettings.quiz_time_limit || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Question Time Limit (seconds):
            <input
              type="number"
              name="question_time_limit"
              value={quizSettings.question_time_limit || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
        </SettingSection>

        <SettingSection title="Access Settings">
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              name="is_public"
              checked={quizSettings.is_public}
              onChange={handleChange}
              className="mr-2"
            />
            Is Public
          </label>
        </SettingSection>
      </div>

      <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save and Close
        </button>
      </div>
    </motion.div>
  );
};

export default QuizSettingsSheet;
