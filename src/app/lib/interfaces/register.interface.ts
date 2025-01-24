export interface Register {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  email: string;
  password: string;
}
