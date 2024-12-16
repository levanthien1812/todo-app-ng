import { Component, signal, Signal } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Todo } from '../lib/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css',
})
export class TodoAppComponent {
  todoList = signal<Todo[]>([]);

  constructor(public dialog: MatDialog) {}

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
      if (result) console.log(result);
    });
  }
}
