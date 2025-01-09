import api from "./config";
import { User } from "../../types";

export const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: Partial<User>) => {
    const response = await api.put("/users/profile", data);
    return response.data;
  },

  // Get user statistics
  getStats: async () => {
    const response = await api.get("/users/stats");
    return response.data;
  },

  // Update user settings
  updateSettings: async (settings: any) => {
    const response = await api.put("/users/settings", settings);
    return response.data;
  },
};
