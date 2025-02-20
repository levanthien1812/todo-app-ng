import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../lib/interfaces/auth-state.interface';
import { login, logout } from './auth.actions';

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const AuthReducer = createReducer(
  initialAuthState,
  on(login, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
  })),
  on(logout, () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }))
);
