import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RequiredLabelDirective } from '../../lib/directives/required-label.directive';
import { AuthService } from '../../lib/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../lib/interfaces/auth-state.interface';
import { login } from '../../store/auth.actions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RequiredLabelDirective, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.authService.login(this.form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.tokens.access.token);

        this.store.dispatch(
          login({
            user: { name: res.user.name, email: res.user.email },
            token: res.tokens.access.token,
          })
        );

        this.router.navigate(['/todos']);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set(err?.error?.message || null);
      },
    });
  }
}
