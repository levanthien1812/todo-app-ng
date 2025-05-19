import { STATUS_OPTIONS } from '../../lib/constants/constant';
import { Component, Input } from '@angular/core';
import { Todo } from '../../lib/interfaces';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, AsyncPipe, NgIf, NgFor],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() todos: Observable<Todo[]> = new Observable();

  STATUS_OPTIONS = STATUS_OPTIONS;

  onChangeStatus({ status, id }: { status: string; id: string }) {
    // this.todoList.update((prev) => {
    //   const todoIndex = prev.findIndex((todo) => todo.id === id);
    //   const updatedTodo = { ...prev[todoIndex], status: status };
    //   const updatedTodoList = JSON.parse(JSON.stringify(prev));
    //   updatedTodoList[todoIndex] = updatedTodo;
    //   return updatedTodoList;
    // });
    this.todos;
  }
}
