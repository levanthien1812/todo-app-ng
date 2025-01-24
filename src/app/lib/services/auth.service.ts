import { Injectable } from '@angular/core';
import { API_ROUTES } from '../constants/api-routes';
import { Login, Register } from '../interfaces/register.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  checkEmailExists(email: string) {
    return this.http.get<{ isEmailExists: boolean }>(
      `${API_ROUTES.CHECK_EMAIL_EXISTS}/?email=${email}`
    );
  }
  register(credentials: Register) {
    return this.http
      .post(`${API_ROUTES.REGISTER} `, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.tokens.access.token);

          this.isAuthenticated.next(true);

          this.router.navigate(['/todos']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  login(credentials: Login) {
    return this.http
      .post(`${API_ROUTES.LOGIN} `, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.tokens.access.token);

          this.isAuthenticated.next(true);

          this.router.navigate(['/todos']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');

    this.isAuthenticated.next(false);

    this.router.navigate(['/login']);
  }
}
