export interface Team {
  id_team: string;
  team_name: string;
  company_name: string;
  id_user_manager: string;
}

export interface TeamMember {
  id_user: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  employee_role: string;
  roles: string[];
  avatar: string;
  created_at: string;
}

export interface TeamResponse {
  code: number;
  message: string;
  team: Team;
}

export interface TeamMembersResponse {
  code: number;
  message: string;
  users: TeamMember[];
}

export interface TeamData {
  id_team: string;
  team_name: string;
  company_name: string;
  id_user_manager: string;
  totalMembers: number;
  members: TeamMember[];
}