import { STATUS_OPTIONS } from './../lib/constants/constant';
import { Component, EventEmitter, input, model, output } from '@angular/core';
import { Todo } from '../lib/interfaces';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoList = model.required<Todo[]>();

  STATUS_OPTIONS = STATUS_OPTIONS;

  onChangeStatus({ status, id }: { status: string; id: string }) {
    this.todoList.update((prev) => {
      const todoIndex = prev.findIndex((todo) => todo.id === id);
      const updatedTodo = { ...prev[todoIndex], status: status };
      const updatedTodoList = JSON.parse(JSON.stringify(prev));
      updatedTodoList[todoIndex] = updatedTodo;
      return updatedTodoList;
    });
  }
}
