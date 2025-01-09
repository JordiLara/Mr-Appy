import api from "./api";
import { Mood } from "../types";

export const moodService = {
  // Create a new mood entry
  create: async (data: Omit<Mood, "id">) => {
    const response = await api.post("/moods", data);
    return response.data;
  },

  // Get moods for the current user
  getUserMoods: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get("/moods/user", { params });
    return response.data;
  },

  // Get team moods (for managers)
  getTeamMoods: async (
    teamId: string,
    params?: { startDate?: string; endDate?: string }
  ) => {
    const response = await api.get(`/moods/team/${teamId}`, { params });
    return response.data;
  },

  // Get mood statistics
  getStats: async (teamId?: string) => {
    const response = await api.get(
      `/moods/stats${teamId ? `?teamId=${teamId}` : ""}`
    );
    return response.data;
  },

  // Update a mood entry
  update: async (id: string, data: Partial<Mood>) => {
    const response = await api.put(`/moods/${id}`, data);
    return response.data;
  },

  // Delete a mood entry
  delete: async (id: string) => {
    await api.delete(`/moods/${id}`);
  },
};
