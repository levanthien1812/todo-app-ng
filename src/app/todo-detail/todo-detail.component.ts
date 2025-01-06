import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../lib/interfaces';
import { getTodoById } from '../lib/services/todo.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponent implements OnInit {
  todo = signal<Todo | null>(null);

  constructor(private route: ActivatedRoute) {
    console.log('hhello');
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const todoId = +params['todo-id'];

      try {
        const fetchedTodo = await getTodoById(todoId);
        this.todo.set(fetchedTodo);
      } catch (err: any) {
        console.error(err.message);
      }
    });
  }
}
