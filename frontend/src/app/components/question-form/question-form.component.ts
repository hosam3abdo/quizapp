import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormGroup;
  quizId!: number;
  questionId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      quizId: [this.quizId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('quizId')!;
    this.questionId = +this.route.snapshot.paramMap.get('id')!;

    this.questionForm.get('quizId')?.setValue(this.quizId);

    if (this.questionId) {
      this.questionService.getQuestionById(this.questionId).subscribe((question) => {
        this.questionForm.patchValue(question);
      });
    }
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      if (this.questionId) {
        this.questionService.updateQuestion(this.questionId, this.questionForm.value).subscribe(() => {
          this.router.navigate([`/quiz/${this.quizId}/questions`]);
        });
      } else {
        this.questionService.createQuestion(this.quizId, this.questionForm.value).subscribe(() => {
          this.router.navigate([`/quiz/${this.quizId}/questions`]);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate([`/quiz/${this.quizId}/questions`]);
  }
}
