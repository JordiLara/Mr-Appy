export interface Review {
  id: string;
  mood_id: string;
  content: string;
  is_anonymous: boolean;
  mood_type: string;
  created_at: string;
  likes_count: number;
  is_flagged: boolean;
  author?: {
    name: string;
    surname: string;
  };
}

export interface CreateReviewData {
  mood_id: string;
  content: string;
  is_anonymous: boolean;
  mood_type: string;
}
