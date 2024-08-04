import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Quiz } from 'src/app/models/quiz.model';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(
    private quizService: QuizService,
    private router:Router,
    private authService:AuthService,
    private translateService:TranslateService
  ) {

  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      alert('You need to log in first.');
      this.router.navigate(['']);
    }
    this.loadQuizzes();
    this.translateService.onLangChange.subscribe(() => {
      this.loadQuizzes();
    });
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      this.translateService.use(storedLanguage);
    } else {
      this.translateService.use('en');
    }
  }

  isAdmin(): boolean {
    return this.authService.getUserRoles() === '["ROLE_ADMIN"]';
  }

  loadQuizzes() {
    this.quizService.getQuizzes().subscribe(data => {
      this.quizzes = data;
    });
  }

  logout() {
    localStorage.removeItem('selectedLanguage');
    this.authService.logout();
    alert('logout successful')
    this.router.navigate(['']);
  }

   translate(event: any) {
    const selectedLang = event.target.value;
    localStorage.setItem('selectedLanguage', selectedLang);
    this.translateService.use(selectedLang);
  }
}
