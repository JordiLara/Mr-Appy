export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: "manager" | "employee";
}

export interface Team {
  id: string;
  name: string;
  companyName: string;
  managerId: string;
  inviteUrl?: string;
  createdAt: string;
}

export interface CreateTeamResponse {
  team: Team;
  teamInviteUrl: string;
}

export interface Mood {
  id: number;
  name: string;
  icon: keyof typeof import("lucide-react");
  color: string;
}

export interface Activity {
  id: number;
  name: string;
  icon: keyof typeof import("lucide-react");
  category: "wellness" | "work" | "team" | "development";
}

export type CategoryColors = {
  [K in Activity["category"]]: string;
};

export interface Entry {
  id: number;
  date: string;
  mood: Mood;
  activities: Activity[];
  workload: number;
  stressLevel: number;
  note?: string;
  anonymous: boolean;
}
