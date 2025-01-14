export interface Team {
  id: string;
  name: string;
  companyName: string;
  managerId: string;
}

export interface TeamMember {
  id: string;
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
  teamId: number;
  roles: "user";
}
