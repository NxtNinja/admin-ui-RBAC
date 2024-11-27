export interface User {
  id: string;
  createdAt: string;
  username: string;
  fullName: string;
  departmentsLink: DepartmentsLink[];
}

export interface DepartmentsLink {
  id: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  jobTitle: string;
  userId: string;
  departmentId: string;
  assignedAt: string;
  assignedBy: string;
  department: Department;
}

export interface Department {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type UserArray = SingleUser[];

export interface SingleUser {
  id: string;
  username: string;
  fullName: string;
  departmentsLink: DepartmentsLink[];
  contactInfo: string;
  salary: string;
}

export interface DepartmentsLink {
  role: string;
  department: Department;
  jobTitle: string;
}

export interface Department {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}
