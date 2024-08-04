import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QuizAnswer } from '../models/quiz-answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/quiz';

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/getquizes`);
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/get-quiz/${id}`);
  }

  createQuiz(quizData: any): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/addquiz`, quizData);
  }


  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.baseUrl}/updatequiz`, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-quiz/${id}`);
  }

  submitResponses(quizId: number, responses: QuizAnswer[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/submit`, { quizId, responses });
  }

  
}
