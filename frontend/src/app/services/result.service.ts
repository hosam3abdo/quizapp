import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Result } from '../models/result.model';
import { Answers } from '../models/answers.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  submitResponses(userId: number,quizId: number, responses: any[]): Observable<any> {
    const url = `http://localhost:8080/quiz/submit?userid=${userId}&quizid=${quizId}`;
    return this.http.post(url, responses);
  }


  getResultByUserIdAndQuizId(userId: number, quizId: number): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.baseUrl}/result/user/${userId}/quiz/${quizId}`);
  }

  getAnswersByResultId(resultId: number): Observable<Answers[]> {
    const url = `${this.baseUrl}/result/resultid/${resultId}`;
    console.log(`Requesting answers from URL: ${url}`); // Log the constructed URL
    return this.http.get<Answers[]>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
