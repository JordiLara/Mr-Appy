import api from "./config";
import { Mood } from "../../types";

export const moodService = {

  create: async (data: Omit<Mood, "id">) => {
    const response = await api.post("/moods", data);
    return response.data;
  },

  getUserMoods: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get("/moods/user", { params });
    return response.data;
  },

  getTeamMoods: async (
    id_team: string,
    params?: { startDate?: string; endDate?: string }
  ) => {
    const response = await api.get(`/moods/team/${id_team}`, { params });
    return response.data;
  },

  getStats: async (id_team?: string) => {
    const response = await api.get(
      `/moods/stats${id_team ? `?id_team=${id_team}` : ""}`
    );
    return response.data;
  },

  update: async (id: string, data: Partial<Mood>) => {
    const response = await api.put(`/moods/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/moods/${id}`);
  },

  getUserCalendarData: async () => {
    const response = await api.get("/calendar/reviews");
    return response.data.calendarData;
  },
};
