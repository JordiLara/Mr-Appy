import { Users } from "lucide-react";

export default function Team() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tu Equipo</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Equipo de Desarrollo</h2>
            <p className="text-gray-600">12 miembros</p>
          </div>
        </div>

        <div className="text-center text-gray-500 py-8">
          La información del equipo estará disponible pronto
        </div>
      </div>
    </div>
  );
}
