import React, { useEffect, useState } from "react";
import { BarChart2, TrendingUp, Calendar } from "lucide-react";
import { moodService } from "../services/api/CalendarService";

interface StatsData {
  averageMood: number;
  monthlyEntries: number;
  currentStreak: number;
  moodDistribution: Record<string, number>;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await moodService.getStats();
        setStats(response);
      } catch (err) {
        setError("Error al cargar las estadísticas");
        // Usar datos de respaldo en caso de error
        setStats({
          averageMood: 4.2,
          monthlyEntries: 15,
          currentStreak: 5,
          moodDistribution: {
            Amazing: 20,
            Good: 45,
            Neutral: 20,
            Down: 10,
            Rough: 5,
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Cargando estadísticas...</div>;
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

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">
          Distribución de Estados de Ánimo
        </h2>
        {stats?.moodDistribution &&
        Object.keys(stats.moodDistribution).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(stats.moodDistribution).map(
              ([mood, percentage]) => (
                <div key={mood} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">
                        {mood}
                      </span>
                      <span className="text-sm text-gray-500">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
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
