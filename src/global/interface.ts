export interface User {
  _id: string;
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user";
  isActive: boolean;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
