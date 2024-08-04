import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.authService.isAuthenticated()) {
      alert('You need to log in first.');
      this.router.navigate(['']);
      return false;
    }


    const expectedRole = route.data.expectedRole;
    const userRole = this.authService.getUserRole();
    if (expectedRole && userRole !== expectedRole) {
      console.log('User role:', userRole, 'Expected role:', expectedRole);
      alert('You are not authorized to enter here');
      this.router.navigate(['/home']);
      return false;


    }


    return true;
  }
}
