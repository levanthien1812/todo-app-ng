import { Component, input, model, output, signal } from '@angular/core';
import { Todo } from '../lib/interfaces';
import { TodoFilter } from '../lib/interfaces/filter.interface';

const INITIAL_FILTER: Partial<TodoFilter> = {
  startDate: undefined,
  endDate: undefined,
  searchString: '',
  status: undefined,
  isImportant: false,
  isUrgent: false,
};

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.css',
})
export class TodoFilterComponent {
  filter = model.required<Partial<TodoFilter> | null>();
  showFilter = model.required<boolean>();
  currentFilter = signal<Partial<TodoFilter>>(INITIAL_FILTER);

  applyFilter(): void {
    this.filter.update(() => this.currentFilter());
  }

  resetFilter(): void {
    this.filter.update(() => INITIAL_FILTER);
  }

  toggleFilter(): void {
    this.showFilter.set(!this.showFilter());
  }

  changeField($event: any): void {
    console.log('changed');
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
