import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private tokenKey = 'auth_token';
  private userRole!: any;


  constructor(private http: HttpClient) {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.userRole = storedRole;

    } else {
      this.userRole = null;
    }

  }


  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ userName: username, passWord: password });

    console.log('Sending login request with body:', body);

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers, observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        console.log('Received login response:', response);
        console.log('Response headers:', response.headers.keys());
        response.headers.keys().forEach(key => {
          console.log(`Header: ${key} => ${response.headers.get(key)}`);
        });

        const token = response.headers.get('Authorization');
        console.log('Extracted token:', token );
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          const decodedToken: any = jwtDecode(token);
          console.log('Decoded Token:', decodedToken);
          localStorage.setItem('userId', decodedToken.userId);
          console.log('userId', decodedToken.userId);
          localStorage.setItem('userRole', decodedToken.roles);

          this.userRole = decodedToken.roles;
          console.log('roles' , this.userRole)
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }


  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getUserRole(): string {
    return  this.userRole ;
}

getUserRoles(): string {
  if (!this.userRole) {
    this.userRole = localStorage.getItem('userRole') || '';
  }
  return this.userRole;
}
logout() {
  return this.http.post(`${this.apiUrl}/logout`, {}).subscribe(
    () => {

      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');


    },
    (error) => {
      const errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.error('Logout error', errorMessage);

    }
  );
}
}


