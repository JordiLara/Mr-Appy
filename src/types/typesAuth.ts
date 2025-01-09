export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: "manager" | "employee";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
