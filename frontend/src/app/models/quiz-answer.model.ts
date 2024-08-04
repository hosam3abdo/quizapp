export interface QuizAnswer {
  id: number;
  response: string;
  resultId: number;
  question: {
    id: number;
    quizId: number;
    questionText: string;
    correctAnswer: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
  };
}
