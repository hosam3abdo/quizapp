
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './components/quiz-details/quiz-details.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { ResultComponent } from './components/result/result.component';
import { StartExamComponent } from './components/start-exam/start-exam.component';
import {MatIconModule} from '@angular/material/icon'
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { QuizAnswerFormComponent } from './components/quiz-answer-form/quiz-answer-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './gaurds/auth.gaurd';
import { ErrorHandlerInterceptor } from './error-handler.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizDetailComponent,
    QuestionListComponent,
    QuestionDetailsComponent,
    ResultComponent,
    StartExamComponent,
    QuizFormComponent,
    QuestionFormComponent,
    EditQuestionComponent,
    AddQuizComponent,
    QuizAnswerFormComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpTranslateLoaderFactory,
        deps:[HttpClient]
      }
    })

  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// set NODE_OPTIONS=--openssl-legacy-provider
