import api from "./config";
import { Review, CreateReviewData } from "../../types/reviews";

export const reviewService = {
  // Create a new review
  create: async (data: CreateReviewData): Promise<Review> => {
    const response = await api.post("/reviews", data);
    return response.data;
  },

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
  ): Promise<Review[]> => {
    const response = await api.get(`/reviews/team/${teamId}`, { params });
    return response.data;
  },

  // Add like to review
  likeReview: async (reviewId: string): Promise<Review> => {
    const response = await api.post(`/reviews/${reviewId}/like`);
    return response.data;
  },

  // Remove like from review
  unlikeReview: async (reviewId: string): Promise<Review> => {
    const response = await api.delete(`/reviews/${reviewId}/like`);
    return response.data;
  },

  // Flag a review
  flagReview: async (reviewId: string, reason: string): Promise<Review> => {
    const response = await api.post(`/reviews/${reviewId}/flag`, { reason });
    return response.data;
  },
};
