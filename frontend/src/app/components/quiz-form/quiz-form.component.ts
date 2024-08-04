import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {
  quizForm: FormGroup;
  quizId: number;
  public router: Router;
  userRole: string | null;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
     router: Router,
     private authService:AuthService
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.quizId = this.route.snapshot.params['id'];
    this.router = router;
    this.userRole = this.authService.getUserRoles();
  }

  ngOnInit(): void {
    if (this.quizId) {
      this.quizService.getQuizById(this.quizId).subscribe(quiz => {
        this.quizForm.patchValue(quiz);

      });
    }
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      const quiz: Quiz = this.quizForm.value;

      if (this.quizId) {
        quiz.id = this.quizId;
        this.quizService.updateQuiz(quiz).subscribe(() => {
          this.router.navigate(['/quizzes']);
        });
      } else {
        this.quizService.createQuiz(quiz).subscribe(() => {
          this.router.navigate(['/quizzes']);
        });
      }
    }
  }
}
