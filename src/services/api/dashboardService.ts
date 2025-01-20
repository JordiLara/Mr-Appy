import api from "../api/config";

export const dashboardService = {
  getMoods: async () => {
    const response = await api.get("/dashboard/moods");
    return response.data.data;
  },
  getReviews: async () => {
    const response = await api.get("/dashboard/reviews");
    return response.data.reviews;
  },
  getActivity: async () => {
    const response = await api.get("/dashboard/activity");
    return response.data.activity;
  },
  getTeamSize: async () => {
    const response = await api.get("/dashboard/team-size");
    return response.data;
  },
};
