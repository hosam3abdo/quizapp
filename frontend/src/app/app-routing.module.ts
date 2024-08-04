import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './components/quiz-details/quiz-details.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { ResultComponent } from './components/result/result.component';
import { StartExamComponent } from './components/start-exam/start-exam.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { QuizAnswerFormComponent } from './components/quiz-answer-form/quiz-answer-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './gaurds/auth.gaurd';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]  },
  { path: 'quizzes', component: QuizListComponent , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' } },
  { path: 'quiz/:id', component: QuizDetailComponent , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' } },
  { path: 'add-quiz', component: AddQuizComponent, canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' } },
  { path: 'quiz/:id/edit', component: QuizFormComponent , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' } },
  { path: 'quiz-details/:id', component: QuestionListComponent , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' } },
  { path: 'quiz/:quizId/questions', component: QuestionListComponent },
  { path: 'quiz/:quizId/question/:id/edit', component: EditQuestionComponent , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' }},
  { path: 'quiz/:quizId/question/new', component: QuestionFormComponent , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' } },
  { path: 'quiz/:quizId/start', component: StartExamComponent },
  { path: 'result/:resultId' , component:QuizAnswerFormComponent , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' }},
  { path: 'quiz/:quizId/:userId/result', component: ResultComponent  , canActivate: [AuthGuard], data: { expectedRole: '["ROLE_ADMIN"]' } },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
