import { Smile, Users, BarChart2, Calendar } from "lucide-react";

export default function ManagerHome() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to MrAppy</h1>
        <p className="mt-2 text-gray-600">
          Track your team's mood and improve workplace happiness
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Smile,
            title: "Today's Mood",
            value: "Happy",
            color: "bg-green-100 text-green-600",
          },
          {
            icon: Users,
            title: "Team Members",
            value: "12",
            color: "bg-blue-100 text-blue-600",
          },
          {
            icon: BarChart2,
            title: "Response Rate",
            value: "85%",
            color: "bg-purple-100 text-purple-600",
          },
          {
            icon: Calendar,
            title: "Streak",
            value: "5 days",
            color: "bg-yellow-100 text-yellow-600",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center"
          >
            <div className={`p-3 rounded-full ${stat.color} mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-gray-600 font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Record Mood", color: "bg-blue-50 hover:bg-blue-100" },
            {
              title: "View Team Stats",
              color: "bg-green-50 hover:bg-green-100",
            },
            {
              title: "Send Feedback",
              color: "bg-purple-50 hover:bg-purple-100",
            },
          ].map((action, index) => (
            <button
              key={index}
              className={`${action.color} p-4 rounded-lg text-left font-medium transition-colors`}
            >
              {action.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
