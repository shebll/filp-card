export enum QuizTypeEnum {
  MCQ = "mcq",
  MMCQ = "mmcq",
  OPEN_ENDED = "open_ended",
  SHORT_ANSWER = "short_answer",
  TRUE_FALSE = "true_false",
}

export enum DifficultyEnum {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  language: string;
  type: QuizTypeEnum;
  difficulty: DifficultyEnum;
  topic: string;
  subtopics: string[];
  hide_correct_answers: boolean;
  has_flash_cards: boolean;
  has_preview: boolean;
  has_multiple_attempts: boolean;
  hide_description: boolean;
  hide_final_report: boolean;
  quiz_time_limit: number | null;
  question_time_limit: number | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

export interface Question {
  id: string;
  quiz_id: string;
  question: string;
  explanation: string;
  difficulty: DifficultyEnum;
  type: QuizTypeEnum;
  time_limit: number | null;
  points: number;
  created_at: string;
  updated_at: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  question_id: string;
  answer: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}
