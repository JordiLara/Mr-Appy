import api from "./config";
import { Team, TeamMember } from "../../types/team";

export const teamService = {
  getTeam: async (teamId: string): Promise<Team> => {
    try {
      const response = await api.get(`/teams/${teamId}`);
      return {
        id: response.data.id_team,
        name: response.data.team_name,
        companyName: response.data.company_name,
        managerId: response.data.id_user_manager,
      };
    } catch (error) {
      // Datos de respaldo en caso de fallo del backend
      return {
        id: teamId,
        name: "Equipo de Desarrollo",
        companyName: "TechCorp",
        managerId: "1",
      };
    }
  },

  getCurrentTeam: async (): Promise<Team> => {
    try {
      const response = await api.get("/teams/current");
      return {
        id: response.data.id_team,
        name: response.data.team_name,
        companyName: response.data.company_name,
        managerId: response.data.id_user_manager,
      };
    } catch (error) {
      // Datos de respaldo en caso de fallo del backend
      return {
        id: "team-123",
        name: "Equipo de Desarrollo",
        companyName: "TechCorp",
        managerId: "1",
      };
    }
  },

  getMembers: async (teamId: string): Promise<TeamMember[]> => {
    try {
      const response = await api.get(`/teams/${teamId}/members`);
      return response.data.members.map((member: any) => ({
        id: member.id_user,
        name: member.name,
        email: member.email,
        phone: member.phone || "",
        location: member.location || "",
        roles: member.roles || ["Miembro del equipo"],
        avatar:
          member.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`,
        joinedAt: member.joined_at,
      }));
    } catch (error) {
      // Datos de respaldo en caso de fallo del backend
      return [
        {
          id: "1",
          name: "Ana García",
          email: "ana.garcia@example.com",
          phone: "+34 666 777 888",
          location: "Madrid",
          roles: ["Frontend Developer"],
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          joinedAt: "2024-01-01",
        },
      ];
    }
  },

  update: async (teamId: string, data: Partial<Team>): Promise<Team> => {
    const response = await api.put(`/teams/${teamId}`, data);
    return {
      id: response.data.id_team,
      name: response.data.team_name,
      companyName: response.data.company_name,
      managerId: response.data.id_user_manager,
    };
  },

  removeMember: async (teamId: string, userId: string): Promise<void> => {
    await api.delete(`/teams/${teamId}/members/${userId}`);
  },
};
