import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../lib/validators';
import { RequiredLabelDirective } from '../../directives/required-label.directive';
import { EmailExistsValidator } from '../../lib/validators/email.validator';
import { AuthService } from '../../lib/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, RequiredLabelDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form: FormGroup;
  isCorrectConfirmPassword = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private emailExistsValidator: EmailExistsValidator,
    private authService: AuthService
  ) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email],
          [this.emailExistsValidator.validate.bind(this.emailExistsValidator)],
          {
            updateOn: 'blur',
          },
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
      },
      {
        validators: passwordMatchValidator(),
      }
    );
  }

  onSubmit() {
    this.authService.register(this.form.value).then((res) => {
      console.log(res);
    });
  }
}
