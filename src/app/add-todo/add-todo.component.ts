import { STATUS_OPTIONS } from './../lib/constants/constant';
import { Component, Inject, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from '../lib/interfaces';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
  providers: [MatDatepickerModule],
})
export class AddTodoComponent {
  form!: FormGroup;
  STATUS_OPTIONS = STATUS_OPTIONS;

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Todo
  ) {
    this.form = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description],
      dueDate: [data.dueDate, Validators.required],
      status: [data.status, Validators.required],
      isImportant: [data.isImportant, Validators.required],
      isUrgent: [data.isUrgent, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
