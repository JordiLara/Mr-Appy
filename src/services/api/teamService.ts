import api from "./config";
import { Team, TeamMember } from "../../types/team";

// Mock data para fallbacks
const mockTeam = {
  id: "1",
  name: "Equipo de Desarrollo",
  companyName: "TechCorp",
  managerId: "1",
};

const mockMembers = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@example.com",
    phone: "+34 666 777 888",
    location: "Madrid",
    role: "Frontend Developer",
    roles: ["user"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    joinedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    email: "carlos.ruiz@example.com",
    phone: "+34 666 999 000",
    location: "Barcelona",
    role: "Backend Developer",
    roles: ["user"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    joinedAt: "2024-01-02",
  },
  {
    id: "3",
    name: "Laura Martín",
    email: "laura.martin@example.com",
    phone: "+34 666 111 222",
    location: "Valencia",
    role: "UX Designer",
    roles: ["user"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    joinedAt: "2024-01-03",
  },
  {
    id: "4",
    name: "David Torres",
    email: "david.torres@example.com",
    phone: "+34 666 333 444",
    location: "Sevilla",
    role: "Full Stack Developer",
    roles: ["user"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    joinedAt: "2024-01-04",
  },
];

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
      console.error("Error fetching team:", error);
      return mockTeam;
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
      console.error("Error fetching current team:", error);
      return mockTeam;
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
        role: member.employeeRole,
        roles: ["user"],
        avatar:
          member.photo ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`,
        joinedAt: member.created_at,
      }));
    } catch (error) {
      console.error("Error fetching team members:", error);
      return mockMembers;
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
