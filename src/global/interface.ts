export interface User {
  _id: string;
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user";
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
