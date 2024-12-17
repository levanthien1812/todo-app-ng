import { STATUS_OPTIONS } from './../lib/constants/constant';
import { Component, input, model } from '@angular/core';
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

  onChangeStatus({ status, title }: { status: string; title: string }) {
    this.todoList.update((prev) => {
      console.log('ksjflksdf');
      const todoIndex = prev.findIndex((todo) => todo.title === title);
      const updatedTodo = { ...prev[todoIndex], status: status };
      const updatedTodoList = JSON.parse(JSON.stringify(prev));
      updatedTodoList[todoIndex] = updatedTodo;
      return updatedTodoList;
    });
  }
}
