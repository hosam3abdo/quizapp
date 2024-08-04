import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  quizId!: number;
  questionId!: number;
  questionText!:string;

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
      quizId: [this.quizId, Validators.required],
      questionId: [this.questionId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.quizId = +params.get('quizId')!;
      this.questionId = +params.get('id')!;

      this.questionForm.get('quizId')?.setValue(this.quizId);
      this.questionForm.get('questionId')?.setValue(this.questionId);

      this.questionService.getQuestionById(this.questionId).subscribe((question: Question) => {
        this.questionForm.patchValue(question);
        this.questionForm.patchValue({ quizId: this.quizId });
      });
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const updatedQuestion: Question = { ...this.questionForm.value,id: this.questionId, quizId: this.quizId };

      this.questionService.updateQuestion(this.questionId, updatedQuestion).subscribe(() => {
        this.router.navigate([`/quiz/${this.quizId}/questions`]);
      });
    }
  }
onCancel(): void {
  this.router.navigate([`/quiz/${this.quizId}/questions`]);
}
}
