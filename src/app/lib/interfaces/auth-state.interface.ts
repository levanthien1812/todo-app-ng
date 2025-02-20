import { User } from './user.interface';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
