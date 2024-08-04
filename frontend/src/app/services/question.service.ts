import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/question'; 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getQuestionsByQuizId(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/get-question-by-quizid/${quizId}`);
  }


  getQuestionById(questionId: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/question/${questionId}`);
  }

  createQuestion(quizId: number, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/${quizId}/addquestion`, question, this.httpOptions);
  }

  updateQuestion(questionId: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/updatequestion`, question, this.httpOptions);
  }

  deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletequestion/${questionId}`);
  }
}
