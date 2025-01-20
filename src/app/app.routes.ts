import { Routes } from '@angular/router';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';

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
  },
  {
    path: 'todos/:todo-id',
    component: TodoDetailComponent,
    title: 'Todo Detail',
  },
  {
    path: '**',
    // redirectTo: 'todos',
    component: NotFoundComponent,
  },
];
