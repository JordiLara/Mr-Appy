import api from "./config";
import { User, LoginCredentials, AuthResponse } from "../../types/typesAuth";

export const authService = {
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
      const { data } = await api.get<{ user: User }>("/auth/me");
      return data.user;
    } catch (error) {
      return null;
    }
  },
};
