import api from "./config";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../../types/typesAuth";
import { da } from "date-fns/locale";

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data.user;
  },

  async login(credentials: LoginCredentials): Promise<User> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return {
      id_user: data.user.id_user,
      email: data.user.email,
      name: data.user.name,
      roles: data.user.roles,
      surname: data.user.surname,
    };
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<{ user: User }>("/user");
      return response.data.user;
    } catch (error) {
      return null;
    }
  },
};
