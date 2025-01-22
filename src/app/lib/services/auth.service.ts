import { Injectable } from '@angular/core';
import { API_ROUTES } from '../constants/api-routes';
import { Register } from '../interfaces/register.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  checkEmailExists: (email: string) => Promise<{ isEmailExists: boolean }> =
    async (email: string) => {
      try {
        const res = await fetch(
          `${API_ROUTES.CHECK_EMAIL_EXISTS}?email=${email}`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  register: (body: Register) => Promise<any> = async (body: Register) => {
    try {
      const res = await fetch(`${API_ROUTES.REGISTER} `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
