import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  quizId!: number;
  questions: Question[] = [];
  displayedColumns: string[] = ['questionText', 'options', 'correctAnswer', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('quizId')!;
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestionsByQuizId(this.quizId).subscribe((questions) => {
      this.questions = questions;
    });
  }

  addQuestion(): void {
    this.router.navigate([`/quiz/${this.quizId}/question/new`]);
  }

  editQuestion(id: number): void {
    this.router.navigate([`/quiz/${this.quizId}/question/${id}/edit`]);
  }

  deleteQuestion(id: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(id).subscribe(() => {
        this.loadQuestions();
      });
    }
  }
}
