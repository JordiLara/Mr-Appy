export interface Team {
  id: string;
  name: string;
  companyName: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMemberRegistration {
  email: string;
  password: string;
  name: string;
  surname: string;
  roles: "user";
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  roles: "manager" | "user";
  joinedAt: string;
}
