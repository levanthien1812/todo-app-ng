import { STATUS_VALUE, STATUS_OPTIONS } from './../lib/constants/constant';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Todo } from '../lib/interfaces';
import { getTodoById } from '../lib/services/todo.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [DatePipe, NgIf, RouterLink, NgFor],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponent implements OnInit {
  todo = signal<Todo | null>(null);
  status: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.status =
      STATUS_OPTIONS.find((option) => option.value === this.todo()?.status)
        ?.label || STATUS_OPTIONS[0].label;
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

  clickEditBtn(): void {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      data: this.todo(),
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todo.set({
          ...result,
          subtasks: result.subtasks
            .filter((subtask: string) => subtask.length > 0)
            .map((subtask: string) => ({
              title: subtask,
              isCompleted: false,
            })),
          tags: result.tags.filter((tag: string) => tag.length > 0),
        });
      }
    });
  }
}
