import { useState, useEffect, useMemo } from "react";
import { MessageSquare, Search } from "lucide-react";
import { reviewService } from "../../services/api";
import { Review } from "../../types/reviews";

// Datos mock para usar en caso de error
const mockReviews: Review[] = [
  {
    id_review: 1,
    id_user: 1,
    id_team: 1,
    content:
      "Great team collaboration today! The sprint planning went smoothly.",
    is_anonymous: false,
    mood: 5,
    created_at: new Date().toISOString(),
    author: {
      name: "John",
      surname: "Doe",
    },
  },
  {
    id_review: 2,
    id_user: 2,
    id_team: 1,
    content:
      "Workload is getting a bit heavy, might need to discuss task distribution.",
    is_anonymous: true,
    mood: 3,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id_review: 3,
    id_user: 3,
    id_team: 1,
    content:
      "Successfully completed the feature ahead of schedule. Team support was great!",
    is_anonymous: false,
    mood: 4,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    author: {
      name: "Jane",
      surname: "Smith",
    },
  },
];

const moods = [
  {
    name: "All",
    emoji: "😊",
    color: "text-gray-500",
    bg: "bg-gray-50",
    value: 0,
  },
  {
    name: "Muy bien",
    emoji: "😊",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    value: 5,
  },
  {
    name: "Bien",
    emoji: "🙂",
    color: "text-green-500",
    bg: "bg-green-50",
    value: 4,
  },
  {
    name: "Regular",
    emoji: "😐",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    value: 3,
  },
  {
    name: "Mal",
    emoji: "😕",
    color: "text-orange-500",
    bg: "bg-orange-50",
    value: 2,
  },
  {
    name: "Muy mal",
    emoji: "🙁",
    color: "text-red-500",
    bg: "bg-red-50",
    value: 1,
  },
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
      const response = await reviewService.getReviews();
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

  const getMoodType = (moodValue: number) => {
    const mood = moods.find((m) => m.value === moodValue);
    return mood?.name || "Regular";
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const reviewMoodType = getMoodType(review.mood);
      const matchesMood =
        selectedMood === "All" || reviewMoodType === selectedMood;
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
            {moods.map((mood) => (
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
                <span className="text-xl">{mood.emoji}</span>
                <span>{mood.name}</span>
              </button>
            ))}
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
              const moodType = getMoodType(review.mood);
              const mood = moods.find((m) => m.name === moodType);

              return (
                <div
                  key={review.id_review}
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
                        <span className="text-xl">{mood?.emoji || "😐"}</span>
                        <span className="text-sm">{moodType}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.content}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
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
