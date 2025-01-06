import { Routes } from '@angular/router';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
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
