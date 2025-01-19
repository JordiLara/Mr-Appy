import { useState, useEffect } from "react";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import { teamService } from "../services/api";
import { TeamMember } from "../types/team";

interface TeamData {
  id_team: string;
  team_name: string;
  company_name: string;
  id_user_manager: string;
  totalMembers: number;
  members: TeamMember[];
}

export default function Team() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);

        // Fetch team data and members
        const team = await teamService.getCurrentTeam();
        const members = await teamService.getMembers(team.id_team);

        setTeamData({
          id_team: team.id_team,
          team_name: team.team_name,
          company_name: team.company_name,
          id_user_manager: team.id_user_manager,
          totalMembers: members.length,
          members,
        });
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Error al cargar la información del equipo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
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
            <h2 className="text-lg font-bold">{teamData?.team_name}</h2>
            <p className="text-gray-600">{teamData?.totalMembers} miembros</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData?.members.map((member) => (
            <div
              key={member.id_user}
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
                  <p className="text-sm text-gray-600">{member.roles[0]}</p>
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
                  <p className="text-gray-600">{selectedMember.roles[0]}</p>
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
