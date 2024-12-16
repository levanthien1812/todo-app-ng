import { Component, Inject, OnInit } from '@angular/core';
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
    CommonModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
  providers: [MatDatepickerModule],
})
export class AddTodoComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Todo
  ) {
    console.log(data);
    this.form = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
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
