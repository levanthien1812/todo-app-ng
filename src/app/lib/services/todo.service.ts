import { HttpClient } from '@angular/common/http';
import { INITIAL_TODOS } from '../data/dummy/todos';
import { Todo } from '../interfaces';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '../constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  createTodo(todoBody: Todo): Observable<Todo> {
    return this.http.post<Todo>(API_ROUTES.CREATE_TODO, todoBody);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_ROUTES.GET_TODOS);
  }

  getTodo(todoId: string): Observable<Todo> {
    return this.http.get<Todo>(`${API_ROUTES.GET_TODO}/${todoId}`);
  }

  updateTodo(todoId: string, todoBody: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(
      `${API_ROUTES.UPDATE_TODO}/${todoId}`,
      todoBody
    );
  }

  deleteTodo(todoId: string): Observable<Todo> {
    return this.http.delete<Todo>(`${API_ROUTES.DELETE_TODO}/${todoId}`);
  }
}
