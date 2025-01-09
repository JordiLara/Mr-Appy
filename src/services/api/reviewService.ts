import api from "./config";

export const reviewService = {
  // Get team reviews
  getTeamReviews: async (
    teamId: string,
    params?: {
      mood?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    }
  ) => {
    const response = await api.get(`/reviews/team/${teamId}`, { params });
    return response.data;
  },

  // Add like to review
  likeReview: async (reviewId: string) => {
    const response = await api.post(`/reviews/${reviewId}/like`);
    return response.data;
  },

  // Remove like from review
  unlikeReview: async (reviewId: string) => {
    const response = await api.delete(`/reviews/${reviewId}/like`);
    return response.data;
  },

  // Flag a review
  flagReview: async (reviewId: string, reason: string) => {
    const response = await api.post(`/reviews/${reviewId}/flag`, { reason });
    return response.data;
  },
};
