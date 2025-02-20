import { Injectable } from '@angular/core';
import { API_ROUTES } from '../constants/api-routes';
import { Login, Register } from '../interfaces/register.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../interfaces/auth-state.interface';
import { login, logout } from '../../store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {}

  checkEmailExists(email: string) {
    return this.http.get<{ isEmailExists: boolean }>(
      `${API_ROUTES.CHECK_EMAIL_EXISTS}/?email=${email}`
    );
  }
  register(credentials: Register) {
    return this.http.post(`${API_ROUTES.REGISTER} `, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  login(credentials: Login) {
    return this.http.post(`${API_ROUTES.LOGIN} `, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');

    this.store.dispatch(logout());

    this.router.navigate(['/login']);
  }
}
