import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { ResultService } from '../../services/result.service';
import { Question } from '../../models/question.model';
import { QuizAnswer } from '../../models/quiz-answer.model';
import { QuizService } from 'src/app/services/quiz.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {
  examForm: FormGroup;
  quizId: number;
  questions: Question[] = [];
  userId: number ;
  userRole: string | null;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private resultService: ResultService,
    private route: ActivatedRoute,
    private translateService:TranslateService,
    private router: Router,
    private authService:AuthService
  ) {
    this.examForm = this.fb.group({
      responses: this.fb.array([])
    });

    this.quizId = this.route.snapshot.params['quizId'];
    this.userId = Number(localStorage.getItem('userId'));
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit(): void {

    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestionsByQuizId(this.quizId).subscribe(questions => {
      this.questions = questions;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.examForm = this.fb.group({
      responses: this.fb.array([], Validators.required)
    });

    this.questions.forEach(question => {
      this.getResponsesFormArray().push(
        this.fb.group({
          question: {
            id: [question.id],
          },
          response: ['', Validators.required]
        })
      );
    });
  }


   getResponsesFormArray(): FormArray {
    return this.examForm.get('responses') as FormArray;
  }

  getOptions(questionIndex: number): string[] {
    const question = this.questions[questionIndex];
    return [question.option1, question.option2, question.option3, question.option4];
  }


  onSubmit(): void {
    if (this.examForm.valid) {
      console.log('Submit Quiz:', this.examForm.value.responses);
      const responses = this.examForm.value.responses.map((response: any) => ({
        question: { id: response.question.id[0] },
        response: response.response
      }));

      this.resultService.submitResponses(this.userId, this.quizId, responses).subscribe(score => {
        this.translateService.get('quizinfo.Your_score_is', { score }).subscribe((translatedMessage: string) => {
          alert(translatedMessage);
        this.router.navigate(['/home']);
      });
    })
  }
  else {

      console.error('Form is invalid.');
    }
  }


}
