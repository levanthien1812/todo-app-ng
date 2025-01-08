import { STATUS_OPTIONS, STATUS_VALUE } from './../lib/constants/constant';
import { Component, Inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Todo } from '../lib/interfaces';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatNativeDateModule,
    NgIf,
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
  providers: [MatDatepickerModule],
})
export class AddTodoComponent {
  form!: FormGroup;
  STATUS_OPTIONS = STATUS_OPTIONS;
  showDetail = signal(false);

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private fb: FormBuilder,
    @Inject('data') public data?: Todo
  ) {
    if (data) {
      this.form = this.fb.group({
        id: [data.id],
        title: [data.title],
        description: [data?.description],
        dueDate: [data.dueDate],
        status: [data.status],
        isImportant: [data.isImportant],
        isUrgent: [data.isUrgent],
        subtasks: this.fb.array(
          data.subtasks?.map((subtask) => subtask.title) || ['']
        ),
        notes: [data.notes],
        tags: this.fb.array(data.tags || []),
      });
    } else
      this.form = this.fb.group({
        id: [Number(Math.random().toFixed(4)) * 10000],
        title: ['', Validators.required],
        description: [''],
        dueDate: [new Date(), Validators.required],
        status: [STATUS_VALUE.NOT_STARTED, Validators.required],
        isImportant: [false, Validators.required],
        isUrgent: [false, Validators.required],
        subtasks: this.fb.array(['']),
        notes: [''],
        tags: this.fb.array([]),
      });
  }

  get subtasks() {
    return this.form.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control(''));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  clickDetail() {
    this.showDetail.set(!this.showDetail());
  }
}
