import { environment } from '../../../environments/environment';

export const API_ROUTES = {
  CHECK_EMAIL_EXISTS: `${environment.apiUrl}/auth/check-email-exists`,
  LOGIN: `${environment.apiUrl}/auth/login`,
  REGISTER: `${environment.apiUrl}/auth/register`,
  GET_TODOS: `${environment.apiUrl}/todos`,
  GET_TODO: `${environment.apiUrl}/todos`,
  CREATE_TODO: `${environment.apiUrl}/todos`,
  UPDATE_TODO: `${environment.apiUrl}/todos`,
  DELETE_TODO: `${environment.apiUrl}/todos`,
};
