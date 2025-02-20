import { createAction, props } from '@ngrx/store';
import { User } from '../lib/interfaces/user.interface';

export const login = createAction(
  '[Auth] Login',
  props<{ user: User; token: string }>()
);

export const logout = createAction('[Auth] Logout');
