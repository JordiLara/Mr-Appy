import api from "./config";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "../../types/typesAuth";

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data.user;
  },

  async login(credentials: LoginCredentials): Promise<User> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);

    if (data.token) {
      this.setToken(data.token);
    }

    return data.user;
  },

  async logout(): Promise<void> {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      this.clearToken();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<{ user: User }>("/user");
      return response.data.user;
    } catch (error) {
      return null;
    }
  },

  setToken(token: string) {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  clearToken() {
    localStorage.removeItem("token");
  },
};
