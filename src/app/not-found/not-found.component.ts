import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private router: Router) {}
  goToTodoList() {
    // SHOULD NOT USE BECAUSE THE PAGE WILL BE RELOADED
    // window.location.href = '/todos';
    this.router.navigate(['/todos']);
  }
}
