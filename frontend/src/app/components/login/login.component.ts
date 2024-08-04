import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  passWord: string = '';

  constructor(private authService: AuthService , private router:Router) {}

  onSubmit() {
    console.log('Submitting login form with username:', this.userName);
    this.authService.login(this.userName, this.passWord).subscribe(
      (success: boolean) => {
        if (success) {
          console.log('Login successful');
          this.router.navigate(['/home']);
        } else {
          console.log('Login failed');
        }
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
  
}
