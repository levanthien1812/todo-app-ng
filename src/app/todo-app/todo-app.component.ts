import { INITIAL_TODOS } from './../lib/data/dummy/todos';
import { Component, effect, signal, Signal } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Todo } from '../lib/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoFilter } from '../lib/interfaces/filter.interface';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../lib/services/auth.service';
import { TodoService } from '../lib/services/todo.service';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [TodoListComponent, TodoFilterComponent, RouterOutlet],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css',
})
export class TodoAppComponent {
  todoList = signal<Todo[]>([]);
  filterredTodoList = signal<Todo[]>([]);
  filter = signal<Partial<TodoFilter> | null>(null);
  showFilter = signal<boolean>(false);

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private todoService: TodoService
  ) {
    this.todoService.getTodos().subscribe({
      next: (res) => {
        this.todoList.set(res);
        this.filterredTodoList.set(res);
      },
      error: (err) => {
        alert(err.message);
      },
    });

    effect(
      () => {
        const filter = this.filter();
        let filteredTodoList = this.todoList();
        if (filter) {
          if (filter.startDate) {
            filteredTodoList = this.todoList().filter(
              (todo) => todo.dueDate >= filter.startDate!
            );
          }
          if (filter.endDate) {
            filteredTodoList = filteredTodoList.filter(
              (todo) => todo.dueDate <= filter.startDate!
            );
          }
          if (filter.searchString) {
            filteredTodoList = filteredTodoList.filter(
              (todo) =>
                todo.title.includes(filter.searchString!) ||
                todo.description.includes(filter.searchString!)
            );
          }
          if (filter.isImportant) {
            filteredTodoList = filteredTodoList.filter(
              (todo) => todo.isImportant === filter.isImportant
            );
          }
          if (filter.isUrgent) {
            filteredTodoList = filteredTodoList.filter(
              (todo) => todo.isUrgent === filter.isUrgent
            );
          }
        }
        this.filterredTodoList.set(filteredTodoList);
      },
      {
        allowSignalWrites: true,
      }
    );
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
            .filter((subtask: string) => subtask.trim().length > 0)
            .map((subtask: string) => ({
              title: subtask,
              isCompleted: false,
            })),
          tags: result.tags.filter((tag: string) => tag.trim().length > 0),
        };
        this.todoService.createTodo(mappedResult).subscribe({
          next: (res) => {
            this.todoList.set([...this.todoList(), res]);
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

  onLogout(): void {
    this.authService.logout();
  }
}
