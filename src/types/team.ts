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
  role: "employee";
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: "manager" | "employee";
  joinedAt: string;
}
