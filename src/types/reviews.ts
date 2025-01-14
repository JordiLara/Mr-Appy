export interface Review {
  id_review: number;
  id_user: number;
  id_team: number;
  content: string;
  is_anonymous: boolean;
  mood: number;
  created_at: string;
  author?: {
    name: string;
    surname: string;
  };
}

export interface CreateReviewData {
  mood: number;
  content: string;
  isAnonymous: boolean;
}
