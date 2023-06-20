export interface Delegates {
  delegates: Delegate[];
}

export interface Delegate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: number;
  supervisor: string;
  userImg: string;
  __v: number;
}
