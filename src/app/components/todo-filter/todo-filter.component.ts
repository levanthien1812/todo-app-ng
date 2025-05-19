import {
  Component,
  effect,
  input,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Todo } from '../../lib/interfaces';
import { TodoFilter } from '../../lib/interfaces/filter.interface';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

const INITIAL_FILTER: Partial<TodoFilter> = {
  searchString: '',
};

@Component({
  selector: 'app-todo-filter',
  imports: [NgIf],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.css',
})
export class TodoFilterComponent implements OnInit {
  showFilter = model.required<boolean>();
  filter = input.required<Partial<TodoFilter> | null>();
  currentFilter = signal<Partial<TodoFilter>>(INITIAL_FILTER);

  constructor(private router: Router) {}

  ngOnInit(): void {
    const filterValue = this.filter();
    if (filterValue) {
      this.currentFilter.set(filterValue);
    }
  }

  navigateTodosWithFilter(): void {
    this.router.navigate(['/todos'], {
      queryParams: {
        filter: JSON.stringify(this.currentFilter()),
      },
    });
  }

  applyFilter(): void {
    this.navigateTodosWithFilter();
  }

  resetFilter(): void {
    this.currentFilter.update(() => INITIAL_FILTER);
    this.navigateTodosWithFilter();
  }

  toggleFilter(): void {
    this.showFilter.set(!this.showFilter());
  }

  changeField($event: any): void {
    let customizedValue = $event.target.value;
    if (
      $event.target.name === 'isImportant' ||
      $event.target.name === 'isUrgent'
    ) {
      customizedValue = $event.target.checked;
    }
    this.currentFilter.update((prev) => ({
      ...prev,
      [`${$event.target.name}`]: customizedValue,
    }));
  }
}
