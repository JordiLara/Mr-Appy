export interface User {
  id_user: string;
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
  id_team?: number;
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
