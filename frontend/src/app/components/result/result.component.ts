import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from '../../services/result.service';
import { Result } from '../../models/result.model';
import { QuizAnswer } from '../../models/quiz-answer.model';
import { Answers } from 'src/app/models/answers.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  userId: number ;
  quizId: number ;
  results: Result[] = [];
  answers: QuizAnswer[] = [];
  quizAnswers: Answers[] = [];
  displayedColumns: string[] = ['resultId','quizId', 'userId', 'score' , 'ResultActions'];
  displayedAnswerColumns: string[] = ['question'];
  userRole: string | null;

  constructor(
    private resultService: ResultService,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
    this.quizId = this.route.snapshot.params['quizId'];
    this.userId = this.route.snapshot.params['userId'];
    this.userRole = this.authService.getUserRoles();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.quizId = this.route.snapshot.params['quizId'];
    if (this.userId && this.quizId) {
      this.loadResult();
  }
}
  onSubmit(): void {

    if (this.userId && this.quizId) {
      this.loadResult();
    }
  }
  loadResult(): void {
    this.resultService.getResultByUserIdAndQuizId(this.userId, this.quizId).subscribe(results => {
      this.results = results;

    });
  }


}
