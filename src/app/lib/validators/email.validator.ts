import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmailExistsValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this.authService
      .checkEmailExists(control.value)
      .then((result) => {
        return result.isEmailExists ? { emailExists: true } : null;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
