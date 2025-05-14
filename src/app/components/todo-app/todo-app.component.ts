import { INITIAL_TODOS } from '../../lib/data/dummy/todos';
import { Component, effect, OnInit, signal, Signal } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Subtask, Todo } from '../../lib/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoFilter } from '../../lib/interfaces/filter.interface';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service';
import { TodoService } from '../../lib/services/todo.service';
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [TodoListComponent, TodoFilterComponent, RouterOutlet],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css',
})
export class TodoAppComponent implements OnInit {
  todos$: Observable<Todo[]> = new Observable();
  filter: Partial<TodoFilter> | null = null;
  showFilter = signal<boolean>(false);
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (queryParams) => {
        console.log(queryParams);
        this.handleQueryParams(queryParams);
      }
    );
  }

  handleQueryParams(queryParams: any) {
    if (queryParams && queryParams['filter']) {
      this.filter = JSON.parse(queryParams['filter']);
    }

    console.log({ fitler: this.filter });

    let params = new HttpParams();
    for (const key in this.filter) {
      if (this.filter.hasOwnProperty(key)) {
        const value = this.filter[key as keyof TodoFilter];
        if (value !== undefined) {
          params = params.set(key, value.toString());
        }
      }
    }
    console.log(params);

    this.todos$ = this.todoService.getTodos(params);
  }

  openTodo(): void {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const mappedResult = {
          ...result,
          subtasks: result.subtasks
            .filter((subtask: Subtask) => subtask.title.trim().length > 0)
            .map((subtask: Subtask) => ({
              title: subtask.title,
              isCompleted: subtask.isCompleted || false,
            })),
          tags: result.tags.filter((tag: string) => tag.trim().length > 0),
        };
        this.todoService.createTodo(mappedResult).subscribe({
          next: (res) => {
            // this.todoList.set([...this.todoList(), res]);
            // localStorage.setItem('todoList', JSON.stringify(this.todoList()));
          },
          error: (err) => {
            alert(err.message);
          },
        });
      } else {
        console.log('no result');
      }
    });
  }
}
