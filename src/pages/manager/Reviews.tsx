import React, { useState, useEffect, useMemo } from "react";
import {
  MessageSquare,
  Flag,
  Search,
  Sparkles,
  Smile,
  Meh,
  Frown,
  XCircle,
  ThumbsUp,
} from "lucide-react";
import { reviewService } from "../../services/api";
import { Review } from "../../types/reviews";

// Datos mock para usar en caso de error
const mockReviews: Review[] = [
  {
    id: "1",
    mood_id: "1",
    content:
      "Great team collaboration today! The sprint planning went smoothly.",
    is_anonymous: false,
    mood_type: "Amazing",
    created_at: new Date().toISOString(),
    likes_count: 5,
    is_flagged: false,
    author: {
      name: "John",
      surname: "Doe",
    },
  },
  {
    id: "2",
    mood_id: "2",
    content:
      "Workload is getting a bit heavy, might need to discuss task distribution.",
    is_anonymous: true,
    mood_type: "Neutral",
    created_at: new Date(Date.now() - 86400000).toISOString(), // Ayer
    likes_count: 2,
    is_flagged: false,
  },
  {
    id: "3",
    mood_id: "3",
    content:
      "Successfully completed the feature ahead of schedule. Team support was great!",
    is_anonymous: false,
    mood_type: "Good",
    created_at: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
    likes_count: 8,
    is_flagged: false,
    author: {
      name: "Jane",
      surname: "Smith",
    },
  },
  {
    id: "4",
    mood_id: "4",
    content: "Feeling a bit overwhelmed with the current project deadlines.",
    is_anonymous: true,
    mood_type: "Down",
    created_at: new Date(Date.now() - 259200000).toISOString(), // Hace 3 días
    likes_count: 3,
    is_flagged: false,
  },
];

const moods = [
  { name: "All", icon: Smile, color: "text-gray-500", bg: "bg-gray-50" },
  {
    name: "Amazing",
    icon: Sparkles,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  { name: "Good", icon: Smile, color: "text-green-500", bg: "bg-green-50" },
  { name: "Neutral", icon: Meh, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Down", icon: Frown, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Rough", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedMood, setSelectedMood] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await reviewService.getTeamReviews("current");
      setReviews(response);
    } catch (err) {
      setError("Error al cargar las reviews");
      console.error(err);
      // Usar datos mock en caso de error
      setReviews(mockReviews);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeReview = async (reviewId: string) => {
    try {
      await reviewService.likeReview(reviewId);
      fetchReviews();
    } catch (err) {
      console.error("Error al dar like:", err);
      // Actualizar localmente en caso de error
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? { ...review, likes_count: review.likes_count + 1 }
            : review
        )
      );
    }
  };

  const handleFlagReview = async (reviewId: string) => {
    try {
      await reviewService.flagReview(reviewId, "Contenido inapropiado");
      fetchReviews();
    } catch (err) {
      console.error("Error al marcar la review:", err);
      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, is_flagged: true } : review
        )
      );
    }
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesMood =
        selectedMood === "All" ||
        review.mood_type.toLowerCase() === selectedMood.toLowerCase();
      const matchesSearch =
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (!review.is_anonymous &&
          review.author?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));
      return matchesMood && matchesSearch;
    });
  }, [reviews, selectedMood, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Cargando reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Reviews</h1>
          <p className="text-gray-600">See what your team members are saying</p>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.name}
                  onClick={() => setSelectedMood(mood.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                    ${
                      selectedMood === mood.name
                        ? mood.bg + " " + mood.color
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{mood.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No se encontraron reviews
            </div>
          ) : (
            filteredReviews.map((review) => {
              const mood = moods.find(
                (m) => m.name.toLowerCase() === review.mood_type.toLowerCase()
              );
              const MoodIcon = mood?.icon || Meh;

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {review.is_anonymous
                            ? "Anonymous"
                            : `${review.author?.name} ${review.author?.surname}`}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 mt-1 ${
                          mood?.color || "text-gray-500"
                        }`}
                      >
                        <MoodIcon className="w-4 h-4" />
                        <span className="text-sm">{review.mood_type}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ThumbsUp
                          className={`w-5 h-5 ${
                            review.likes_count > 0
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleFlagReview(review.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Flag
                          className={`w-5 h-5 ${
                            review.is_flagged ? "text-red-500" : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes_count}</span>
                    </div>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
