export interface User {
  _id: string;
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user";
  isActive: boolean;
  avatar: {
    uid: string;
    name: string;
    status: string;
    url: string;
    size: number;
  };
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
