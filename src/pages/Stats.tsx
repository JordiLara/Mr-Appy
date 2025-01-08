import { BarChart2, TrendingUp, Calendar } from "lucide-react";

export default function Stats() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tus Estadísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: BarChart2,
            title: "Estado de Ánimo Promedio",
            value: "4.2/5",
            color: "bg-blue-100 text-blue-600",
          },
          {
            icon: TrendingUp,
            title: "Entradas Este Mes",
            value: "15",
            color: "bg-green-100 text-green-600",
          },
          {
            icon: Calendar,
            title: "Racha Actual",
            value: "5 días",
            color: "bg-purple-100 text-purple-600",
          },
        ].map((stat, index) => (
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
        <h2 className="text-lg font-bold mb-4">Historial de Estado de Ánimo</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Aquí irá el gráfico de estados de ánimo
        </div>
      </div>
    </div>
  );
}
