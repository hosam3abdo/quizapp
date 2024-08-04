export class Question {
  id: number;
  quizId: number;
  questionText: string;
  correctAnswer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;

  constructor(
    id: number,
    quizId: number,
    questionText: string,
    correctAnswer: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string
  ) {
    this.id = id;
    this.quizId = quizId;
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
  }
}
