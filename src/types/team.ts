export interface Team {
  id_team: string;
  name: string;
  companyName: string;
  managerId: string;
}

export interface TeamMember {
  id_user: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  roles: string[];
  avatar: string;
  joinedAt: string;
}

export interface TeamMemberRegistration {
  email: string;
  password: string;
  name: string;
  surname: string;
  employeeRole: string;
  id_team: number;
  roles: "user";
}
