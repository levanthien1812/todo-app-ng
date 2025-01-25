import { Routes } from '@angular/router';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './lib/services/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    component: SignupComponent,
    title: 'Sign Up',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'todos',
    component: TodoAppComponent,
    title: 'Todo App',
    canActivate: [AuthGuard],
  },
  {
    path: 'todos/:todoId',
    component: TodoDetailComponent,
    title: 'Todo Detail',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    // redirectTo: 'todos',
    component: NotFoundComponent,
  },
];
