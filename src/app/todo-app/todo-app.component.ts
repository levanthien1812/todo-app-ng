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

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.todoList.set(INITIAL_TODOS);
    this.filterredTodoList.set(this.todoList());

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
          subtasks: result.subtasks.map((subtask: string) => ({
            title: subtask,
            isCompleted: false,
          })),
        };
        this.todoList.set([...this.todoList(), mappedResult]);
        localStorage.setItem('todoList', JSON.stringify(this.todoList()));
      } else {
        console.log('no result');
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
