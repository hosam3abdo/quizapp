import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { Router } from '@angular/router';
import { QuestionDetailsComponent } from '../question-details/question-details.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  userRole: string | null;
  constructor(
    private quizService: QuizService,
    private router:Router,
    private authService:AuthService
  ) {
    this.userRole = this.authService.getUserRoles();
  }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }


  addQuiz() {
    this.router.navigate(['/add-quiz']);
  }

  deleteQuiz(id: number): void {
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.loadQuizzes();
    });
  }
}
