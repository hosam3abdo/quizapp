import { Question } from "./question.model";

export interface Answers {
  id: number;
  response: string;
  resultId: number;
  question:Question;
}
