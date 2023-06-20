export interface UserResponse {
  users: UserResult[];
}

export interface UserResult {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  role: number;
  __v: number;
  supervisor?: Supervisor;
  userImg?: string;
  companyName?: string;
  industry?: string;
  governorate?: string;
}

export interface Supervisor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  userImg?: string;
}
