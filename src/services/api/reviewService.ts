import api from "./config";
import { Review, CreateReviewData } from "../../types/reviews";

export const reviewService = {
  getReviews: async (): Promise<Review[]> => {
    const response = await api.get<{
      code: number;
      message: string;
      reviews: Review[];
    }>("/review");
    return response.data.reviews;
  },

  create: async (data: CreateReviewData): Promise<Review> => {
    const response = await api.post<{
      code: number;
      message: string;
      review: Review;
    }>("/review", {
      mood: data.mood,
      content: data.content,
      isAnonymous: data.isAnonymous,
    });
    return response.data.review;
  },

  getTeamReviews: async (): Promise<Review[]> => {
    const response = await api.get<{
      code: number;
      message: string;
      reviews: Review[];
    }>("/review/team");
    return response.data.reviews;
  },
};
