import { environment } from '../../../environments/environment';

export const API_ROUTES = {
  CHECK_EMAIL_EXISTS: `${environment.apiUrl}/auth/check-email-exists`,
  LOGIN: `${environment.apiUrl}/auth/login`,
  REGISTER: `${environment.apiUrl}/auth/register`,
};
