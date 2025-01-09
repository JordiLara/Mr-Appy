import api from "./config";
import { Team } from "../../types";

interface TeamMemberRegistration {
  email: string;
  password: string;
  name: string;
  surname: string;
  employeeRole: string;
  role: "manager" | "employee";
}

export const teamService = {
  // Create a new team
  create: async (data: Omit<Team, "id">) => {
    const response = await api.post("/teams", data);
    return response.data;
  },

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

  // Invite members to team
  inviteMembers: async (teamId: string, emails: string[]) => {
    const response = await api.post(`/teams/${teamId}/invite`, { emails });
    return response.data;
  },

  // Accept team invitation and register new member
  acceptInvite: async (
    teamId: string,
    registrationData: TeamMemberRegistration
  ) => {
    const response = await api.post(`/teams/${teamId}/join`, registrationData);
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
