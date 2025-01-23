import { Injectable } from '@angular/core';
import { API_ROUTES } from '../constants/api-routes';
import { Register } from '../interfaces/register.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  checkEmailExists: (email: string) => Observable<{ isEmailExists: boolean }> =
    (email: string) => {
      return this.http.get<{ isEmailExists: boolean }>(
        `${API_ROUTES.CHECK_EMAIL_EXISTS}/?email=${email}`
      );
    };
  register: (body: Register) => Observable<any> = (body: Register) => {
    return this.http.post(`${API_ROUTES.REGISTER} `, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}
