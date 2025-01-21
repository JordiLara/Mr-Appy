import { useEffect, useState } from "react";
import { BarChart2, TrendingUp, Calendar } from "lucide-react";
import { calendarService } from "../services/api/calService";

interface StatsData {
  averageMood: number;
  monthlyEntries: number;
  currentStreak: number;
  moodDistribution: Record<string, number>;
}

const moodDetails: Record<
  "5" | "4" | "3" | "2" | "1",
  { emoji: string; color: string }
> = {
  "5": { emoji: "😊", color: "bg-emerald-500" },
  "4": { emoji: "🙂", color: "bg-green-500" },
  "3": { emoji: "😐", color: "bg-yellow-500" },
  "2": { emoji: "😕", color: "bg-orange-500" },
  "1": { emoji: "🙁", color: "bg-red-500" },
};

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching stats...");
        const response = await calendarService.getUserStats();
        console.log("Datos recibidos del backend:", response);
        setStats(response);
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
        setError("Error al cargar las estadísticas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const statsCards = [
    {
      icon: BarChart2,
      title: "Estado de Ánimo Promedio",
      value: stats?.averageMood ? `${stats.averageMood.toFixed(1)}/5` : "N/A",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Entradas Este Mes",
      value: stats?.monthlyEntries?.toString() || "0",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Calendar,
      title: "Racha Actual",
      value: `${stats?.currentStreak || 0} días`,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tus Estadísticas</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-gray-600">{stat.title}</h3>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Distribución de estados de ánimo */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">
          Distribución de Estados de Ánimo
        </h2>
        {stats?.moodDistribution &&
        Object.keys(stats.moodDistribution).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(stats.moodDistribution).map(
              ([mood, percentage]) => {
                if (!moodDetails[mood as "5" | "4" | "3" | "2" | "1"]) {
                  return null;
                }

                const { emoji, color } =
                  moodDetails[mood as "5" | "4" | "3" | "2" | "1"];
                return (
                  <div key={mood} className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-sm font-medium text-gray-600">
                        {mood === "5"
                          ? "Muy bien"
                          : mood === "4"
                          ? "Bien"
                          : mood === "3"
                          ? "Neutral"
                          : mood === "2"
                          ? "Mal"
                          : "Muy mal"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${color} h-2 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay datos de distribución disponibles
          </div>
        )}
      </div>
    </div>
  );
}
