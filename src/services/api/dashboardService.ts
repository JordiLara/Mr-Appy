import { fetchData } from "./apiUtils";

export const dashboardService = {
  getMoods: () => fetchData("/dashboard/moods"),
  getReviews: async () => {
    const data = await fetchData("/dashboard/reviews");
    return data.reviews;
  },
  getActivity: async () => {
    const data = await fetchData("/dashboard/activity");
    return data.activity;
  },
  getTeamSize: () => fetchData("/dashboard/team-size"),
};
