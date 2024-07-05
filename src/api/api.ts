import {
  Quiz,
  Question,
  Answer,
  QuizTypeEnum,
  DifficultyEnum,
} from "../types/types";

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulated questions data
const mockQuestions: Question[] = [
  {
    id: "1",
    quiz_id: "1",
    question: "What is the capital of France?",
    explanation: "Paris is the capital and most populous city of France.",
    difficulty: DifficultyEnum.EASY,
    type: QuizTypeEnum.MCQ,
    time_limit: 30,
    points: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    answers: [
      {
        id: "1",
        question_id: "1",
        answer: "London",
        is_correct: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        question_id: "1",
        answer: "Paris",
        is_correct: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        question_id: "1",
        answer: "Berlin",
        is_correct: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "4",
        question_id: "1",
        answer: "Madrid",
        is_correct: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    quiz_id: "1",
    question: "Which of the following are primary colors?",
    explanation: "Red, blue, and yellow are considered primary colors in art.",
    difficulty: DifficultyEnum.MEDIUM,
    type: QuizTypeEnum.MMCQ,
    time_limit: 45,
    points: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    answers: [
      {
        id: "5",
        question_id: "2",
        answer: "Red",
        is_correct: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "6",
        question_id: "2",
        answer: "Green",
        is_correct: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "7",
        question_id: "2",
        answer: "Blue",
        is_correct: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "8",
        question_id: "2",
        answer: "Yellow",
        is_correct: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "3",
    quiz_id: "1",
    question: "Is the Earth flat?",
    explanation: "The Earth is approximately spherical, not flat.",
    difficulty: DifficultyEnum.EASY,
    type: QuizTypeEnum.TRUE_FALSE,
    time_limit: 15,
    points: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    answers: [
      {
        id: "9",
        question_id: "3",
        answer: "True",
        is_correct: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "10",
        question_id: "3",
        answer: "False",
        is_correct: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "4",
    quiz_id: "1",
    question: "Explain the concept of photosynthesis in your own words.",
    explanation:
      "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of sugar.",
    difficulty: DifficultyEnum.MEDIUM,
    type: QuizTypeEnum.OPEN_ENDED,
    time_limit: 300,
    points: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    answers: [
      {
        id: "12",
        question_id: "4",
        answer: "answers test",
        is_correct: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "5",
    quiz_id: "1",
    question: "What is the chemical symbol for gold?",
    explanation:
      'Au is the chemical symbol for gold, derived from its Latin name "aurum".',
    difficulty: DifficultyEnum.EASY,
    type: QuizTypeEnum.SHORT_ANSWER,
    time_limit: 30,
    points: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    answers: [
      {
        id: "11",
        question_id: "5",
        answer: "Au",
        is_correct: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
];

// Simulated quiz data
const mockQuiz: Quiz = {
  id: "1",
  title: "General Knowledge Quiz",
  description: "Test your knowledge on various topics!",
  language: "en",
  type: QuizTypeEnum.MCQ,
  difficulty: DifficultyEnum.MEDIUM,
  topic: "General Knowledge",
  subtopics: ["Geography", "Science", "Art"],
  hide_correct_answers: false,
  has_flash_cards: true,
  has_preview: true,
  has_multiple_attempts: false,
  hide_description: false,
  hide_final_report: false,
  quiz_time_limit: 600,
  question_time_limit: 30,
  created_by: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  is_public: true,
};

// Fetch questions
export const fetchQuestions = async (): Promise<Question[]> => {
  await delay(1000); // Simulate network delay
  return mockQuestions;
};

// Fetch quiz
export const fetchQuiz = async (quizId: string): Promise<Quiz> => {
  await delay(500);
  return mockQuiz;
};

// Update quiz settings
export const updateQuizSettings = async (
  quizId: string,
  updatedSettings: Partial<Quiz>
): Promise<Quiz> => {
  await delay(500);
  return { ...mockQuiz, ...updatedSettings };
};

// Delete question
export const deleteQuestion = async (questionId: string): Promise<void> => {
  await delay(500);
  console.log(`Question ${questionId} deleted`);
};

// Update question
export const updateQuestion = async (
  questionId: string,
  updatedQuestion: Partial<Question>
): Promise<Question> => {
  await delay(500);
  const questionIndex = mockQuestions.findIndex((q) => q.id === questionId);
  if (questionIndex === -1) {
    throw new Error("Question not found");
  }
  const updatedQuestionData = {
    ...mockQuestions[questionIndex],
    ...updatedQuestion,
  };
  mockQuestions[questionIndex] = updatedQuestionData;
  return updatedQuestionData;
};

// Add new question
export const addQuestion = async (
  newQuestion: Omit<Question, "id" | "created_at" | "updated_at">
): Promise<Question> => {
  await delay(500);
  const question: Question = {
    ...newQuestion,
    id: String(mockQuestions.length + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockQuestions.push(question);
  return question;
};
