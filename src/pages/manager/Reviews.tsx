import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Flag,
  Search,
  Sparkles,
  Smile,
  Meh,
  Frown,
  XCircle,
} from "lucide-react";

// Mock data (replace with backend)
const mockReviews = [
  {
    id: 1,
    author: "John Doe",
    date: "2024-01-01",
    mood: "Amazing",
    moodColor: "text-yellow-500",
    moodBg: "bg-yellow-50",
    moodIcon: Sparkles,
    message:
      "Great team collaboration today! The sprint planning went smoothly.",
    likes: 5,
    anonymous: false,
  },
  {
    id: 2,
    author: "Anonymous",
    date: "2024-01-01",
    mood: "Neutral",
    moodColor: "text-blue-500",
    moodBg: "bg-blue-50",
    moodIcon: Meh,
    message:
      "Workload is getting a bit heavy, might need to discuss task distribution.",
    likes: 3,
    anonymous: true,
  },
  {
    id: 3,
    author: "Jane Smith",
    date: "2024-01-02",
    mood: "Rough",
    moodColor: "text-red-500",
    moodBg: "bg-red-50",
    moodIcon: XCircle,
    message: "Deadlines are tight this sprint, feeling overwhelmed.",
    likes: 2,
    anonymous: false,
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
  const [selectedMood, setSelectedMood] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = useMemo(() => {
    return mockReviews.filter((review) => {
      const matchesMood =
        selectedMood === "All" || review.mood === selectedMood;
      const matchesSearch =
        review.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (!review.anonymous &&
          review.author.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesMood && matchesSearch;
    });
  }, [selectedMood, searchQuery]);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Reviews</h1>
          <p className="text-gray-600">See what your team members are saying</p>
        </div>
      </header>

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
          {filteredReviews.map((review) => {
            const MoodIcon = review.moodIcon;
            return (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {review.anonymous ? "Anonymous" : review.author}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 ${review.moodColor}`}
                    >
                      <MoodIcon className="w-4 h-4" />
                      <span className="text-sm">{review.mood}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ThumbsUp className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Flag className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{review.message}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </div>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
