import { Component } from '@angular/core';
import { AuthState } from '../../../lib/interfaces/auth-state.interface';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../lib/interfaces/user.interface';
import { AuthService } from '../../../lib/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // $ sign is to indicate that user is an Observable
  user$: Observable<User | null>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService
  ) {
    //
    this.user$ = this.store.pipe(select((state) => state.auth.user));
  }

  onLogout(): void {
    this.authService.logout();
  }
}
