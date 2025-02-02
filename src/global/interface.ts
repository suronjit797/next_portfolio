export interface User {
  _id: string;
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user";
  isActive: boolean;
  avatar: {
    path: string;
    filename: string;
    size: number;
  };
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
