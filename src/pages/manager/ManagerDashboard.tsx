import { useEffect, useState } from "react";
import { BarChart2, TrendingUp, Users, Calendar } from "lucide-react";
import { moodService } from "../../services/api/CalendarService";

interface TeamStats {
  averageMood: string;
  moodTrend: string;
  responseRate: number;
  responseTrend: string;
  activeMembers: number;
  totalMembers: number;
  membersTrend: string;
  weeklyEntries: number;
  entriesTrend: string;
  moodDistribution: Record<string, number>;
  topConcerns: Array<{ label: string; value: number }>;
}

export default function ManagerDashboard() {
  const [stats, setStats] = useState<TeamStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const response = await moodService.getTeamMoods("current");
        setStats(response);
      } catch (err) {
        setError("Error al cargar las estadísticas del equipo");
        // Usar datos de respaldo en caso de error
        setStats({
          averageMood: "4.2/5",
          moodTrend: "+0.3",
          responseRate: 85,
          responseTrend: "+5",
          activeMembers: 12,
          totalMembers: 15,
          membersTrend: "-1",
          weeklyEntries: 45,
          entriesTrend: "+12",
          moodDistribution: {},
          topConcerns: [
            { label: "Workload", value: 45 },
            { label: "Communication", value: 32 },
            { label: "Work-Life Balance", value: 28 },
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamStats();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        Cargando estadísticas del equipo...
      </div>
    );
  }

  const dashboardStats = [
    {
      icon: BarChart2,
      title: "Team Mood Average",
      value: stats?.averageMood || "N/A",
      trend: stats?.moodTrend || "0",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Response Rate",
      value: `${stats?.responseRate || 0}%`,
      trend: stats?.responseTrend || "0",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Users,
      title: "Active Members",
      value: `${stats?.activeMembers || 0}/${stats?.totalMembers || 0}`,
      trend: stats?.membersTrend || "0",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Calendar,
      title: "Weekly Entries",
      value: stats?.weeklyEntries?.toString() || "0",
      trend: stats?.entriesTrend || "0",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600">Monitor your team's overall performance</p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-gray-600">{stat.title}</h3>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span
                className={`text-sm ${
                  stat.trend.startsWith("+") ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Team Mood Trends
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
            <div className="h-64 flex items-center justify-center text-gray-500">
              No hay datos de tendencias disponibles
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Top Team Concerns
          </h2>
          <div className="space-y-4">
            {stats?.topConcerns.map((concern, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      {concern.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {concern.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${concern.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
