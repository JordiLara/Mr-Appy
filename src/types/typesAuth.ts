export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  roles: "manager" | "user";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
  employeeRole: string;
  roles: string;
  teamId?: number;
  companyName?: string;
  teamName?: string;
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
