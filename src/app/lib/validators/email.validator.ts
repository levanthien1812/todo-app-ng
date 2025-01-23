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
    return new Promise((resolve, reject) =>
      this.authService.checkEmailExists(control.value).subscribe({
        next: (res) => {
          if (res.isEmailExists) {
            return resolve({ emailExists: true });
          }
          return resolve(null);
        },
        error: (err) => {
          console.log(err);
          return reject(null);
        },
      })
    );
  }
}
