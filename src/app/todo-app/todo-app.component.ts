import { INITIAL_TODOS } from './../lib/data/dummy/todos';
import { Component, effect, signal, Signal } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Todo } from '../lib/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoFilter } from '../lib/interfaces/filter.interface';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
import { RouterOutlet } from '@angular/router';

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

  constructor(public dialog: MatDialog) {
    this.todoList.set(INITIAL_TODOS);
    this.filterredTodoList.set(this.todoList());

    effect(
      () => {
        const filter = this.filter();
        if (filter) {
          if (filter.startDate) {
            this.filterredTodoList.set(
              this.filterredTodoList().filter(
                (todo) => todo.dueDate >= filter.startDate!
              )
            );
          }
          if (filter.endDate) {
            this.filterredTodoList.set(
              this.filterredTodoList().filter(
                (todo) => todo.dueDate <= filter.startDate!
              )
            );
          }
          if (filter.searchString) {
            this.filterredTodoList.set(
              this.filterredTodoList().filter(
                (todo) =>
                  todo.title.includes(filter.searchString!) ||
                  todo.description.includes(filter.searchString!)
              )
            );
          }
          if (filter.isImportant) {
            this.filterredTodoList.set(
              this.filterredTodoList().filter(
                (todo) => todo.isImportant === filter.isImportant
              )
            );
          }
          if (filter.isUrgent) {
            this.filterredTodoList.set(
              this.filterredTodoList().filter(
                (todo) => todo.isUrgent === filter.isUrgent
              )
            );
          }
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  openTodo(): void {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      width: '500px',
      data: {
        title: '',
        description: '',
        dueDate: new Date(),
        status: 'not-started',
        isImportant: false,
        isUrgent: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoList.set([...this.todoList(), result]);
        localStorage.setItem('todoList', JSON.stringify(this.todoList()));
      } else {
        console.log('no result');
      }
    });
  }
}
