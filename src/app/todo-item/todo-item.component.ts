import { STATUS_OPTIONS } from './../lib/constants/constant';
import { Component, input, output } from '@angular/core';
import { Todo } from '../lib/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ToggleColorDirective } from '../directives/toggle-color.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    MatIconModule,
    DatePipe,
    ToggleColorDirective,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  todoItem = input.required<Todo>();
  STATUS_OPTIONS = STATUS_OPTIONS;

  statusChanged = output<{ status: string; title: string }>();

  onChangeStatus($event: any) {
    this.statusChanged.emit({
      status: $event.target.value,
      title: this.todoItem().title,
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
