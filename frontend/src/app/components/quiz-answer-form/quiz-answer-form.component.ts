import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { ActivatedRoute } from '@angular/router';
import { Answers } from 'src/app/models/answers.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quiz-answer-form',
  templateUrl: './quiz-answer-form.component.html',
  styleUrls: ['./quiz-answer-form.component.css']
})
export class QuizAnswerFormComponent implements OnInit  {
  @Input() resultId: number;
  answers: Answers[] = [];
  userRole: string | null;

  constructor(
    private quizAnswerService: ResultService,
    private route:ActivatedRoute,
    private authService:AuthService
  ) {
    this.resultId = this.route.snapshot.params['resultId'];
    this.userRole = this.authService.getUserRoles();
  }
  ngOnInit(): void {
    this.resultId = this.route.snapshot.params['resultId'];
   this.loadAnswers(this.resultId);
  }



  loadAnswers(resultId: number): void {
    if (!resultId) {
      console.error('Result ID is missing');
      return;
    }

    console.log(`Loading answers for result ID: ${resultId}`);

    this.quizAnswerService.getAnswersByResultId(resultId).subscribe(answers => {
      this.answers = answers;
    });
  }
}
