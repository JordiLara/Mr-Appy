import api from "./config";
import {
  Team,
  TeamMember,
  TeamResponse,
  TeamMembersResponse,
} from "../../types/team";

// Mock data para fallbacks
const mockTeam = {
  id_team: "1",
  team_name: "Equipo de Desarrollo",
  company_name: "TechCorp",
  id_user_manager: "1",
};

const mockMembers = [
  {
    id_user: "1",
    name: "Ana García",
    email: "ana.garcia@example.com",
    phone: "+34 666 777 888",
    location: "Madrid",
    employee_role: "Frontend Developer",
    roles: ["user"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    created_at: "2024-01-01",
  },
];

export const teamService = {
  getTeam: async (id_team: string): Promise<Team> => {
    try {
      const response = await api.get<TeamResponse>(`/team/${id_team}`);

      if (response.data.code === 1 && response.data.team) {
        return response.data.team;
      }
      return mockTeam;
    } catch (error) {
      console.error("Error fetching team:", error);
      return mockTeam;
    }
  },

  getCurrentTeam: async (): Promise<Team> => {
    try {
      const response = await api.get<TeamResponse>("/team");

      if (response.data.code === 1 && response.data.team) {
        return response.data.team;
      }
      return mockTeam;
    } catch (error) {
      console.error("Error fetching current team:", error);
      return mockTeam;
    }
  },

  getMembers: async (): Promise<TeamMember[]> => {
    try {
      const response = await api.get<TeamMembersResponse>("/team/users");

      if (response.data.code === 1 && response.data.users) {
        return response.data.users.map((member) => ({
          ...member,
          avatar:
            member.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              member.name
            )}`,
          roles: ["user"],
        }));
      }
      return mockMembers;
    } catch (error) {
      console.error("Error fetching team members:", error);
      return mockMembers;
    }
  },

  update: async (data: Partial<Team>): Promise<Team> => {
    try {
      const response = await api.put<TeamResponse>("/team", data);
      if (response.data.code === 1 && response.data.team) {
        return response.data.team;
      }
      throw new Error("Error updating team");
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  },

  removeMember: async (userId: string): Promise<void> => {
    try {
      await api.delete(`/team/members/${userId}`);
    } catch (error) {
      console.error("Error removing team member:", error);
      throw error;
    }
  },
};
