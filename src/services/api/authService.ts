import api from "./config";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../../types/typesAuth";

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<User> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data.user;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await api.get<{ user: User }>("/user");
      return data.user;
    } catch (error) {
      return null;
    }
  },
};
