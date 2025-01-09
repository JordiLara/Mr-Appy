import api from "./config";
import { Team, TeamMemberRegistration } from "../../types/team";

export const teamService = {
  // Get team details
  getTeam: async (teamId: string) => {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  },

  // Get team members
  getMembers: async (teamId: string) => {
    const response = await api.get(`/teams/${teamId}/members`);
    return response.data;
  },

  // Register new team member
  registerMember: async (teamId: string, data: TeamMemberRegistration) => {
    const response = await api.post(`/teams/${teamId}/members`, data);
    return response.data;
  },

  // Update team details
  update: async (teamId: string, data: Partial<Team>) => {
    const response = await api.put(`/teams/${teamId}`, data);
    return response.data;
  },

  // Remove member from team
  removeMember: async (teamId: string, userId: string) => {
    await api.delete(`/teams/${teamId}/members/${userId}`);
  },
};
