import api from "./config";
import { Team, TeamMember } from "../../types/team";

export const teamService = {
  getCurrentTeam: async (): Promise<Team> => {
    try {
      const response = await api.get("/team");
      const { team } = response.data;

      return {
        id_team: team.id_team,
        name: team.name,
        companyName: team.company_name,
        managerId: team.manager_id,
      };
    } catch (error) {
      console.error("Error fetching current team:", error);
      throw error;
    }
  },

  getTeam: async (teamId: string): Promise<Team> => {
    try {
      const response = await api.get(`/team/${teamId}`);
      const { team } = response.data;

      return {
        id_team: team.id_team,
        name: team.name,
        companyName: team.company_name,
        managerId: team.manager_id,
      };
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  },

  getMembers: async (teamId: string): Promise<TeamMember[]> => {
    try {
      const response = await api.get(`/team/${teamId}/members`);
      return response.data.members.map((member: any) => ({
        id_user: member.id_user,
        name: member.name,
        email: member.email,
        phone: member.phone || "",
        location: member.location || "",
        role: member.employee_role,
        roles: member.roles || ["user"],
        avatar:
          member.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`,
        joinedAt: member.created_at,
      }));
    } catch (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }
  },

  update: async (teamId: string, data: Partial<Team>): Promise<Team> => {
    try {
      const response = await api.put(`/team/${teamId}`, {
        name: data.name,
        company_name: data.companyName,
      });
      const { team } = response.data;

      return {
        id_team: team.id_team,
        name: team.name,
        companyName: team.company_name,
        managerId: team.manager_id,
      };
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  },

  removeMember: async (teamId: string, userId: string): Promise<void> => {
    try {
      await api.delete(`/team/${teamId}/members/${userId}`);
    } catch (error) {
      console.error("Error removing team member:", error);
      throw error;
    }
  },
};
