export interface Auth {
  email: string;
  password: string;
}

export interface User extends Auth {
  name: string;
}
export interface IncomingUser extends User {
  id: number;
  createdAt: string;
}
