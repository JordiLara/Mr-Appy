import { useState, useEffect } from "react";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import { teamService } from "../../services/api";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatar: string;
  joinedAt: string;
}

interface TeamData {
  id: string;
  name: string;
  totalMembers: number;
  members: TeamMember[];
}

export default function Team() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [team, members] = await Promise.all([
          teamService.getTeam("current"),
          teamService.getMembers("current"),
        ]);
        setTeamData({
          ...team,
          members,
          totalMembers: members.length,
        });
      } catch (err) {
        setError("Error al cargar la información del equipo");
        // Datos de respaldo en caso de error
        setTeamData({
          id: "1",
          name: "Equipo de Desarrollo",
          totalMembers: 3,
          members: [
            {
              id: "1",
              name: "Ana García",
              email: "ana.garcia@example.com",
              phone: "+34 666 777 888",
              location: "Madrid",
              role: "Frontend Developer",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
              joinedAt: "2024-01-01",
            },
            {
              id: "2",
              name: "Carlos Ruiz",
              email: "carlos.ruiz@example.com",
              phone: "+34 666 999 000",
              location: "Barcelona",
              role: "Backend Developer",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
              joinedAt: "2024-01-02",
            },
            {
              id: "3",
              name: "Laura Martín",
              email: "laura.martin@example.com",
              phone: "+34 666 111 222",
              location: "Valencia",
              role: "UX Designer",
              avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
              joinedAt: "2024-01-03",
            },
            {
              id: "4",
              name: "David Torres",
              email: "david.torres@example.com",
              phone: "+34 666 333 444",
              location: "Sevilla",
              role: "Full Stack Developer",
              avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
              joinedAt: "2024-01-04",
            },
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">Cargando información del equipo...</div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tu Equipo</h1>
          <p className="text-gray-600">
            {teamData?.totalMembers} miembros en total
          </p>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{teamData?.name}</h2>
            <p className="text-gray-600">{teamData?.totalMembers} miembros</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData?.members.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles del miembro */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                  <p className="text-gray-600">{selectedMember.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{selectedMember.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{selectedMember.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{selectedMember.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
