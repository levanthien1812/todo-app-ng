import {
  ALLOWED_MAXIMUM_TAGS,
  STATUS_OPTIONS,
  STATUS_VALUE,
} from './../lib/constants/constant';
import {
  Component,
  ElementRef,
  Inject,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
  currentTagIndex = signal(0);

  @ViewChildren('tagInput') tagInputs!: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: Todo
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
        notes: data.notes,
        tags: this.fb.array(
          data.tags && data.tags.length > 0 ? data.tags : [''],
          [Validators.minLength(1)]
        ),
      });
    } else
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        dueDate: [new Date(), Validators.required],
        status: [STATUS_VALUE.NOT_STARTED, Validators.required],
        isImportant: [false, Validators.required],
        isUrgent: [false, Validators.required],
        subtasks: this.fb.array([this.fb.control('')]),
        notes: '',
        tags: this.fb.array([this.fb.control('')]),
      });
  }

  get subtasks() {
    return this.form.get('subtasks') as FormArray;
  }

  enterSubtask(event: any) {
    event.preventDefault();
  }

  addSubtask() {
    this.subtasks.push(this.fb.control(''));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  addTag(event: any, index: number) {
    event.preventDefault();
    if (event.target.value.trim().length === 0) return;

    // Prevent dublicate tags
    if (
      this.tags.length > 1 &&
      this.tags.at(index - 1).value.trim() === event.target.value.trim()
    )
      return;

    this.currentTagIndex.set(index + 1);
    this.tags.push(this.fb.control(''));

    setTimeout(() => {
      const tagInputsArray = this.tagInputs.toArray();
      tagInputsArray[index + 1].nativeElement.focus();
    });
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  clickDetail() {
    this.showDetail.set(!this.showDetail());
  }
}
