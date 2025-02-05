import { STATUS_OPTIONS } from './../lib/constants/constant';
import { Component, input, output } from '@angular/core';
import { Todo } from '../lib/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgIf } from '@angular/common';
import { ToggleColorDirective } from '../directives/toggle-color.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TodoService } from '../lib/services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    MatIconModule,
    DatePipe,
    ToggleColorDirective,
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  todoItem = input.required<Todo>();
  STATUS_OPTIONS = STATUS_OPTIONS;

  statusChanged = output<{ status: string; id: string }>();

  constructor(private todoService: TodoService) {}

  onChangeStatus($event: any) {
    this.statusChanged.emit({
      status: $event.target.value,
      id: this.todoItem().id,
    });
    this.todoService
      .updateTodo(this.todoItem().id, {
        status: $event.target.value,
      })
      .subscribe({
        next: (res) => {
          // this.todoItem.set(res);
        },
        error: (err) => {
          alert(err.message);
        },
      });
  }

  statusColors: Record<string, { badge: string; border: string }> = {
    'not-started': {
      badge: 'bg-gray-500 text-white',
      border: 'border-gray-500',
    },
    'in-progress': {
      badge: 'bg-yellow-600 text-white',
      border: 'border-yellow-600',
    },
    done: { badge: 'bg-green-600 text-white', border: 'border-green-600' },
  };

  getStatusLabel(): string | undefined {
    const status = this.todoItem().status;
    return this.STATUS_OPTIONS.find((option) => option.value === status)?.label;
  }

  getStatusClass() {
    const status = this.todoItem().status;
    return this.statusColors[status];
  }
}
