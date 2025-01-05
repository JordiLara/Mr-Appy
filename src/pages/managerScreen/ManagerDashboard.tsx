import { BarChart2, TrendingUp, Users, Calendar } from "lucide-react";

export default function ManagerDashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Team Dashboard</h1>
        <p className="text-gray-600">
          Monitor your team's mood and performance
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: BarChart2,
            title: "Average Mood",
            value: "4.2/5",
            trend: "+0.3",
            color: "bg-blue-100 text-blue-600",
          },
          {
            icon: TrendingUp,
            title: "Response Rate",
            value: "85%",
            trend: "+5%",
            color: "bg-green-100 text-green-600",
          },
          {
            icon: Users,
            title: "Active Members",
            value: "12/15",
            trend: "-1",
            color: "bg-purple-100 text-purple-600",
          },
          {
            icon: Calendar,
            title: "Entries This Week",
            value: "45",
            trend: "+12",
            color: "bg-yellow-100 text-yellow-600",
          },
        ].map((stat, index) => (
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
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mood Trends</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Concerns</h2>
          <div className="space-y-4">
            {[
              { label: "Workload", value: 45 },
              { label: "Communication", value: 32 },
              { label: "Work-Life Balance", value: 28 },
            ].map((concern, index) => (
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
